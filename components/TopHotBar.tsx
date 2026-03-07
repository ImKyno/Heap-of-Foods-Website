"use client";

import { useTranslation } from "@/lib/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faUtensils } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function TopHotBar() {
  const { t, locale } = useTranslation();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-zinc-200 dark:bg-zinc-900 shadow-md flex items-center justify-center gap-2 p-2">
      <Link href="/">
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-bold cursor-pointer">
          <FontAwesomeIcon icon={faHouse} className="w-6 h-6" />
          {t("main.homepage")}
        </button>
      </Link>

      <Link href="/cookpot">
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-bold cursor-pointer">
          <img
            src="/icons/icon_cookpot.png"
            alt="Crock Pot"
            className="w-6 h-6 object-contain"
          />
          {t("main.cookpot")}
        </button>
      </Link>

      <button
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
        title="Página não disponível"
      >
        <img
          src="/icons/icon_cookpot_warly.png"
          alt="Chef's Special"
          className="w-6 h-6 object-contain"
        />
        {t("main.cookpot_warly")}
      </button>

      <button
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
        title="Página não disponível"
      >
        <img
          src="/icons/icon_cookpot_keg.png"
          alt="Wooden Keg"
          className="w-6 h-6 object-contain"
        />
        {t("main.cookpot_keg")}
      </button>

      <button
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 opacity-50 cursor-not-allowed"
        title="Página não disponível"
      >
        <img
          src="/icons/icon_cookpot_jar.png"
          alt="Preserves Jar"
          className="w-6 h-6 object-contain"
        />
        {t("main.cookpot_jar")}
      </button>

      <Link href="/settings">
        <button className="flex items-center gap-2 px-3 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-bold cursor-pointer">
          <FontAwesomeIcon icon={faGear} className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
}
