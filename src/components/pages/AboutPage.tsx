import { useTranslations } from "next-intl";
import { BentoGrid } from "@/components/BentoGrid";
import { CarouselCard } from "@/components/CarouselCard";
import { Mission } from "@/components/Mission";
import { getAssetUrl } from "@/lib/blob-images";

export const AboutPage = () => {
  const t = useTranslations("AboutPage");
  return (
    <div>
      {/* First Hero */}
      <div className="w-full h-full flex flex-col sm:flex-row pt-14">
        <div className="w-full flex items-center text-black">
          <div className="flex flex-col justify-center w-full lg:w-3/5 gap-5 mx-5 mt-10 lg:my-0">
            <h1 className="text-4xl lg:text-5xl font-extrabold">
              {t("weare")} <span className="text-[#EF6795]">Lucky</span>
            </h1>
            <p className="lg:text-xl">{t("header")}</p>
          </div>
        </div>
        <div className="w-full flex items-center ">
          <div className="m-5 mb-0 sm:m-0">
            <img
              className="rounded-xl sm:rounded-none aspect-video sm:aspect-auto"
              src={getAssetUrl("/aboutHero.png")}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* End of First Hero */}
      <CarouselCard />
      <BentoGrid />
      <Mission colorMode="light" />
    </div>
  );
};
