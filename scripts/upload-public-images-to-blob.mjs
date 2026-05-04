#!/usr/bin/env node

import { put } from "@vercel/blob";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const overwrite = args.has("--overwrite");
const includeDemoSvg = args.has("--include-demo-svg");
const publicDir = path.resolve("public");
const manifestPath = path.resolve(".vercel/blob-public-manifest.json");
const skippedDemoFiles = new Set([
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
]);

function loadEnvFile(filePath) {
  return readFile(filePath, "utf8")
    .then((content) => {
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const separatorIndex = trimmed.indexOf("=");
        if (separatorIndex === -1) continue;

        const key = trimmed.slice(0, separatorIndex).trim();
        const rawValue = trimmed.slice(separatorIndex + 1).trim();
        const value = rawValue.replace(/^['"]|['"]$/g, "");
        process.env[key] ??= value;
      }
    })
    .catch(() => {});
}

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  return (
    {
      ".avif": "image/avif",
      ".gif": "image/gif",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
    }[extension] ?? "application/octet-stream"
  );
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
      continue;
    }

    if (entry.isFile()) files.push(fullPath);
  }

  return files;
}

await loadEnvFile(path.resolve(".env.local"));
await loadEnvFile(path.resolve(".env"));

if (!dryRun && !process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("BLOB_READ_WRITE_TOKEN is required to upload files.");
}

const files = (await listFiles(publicDir)).filter((filePath) => {
  const relativePath = path.relative(publicDir, filePath);
  return includeDemoSvg || !skippedDemoFiles.has(relativePath);
});

const uploaded = [];

for (const filePath of files) {
  const fileStats = await stat(filePath);
  const pathname = path.relative(publicDir, filePath).split(path.sep).join("/");
  const contentType = contentTypeFor(filePath);

  if (dryRun) {
    uploaded.push({
      localPath: `public/${pathname}`,
      pathname,
      url: null,
      size: fileStats.size,
      contentType,
      dryRun: true,
    });
    continue;
  }

  const blob = await put(pathname, await readFile(filePath), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: overwrite,
    contentType,
  });

  uploaded.push({
    localPath: `public/${pathname}`,
    pathname,
    url: blob.url,
    size: fileStats.size,
    contentType,
  });

  console.log(`Uploaded ${pathname}`);
}

const firstBlobUrl = uploaded.find((file) => file.url)?.url;

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      blobBaseUrl: firstBlobUrl ? new URL(firstBlobUrl).origin : null,
      publicDir,
      overwrite,
      count: uploaded.length,
      files: uploaded,
    },
    null,
    2
  )}\n`
);

console.log(`Wrote manifest: ${manifestPath}`);
