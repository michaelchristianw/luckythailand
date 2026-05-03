"use client";

import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export const Navbar = () => {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const closeDropdown = () => {
    requestAnimationFrame(() => {
      (document.activeElement as HTMLElement | null)?.blur();
    });
  };

  const switchLocale = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-white/95 shadow-sm text-secondary-content z-20">
      <div className="navbar-start">
        <a className="px-3 md:px-5 text-xl font-bold">LUCKY</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg gap-5">
          <li>
            <Link
              href="/"
              className={`hover:border-b-2 hover:border-red-800 hover:rounded-none hover:bg-transparent ${
                isActive("/") ? "border-b-2 border-primary rounded-none" : ""
              }`}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={`hover:border-b-2 hover:border-red-800 hover:rounded-none hover:bg-transparent active:bg-transparent ${
                isActive("/products")
                  ? "border-b-2 border-primary rounded-none"
                  : ""
              }`}
            >
              {t("products")}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`hover:border-b-2 hover:border-red-800 hover:rounded-none hover:bg-transparent active:bg-transparent ${
                isActive("/about")
                  ? "border-b-2 border-primary rounded-none"
                  : ""
              }`}
            >
              {t("about")}
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none text-secondary m-1"
          >
            {locale === "th" ? (
              <img
                className="size-5"
                alt="Thailand"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/TH.svg"
              />
            ) : (
              <img
                className="size-5"
                alt="United States"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
              />
            )}
          </div>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-40 w-52 p-2 shadow-sm">
            <li className={locale === "en" ? "disabled" : ""}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  switchLocale("en");
                  closeDropdown();
                }}
              >
                <span className="fi fi-us" />
                English
              </a>
            </li>

            <li className={locale === "th" ? "disabled" : ""}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  switchLocale("th");
                  closeDropdown();
                }}
              >
                <span className="fi fi-th" />
                Thai
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Menu size={24} color="#BF0004" />
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-slate-50 rounded-box z-40 mt-3 w-52 p-2 shadow text-lg"
        >
          <li>
            <Link
              href="/"
              onClick={closeDropdown}
              className={isActive("/") ? "lg:border-l-4 border-primary" : ""}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              onClick={closeDropdown}
              className={
                isActive("/products") ? "lg:border-l-4 border-primary" : ""
              }
            >
              {t("products")}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={closeDropdown}
              className={
                isActive("/about") ? "lg:border-l-4 border-primary" : ""
              }
            >
              {t("about")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
