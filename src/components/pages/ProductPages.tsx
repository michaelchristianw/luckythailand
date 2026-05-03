"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import PopupSidebar from "@/components/PopupSidebar";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getSlugFromImageUrl } from "@/lib/utils/slug";

interface Product {
  id: number;
  category: string;
  name: string;
  engname?: string;
  price: number;
  imageurl: string;
  size?: string;
  quantity?: number;
  volume?: number;
  dimensions?: string;
  unit?: string;
  variant?: string;
}

export const ProductPages = () => {
  const [category, setCategory] = useState("detergent");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const t = useTranslations("Product");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/get-product");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.engname?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const getSizeValue = (product: Product) => {
        return product.quantity || product.volume || 0;
      };

      const aSize = getSizeValue(a);
      const bSize = getSizeValue(b);

      return aSize - bSize || a.name.localeCompare(b.name);
    });

  const luckyCleanCategory: Record<string, string> = {
    detergent: t("detergent"),
    dishwashing: t("dishwashing"),
    floor: t("floor"),
    garbagebag: t("garbage"),
  };

  const luckyCareCategory: Record<string, string> = {
    tissue: t("tissue"),
    softener: t("softener"),
    cotton: t("cotton"),
  };

  const allCategories = {
    ...luckyCleanCategory,
    ...luckyCareCategory,
  };

  return (
    <div className="w-full min-h-screen flex pt-14">
      <div className="flex flex-col w-full py-10 px-5 md:px-10 gap-10">
        <div className="flex justify-end">
          {/* <h1 className="text-3xl p-3 font-bold capitalize flex-1 hidden md:flex">
              {allCategories[category] || category}
            </h1> */}
          <PopupSidebar category={category} setCategory={setCategory} />
          <label className="flex items-center border-b gap-3 p-2 w-1/2 md:w-1/4">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none focus:border-none focus:outline-none focus:ring-0 text-sm w-full"
            />
          </label>
        </div>
        <div className="flex gap-10 w-full">
          <ul className="list bg-base-100 md:min-w-1/5 hidden md:flex md:pl-4">
            <li className="tracking-wide text-red-700 text-xl pb-6">
              Product Categories
            </li>

            {Object.keys(allCategories).map((key) => (
              <li
                key={key}
                className={`cursor-pointer rounded-none py-3 ${
                  category === key
                    ? "text-red-900"
                    : "hover:underline hover:underline-offset-5 hover:text-red-800 text-black/40"
                }`}
                onClick={() => setCategory(key)}
              >
                <div>{allCategories[key]}</div>
              </li>
            ))}
          </ul>

          {loading ? (
            <div className="w-full min-h-screen grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton w-full h-full"></div>
              ))}
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const slug = getSlugFromImageUrl(product.imageurl);

                return (
                  <Link
                    key={product.id}
                    href={`/products/${slug}`}
                    className="block"
                  >
                    <ProductCard
                      title={
                        (locale === "en" ? product.engname : product.name) ?? ""
                      }
                      imageurl={product.imageurl}
                      ctaLabel="Buy Online"
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
