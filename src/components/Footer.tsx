import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="footer sm:footer-horizontal text-gray-200 p-10 bg-red-700">
      <nav>
        <h6 className="footer-title text-white opacity-100">{t("products")}</h6>
        <a className="link link-hover">{t("detergent")}</a>
        <a className="link link-hover">{t("dishwashing")}</a>
        <a className="link link-hover">{t("floor")}</a>
        <a className="link link-hover">{t("garbage")}</a>
        <a className="link link-hover">{t("tissue")}</a>
        <a className="link link-hover">{t("softener")}</a>
        <a className="link link-hover">{t("cotton")}</a>
      </nav>
      <nav>
        <h6 className="footer-title text-white opacity-100">{t("company")}</h6>
        <a className="link link-hover">{t("about")}</a>
        <a className="link link-hover">{t("contact")}</a>
        <a className="link link-hover">{t("faq")}</a>
        <a className="link link-hover">{t("toc")}</a>
      </nav>
      <nav>
        <h6 className="footer-title text-white opacity-100">{t("social")}</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
            <img width="28" height="28" src="/shopee_white.png" alt="shopee" />
          </a>
          <a>
            <img
              width="28"
              height="28"
              src="/tiktok_white.png"
              alt="tiktok--v1"
            />
          </a>
          <a>
            <img
              width="28"
              height="28"
              src="/instagram_white.png"
              alt="instagram-new"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
};
