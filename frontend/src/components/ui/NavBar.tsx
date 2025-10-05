"use client";

import {useI18n} from "@/stores/i18n/i18n";
import FanakIso from "@/assets/fanak-iso.svg";

export default function NavBar() {
    const i18n = useI18n()

    return (
        <nav className={"flex w-full absolute top-0 items-center z-100 justify-center h-fit py-10"}>
            <div className="flex-row max-w-7xl h-fit box-border w-full justify-between items-center flex">
                <FanakIso className="h-15 mix-blend-difference"/>
                <p className={"hover:underline hover:cursor-pointer"}>{i18n.dict["Home"]["help"]}</p>
            </div>
        </nav>
    )
}