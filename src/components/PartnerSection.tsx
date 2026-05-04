import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAssetUrl } from "@/lib/blob-images";

export const PartnerSection = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 pb-20 md:pb-0 md:px-10">
      <div className="flex flex-col items-center justify-center border-y-2 md:border-2 border-red-800 md:rounded-4xl p-10 gap-8">
        <h1 className="text-4xl font-bold text-red-800">{t("findProduct")}</h1>

        <div className="w-full grid grid-cols-3 grid-rows-2 md:grid-cols-6 md:grid-rows-1 gap-10 items-center place-items-center">
          <div className="">
            <img src={getAssetUrl("/partners/watson.png")} alt="" />
          </div>
          <div className="">
            <img src={getAssetUrl("/partners/makro.png")} alt="" />
          </div>
          <div className="">
            <img src={getAssetUrl("/partners/lawson.png")} alt="" />
          </div>
          <div className="size-20 md:size-28">
            <img src={getAssetUrl("/partners/cj.png")} alt="" />
          </div>
          <div className="size-20 md:size-28">
            <img src={getAssetUrl("/partners/pt.png")} alt="" />
          </div>
          <div className="size-20 md:size-28">
            <img src={getAssetUrl("/partners/jiffy.png")} alt="" />
          </div>
        </div>

        <Link
          className="btn font-semibold py-6 px-8 hover:cursor-pointer bg-red-800 text-white border-none"
          href="/where-to-buy"
        >
          {t("findStore")}
        </Link>
      </div>
    </div>
  );
};
