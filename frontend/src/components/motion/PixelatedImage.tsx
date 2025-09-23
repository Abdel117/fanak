'use client';

import {shuffle} from "@/utils/utils";
import {motion} from "framer-motion";
import clsx from "clsx";

type PixelatedImageProps = {
    src: string,
    rows: number,
    cols: number,
    pixelSize: number,
    className?: string
}

export default function PixelatedImage({src, rows, cols, pixelSize, className}: PixelatedImageProps) {
    const pixeles = Array.from({length: rows*cols}).map((_, i) => i);
    shuffle(pixeles);

    return (
        <motion.div
            style={{
                width: cols * pixelSize,
                height: rows * pixelSize,
            }}
            className={clsx("flex flex-wrap", className)}
        >
            {
                pixeles.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {delay: val * 0.01, ease: "easeInOut"}}}
                        style={{
                            width: pixelSize,
                            height: pixelSize,
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `-${pixelSize * (i - Math.floor(i / cols) * cols)}px -${pixelSize * Math.floor(i / cols)}px`,
                            backgroundSize: `${cols * pixelSize}px ${rows * pixelSize}px`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                ))
            }
        </motion.div>
    )
}