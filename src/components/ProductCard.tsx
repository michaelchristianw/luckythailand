"use client";

import Image from "next/image";

type ProductCardProps = {
  title: string;
  imageurl: string;
  ctaLabel?: string;
};

export const ProductCard = ({
  title,
  imageurl,
  ctaLabel,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-base-100 border border-red-300 aspect-square relative group overflow-hidden flex items-center justify-center">
        <Image
          width={400}
          height={600}
          src={imageurl}
          alt={title}
          className="w-full h-[80%] object-contain transition-all duration-300 group-hover:blur-sm"
        />

        {ctaLabel ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold">
              {ctaLabel}
            </span>
          </div>
        ) : null}
      </div>

      <h2 className="text-sm lg:text-lg">{title}</h2>
    </div>
  );
};
