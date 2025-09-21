"use client";

import {useI18n} from "@/stores/i18n/i18n";
import FanakIso from "@/assets/fanak-iso.svg";
import FanakLogo from "@/assets/fanak-logo.svg";

export default function NavBar() {
    const i18n = useI18n()

    return (
        <>
            <FanakLogo className="h-8 bg-blend-exclusion absolute top-15"/>

            <nav className="flex-row fixed top-0 z-100 h-fit box-border w-full py-10 px-45 justify-between items-center flex ">
                <FanakIso className="h-15 mix-blend-difference"/>
                <p className={"hover:underline hover:cursor-pointer"}>{i18n.dict["Home"]["help"]}</p>
            </nav>
        </>
    )
}