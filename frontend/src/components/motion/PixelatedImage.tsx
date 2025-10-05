'use client';

import {shuffle} from "@/utils/utils";
import {motion} from "framer-motion";
import clsx from "clsx";
import {useEffect, useState} from "react";

type PixelatedImageProps = {
    src: string,
    rows: number,
    cols: number,
    pixelSize: number,
    delay?: number,
    className?: string,
}

export default function PixelatedImage({src, rows, cols, pixelSize, delay = 0.01, className}: PixelatedImageProps) {
    const pixeles = Array.from({length: rows*cols}).map((_, i) => i);
    shuffle(pixeles);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        // 0.3 is the default framer motion time for animations
        const totalAnimationDuration = (rows * cols * delay + 0.3) * 1000;
        const finishAnimation = setTimeout(() => {
            setAnimationFinished(true)
        }, totalAnimationDuration);

        return () => clearTimeout(finishAnimation);
    }, [cols, delay, rows])

    return (
        <motion.div
            style={{
                width: cols * pixelSize,
                height: rows * pixelSize,
            }}
            className={clsx("flex flex-wrap", className)}
        >
            {
                !animationFinished && pixeles.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {delay: val * delay, ease: "easeInOut"}}}
                        style={{
                            width: pixelSize,
                            height: pixelSize,
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `-${pixelSize * (i  % cols)}px -${pixelSize * Math.floor(i / cols)}px`,
                            backgroundSize: `${cols * pixelSize}px ${rows * pixelSize}px`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                ))
            }
            {
                animationFinished && <motion.img
                    style={{
                        width: cols * pixelSize,
                        height: rows * pixelSize,
                    }}
                    src={src}
                />
            }
        </motion.div>
    )
}