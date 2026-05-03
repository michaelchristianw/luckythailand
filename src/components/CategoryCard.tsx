"use client";

import { Link } from "@/i18n/navigation";

type CategoryCardProps = {
  title: string;
  desc: string;
  imageurl: string;
};

export const CategoryCard = ({ title, desc, imageurl }: CategoryCardProps) => {
  return (
    <div className="flex-1">
      <Link href="/products">
        <div className="card shadow-sm rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
          <figure className="rounded h-60">
            <img
              src={imageurl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
        <h1
          className={`text-3xl pt-5 cursor-pointer w-fit font-bold active:opacity-50 ${
            title == "Lucky Clean" ? "text-[#00B7F0]" : "text-[#EF6795]"
          }`}
        >
          {title}
        </h1>
        <p>{desc}</p>
      </Link>
    </div>
  );
};
