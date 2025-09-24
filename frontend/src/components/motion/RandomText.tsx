'use client';

import { useEffect, useState } from "react";

const chars: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;+-*/=".split("");

export default function RandomText({ text, className }: { text: string; className?: string }) {
    const [displayedText, setDisplayedText] = useState(
        Array.from(text).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText(prev => {
                if (prev === text) {
                    clearInterval(interval);
                    return prev;
                }

                return Array.from(prev)
                    .map((c, i) => {
                        if (c !== text[i]) {
                            let pos = chars.indexOf(c);
                            if (pos === -1) pos = 0;
                            if (pos >= chars.length - 1) pos = -1;
                            return chars[pos + 1];
                        }
                        return c;
                    })
                    .join("");
            });
        }, 25);

        return () => clearInterval(interval);
    }, [text]);

    return <p className={className}>{displayedText}</p>;
}