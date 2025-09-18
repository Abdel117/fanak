"use client";

import READ from "@/assets/READ.svg"
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import CoversBgAnimated from "@/components/home/CoversBgAnimated";

export default function Home() {
  return (
      <div className="px-10 mx-auto h-fit w-full flex flex-col items-center justify-center">
          <HeroSection/>
      </div>
  );
}

export function HeroSection() {

    return (
        <div className={"w-full h-fit relative"}>
            <div className={"w-full h-screen flex flex-col items-center justify-center "}>
                <div className={"w-full max-w-7xl justify-between flex flex-row"}>
                    <p className={"w-50 z-10 "}>
                        Short open source documents to read on the go
                    </p>
                    <READ className={"z-10 shadow-inner"}/>
                    {/*<p className={"z-10 hover:underline border py-2 bg-white text-primary cursor-pointer h-fit "}>TRY TEST</p>*/}
                </div>
            </div>

            <CoversBgAnimated/>
        </div>

    )
}



function CoversBg({inBaseline = false}: {inBaseline?: boolean}) {
    const boxCount = 20
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const imgs = Array.from({ length: boxCount }).map(
            () => `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`
        )
        setImages(imgs)
    }, [])

    if (images.length === 0) return null

    return (
        <div className={`flex gap-10 justify-center ${inBaseline ? 'items-baseline' : ''}`}>
            {images.map((src, i) => (
                <div key={i} className={"flex shrink-0 flex-col gap-5 opacity-75 hover:opacity-100 "}>
                    <Image
                        src={src}
                        alt={`Cover ${i}`}
                        width={200}
                        height={300}
                        style={{ height: 100 + Math.random() * 150, width: "auto" }}
                        className={"hover:opacity-100 hover:cursor-pointer"}
                        unoptimized
                    />
                    <p>{i}</p>
                </div>
            ))}
        </div>
    )
}
