import Image from "next/image";
import { notFound } from "next/navigation";
import { fallbackProducts, normalizeProductImage } from "@/data/products";
import prisma from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;

  // Find product whose imageurl ends with the slug
  const dbProduct = await prisma.product
    .findFirst({
      where: {
        OR: [
          { imageurl: { endsWith: `/${slug}` } },
          { imageurl: { endsWith: `/${slug}.png` } },
          { imageurl: { endsWith: `/${slug}.jpg` } },
          { imageurl: { endsWith: `/${slug}.jpeg` } },
          { imageurl: { endsWith: `/${slug}.webp` } },
        ],
      },
    })
    .catch((error) => {
      console.error("Failed to fetch product:", error);
      return null;
    });

  const product =
    (dbProduct ? normalizeProductImage(dbProduct) : null) ??
    (await prisma.product
      .findFirst({
        where: {
          OR: [
            { imageurl: { endsWith: `/${slug.replace(/-/g, "")}` } },
            { imageurl: { endsWith: `/${slug.replace(/-/g, "")}.png` } },
          ],
        },
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
        return null;
      })
      .then((item) => (item ? normalizeProductImage(item) : null))) ??
    fallbackProducts.find((item) => {
      const imageSlug = item.imageurl
        .split("/")
        .pop()
        ?.replace(/\.(png|jpg|jpeg|webp)$/i, "");

      return imageSlug === slug;
    });

  if (!product) notFound();

  // name, imageurl category

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row pt-20">
      <div className="w-full flex items-center justify-center md:p-10 px-10">
        <Image
          src={product.imageurl}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      <div className="w-full flex flex-col md:p-20 px-10 pb-10 justify-center">
        <h1 className="text-3xl font-semibold py-5 text-red-800">
          {(locale === "en" ? product.engname : product.name) ?? ""}
        </h1>
        <h2 className="text-lg text-red-700 font-semibold pb-5 capitalize">
          {product.category}
        </h2>
        <p className="leading-8 text-lg ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ipsum
          unde eveniet, similique soluta saepe voluptate porro natus amet. Nihil
          tempora enim culpa modi commodi, eaque aspernatur non id inventore
          beatae vitae laboriosam aut consectetur nobis neque porro facilis eius
          distinctio magni accusantium natus quos ullam doloremque nisi. Cum
          quas incidunt sequi consequatur, omnis illo ad voluptates, eius veniam
          tempore molestiae voluptate expedita voluptatum! Culpa placeat quam
          dignissimos ea ad omnis, et atque pariatur, iste quasi id sit dicta
          delectus possimus unde odio rem fuga qui? Eveniet voluptatibus aperiam
          soluta repellendus similique eos reiciendis autem reprehenderit quam,
          at sit illum.
        </p>
      </div>
    </div>
  );
}
