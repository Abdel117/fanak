"use client";

import {useI18n} from "@/stores/i18n/i18n";
import FanakIcon from "@/assets/fanak-img.svg";

export default function NavBar() {
    const i18n = useI18n()

    return (
        <nav className="flex-row px-10 fixed top-0 z-100 h-fit box-border w-full py-10 justify-between items-center max-w-6xl flex ">
            <p className={"font-serif text-3xl"}>fanak</p>
            <FanakIcon/>
            <p className={"hover:underline hover:cursor-pointer"}>{i18n.dict["Home"]["help"]}</p>
        </nav>
    )
}