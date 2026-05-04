import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { PrismaClient } from "../src/generated/prisma";
import { normalizeProductImageUrl } from "../src/data/products";
import { getBlobPathnameFromUrl } from "../src/lib/blob-images";

type ManifestFile = {
  pathname: string;
  url: string | null;
};

type Manifest = {
  files: ManifestFile[];
};

const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const manifestPath = path.resolve(".vercel/blob-public-manifest.json");

const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
const manifestByPathname = new Map(
  manifest.files
    .filter((file) => file.url)
    .map((file) => [file.pathname, file.url as string])
);

const prisma = new PrismaClient();

try {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      imageurl: true,
      name: true,
    },
  });

  const updates = products.flatMap((product) => {
    if (/^https?:\/\//i.test(product.imageurl)) return [];

    const normalizedUrl = normalizeProductImageUrl(product.imageurl);
    const pathname = getBlobPathnameFromUrl(normalizedUrl);
    const blobUrl = manifestByPathname.get(pathname);

    if (!blobUrl || blobUrl === product.imageurl) return [];

    return [
      {
        id: product.id,
        name: product.name,
        from: product.imageurl,
        to: blobUrl,
      },
    ];
  });

  if (updates.length === 0) {
    console.log("No product image URLs need migration.");
    process.exit(0);
  }

  for (const update of updates) {
    console.log(`${write ? "Updating" : "Would update"} #${update.id}:`);
    console.log(`  ${update.from}`);
    console.log(`  ${update.to}`);

    if (write) {
      await prisma.product.update({
        where: { id: update.id },
        data: { imageurl: update.to },
      });
    }
  }

  console.log(
    `${write ? "Updated" : "Dry run complete for"} ${updates.length} product image URL(s).`
  );
  if (!write) console.log("Run again with --write to update the database.");
} finally {
  await prisma.$disconnect();
}
