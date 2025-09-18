"use client";

import { createContext, useContext } from "react";

type I18nContextType = {
    lang: "en" | "es";
    dict: Record<string, Record<string, string>>;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
 lang,
 dict,
 children
}: I18nContextType & { children: React.ReactNode }) {
    return (
        <I18nContext.Provider value={{ lang, dict }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useI18n must be used within an I18nProvider");
    return context;
}
