import { useTranslations } from "next-intl";

export const BentoGrid = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="bg-pink-100 py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          {t("bentoTitle")}
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)] md:gap-10">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 max-lg:text-center">
                  {t("ourPartner")}
                </p>
                <p>{t("partnerDesc")}</p>
              </div>
              <div className="grid grid-cols-2 grid-rows-3 gap-4 items-center justify-items-center my-10 md:my-0">
                <div>
                  <img
                    src="/partners/jiffy.png"
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div>
                  <img
                    src="/partners/pt.png"
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="row-start-2">
                  <img
                    src="/partners/watson.png"
                    alt=""
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <div className="row-start-2">
                  <img
                    src="/partners/makro.png"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="row-start-3">
                  <img
                    src="/partners/cj.png"
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="row-start-3">
                  <img
                    src="/partners/lawson.png"
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 max-lg:text-center">
                  {t("qualityTrust")}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {t("qualityDesc")}
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  className="w-40 max-lg:max-w-xs"
                  src="/quality.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 max-lg:text-center">
                  {t("carePlanet")}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {t("planetDesc")}
                </p>
              </div>
              <div className="@container flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <img
                  className="w-40 max-lg:max-w-xs"
                  src="/bioearth.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 max-lg:text-center">
                  {t("mainLines")}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {t("linesDesc")}
                </p>
              </div>
              <div className="flex flex-col gap-3 p-10">
                <img src="/luckycare.jpg" alt="" />
                <img src="/luckyclean.jpg" alt="" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
