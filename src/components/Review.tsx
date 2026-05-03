import { useTranslations } from "next-intl";

export const Review = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold md:text-center">{t("reviewTitle")}</h1>
      <div className="flex flex-col md:flex-row py-15">
        <div className="w-full flex justify-center">
          <div className="w-3/4 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              Game-changer for my daily routine!
            </h1>
            <p className="min-h-20">
              I&apos;ve tried so many wipes and detergents, but Lucky&apos;s
              products are next level — gentle, effective, and smell amazing.
              Totally part of my must-haves now.
            </p>
            <div className="rating">
              <div className="mask mask-star" aria-label="1 star"></div>
              <div className="mask mask-star" aria-label="2 star"></div>
              <div className="mask mask-star" aria-label="3 star"></div>
              <div className="mask mask-star" aria-label="4 star"></div>
              <div
                className="mask mask-star"
                aria-label="5 star"
                aria-current="true"
              ></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Michael Christian"
                  />
                </div>
              </div>
              <p>Michael Christian</p>
            </div>
          </div>
        </div>
        <div className="divider divider-vertical md:divider-horizontal"></div>
        <div className="w-full flex justify-center ">
          <div className="w-3/4 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              Quality I can trust for my family
            </h1>
            <p className="min-h-20">
              The baby wipes are super soft and safe, and the tissue doesn’t
              fall apart like others. You can really feel the quality in every
              product.
            </p>
            <div className="rating">
              <div className="mask mask-star" aria-label="1 star"></div>
              <div className="mask mask-star" aria-label="2 star"></div>
              <div className="mask mask-star" aria-label="3 star"></div>
              <div className="mask mask-star" aria-label="4 star"></div>
              <div
                className="mask mask-star"
                aria-label="5 star"
                aria-current="true"
              ></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Christina Aguleri"
                  />
                </div>
              </div>
              <p>Christina Aguleri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
