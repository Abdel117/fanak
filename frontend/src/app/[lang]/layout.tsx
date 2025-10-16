import type { Metadata } from "next";
import {El_Messiri, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {getDictionary} from "@/dictionaries/dictionaries";
import {I18nProvider} from "@/stores/i18n/i18n";
import NavBar from "@/components/ui/NavBar";

const jetMono = JetBrains_Mono({
    weight: ["400", "600"],
    subsets: ["latin"],
})

const elMessiri = El_Messiri({
    weight: ["400", "600"],
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Fanak",
  icons: 'assets/fanak-img.svg',
  description: "A gamified platform to read short public domain documents on the go",
};


export default async function RootLayout({
 children,
 params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{lang: 'en' | 'es'}>;
}>) {
    let { lang } = await params;
    if(!['es', 'en'].includes(lang)) lang = 'es';
    const dict = await getDictionary(lang);

    return (
        <html lang={lang} data-theme="light">
            <body className={`${jetMono.className} overflow-x-hidden relative antialiased flex flex-col items-center`}>
                <I18nProvider lang={lang} dict={dict}>
                    <NavBar />
                    {children}
                </I18nProvider>
            </body>
        </html>
    );
}
