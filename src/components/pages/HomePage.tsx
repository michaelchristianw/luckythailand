"use client";

import Image from "next/image";
import { CategoryCard } from "@/components/CategoryCard";
import { PartnerSection } from "@/components/PartnerSection";
import { NewProducts } from "@/components/NewProducts";
import { Review } from "@/components/Review";
import { useRouter } from "@/i18n/navigation";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const HomePage = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const viewportAmount = isMobile ? 0.3 : 0.5;
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col-reverse md:flex-row md:min-h-screen mt-20 md:mt-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:p-10 md:pl-28">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl md:text-6xl font-bold text-red-700 leading-none">
              Lucky Thailand
            </h1>
            <p className="w-full md:w-3/4">{t("heroText")}</p>
          </div>
          <button
            className="btn bg-red-800 text-base text-white w-3/4 lg:w-1/2 xl:w-1/3 min-w-40 mt-5 p-6"
            onClick={() => router.push("/products")}
          >
            {t("shopNow")}
          </button>
        </div>

        <div className="relative w-full md:w-1/2 h-[320px] md:h-auto md:min-h-[400px] flex items-end md:items-center justify-center">
          <div className="relative w-full max-w-xl h-full">
            <Image
              fill
              src="/homepageBanner.png"
              alt="homepage banner"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <motion.div
        className="flex flex-col justify-center gap-5 px-10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: true, amount: viewportAmount }}
      >
        <h1 className="text-3xl font-bold">{t("featured")}</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <CategoryCard
            title="Lucky Clean"
            desc={t("cleanText")}
            imageurl="/luckycleanBanner.png"
          />
          <CategoryCard
            title="Lucky Care"
            desc={t("careText")}
            imageurl="/luckycareBanner.png"
          />
        </div>
      </motion.div>
      <div className="w-full h-60 bg-pink-50 flex flex-col md:flex-row justify-center md:justify-start text-black mb-10 px-5 gap-5 md:gap-0">
        <div className="w-full flex items-center justify-center text-2xl md:text-5xl">
          <p className="tracking-wide font-bold text-center">
            {t("bannerTitle1")}{" "}
            <span className="italic text-[#00B7F0]">{t("trust")}</span> <br />
            {t("bannerTitle2")}{" "}
            <span className="italic text-[#EF6795]">{t("love")}</span>
          </p>
        </div>
        <div className="w-full flex items-center text-sm md:text-xl">
          <p className="text-center md:text-start">{t("bannerDesc")}</p>
        </div>
      </div>
      <PartnerSection />
      <NewProducts />
      <Review />
    </div>
  );
};
