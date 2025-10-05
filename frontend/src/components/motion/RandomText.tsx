'use client';

import {useEffect, useRef, useState} from "react";

const chars: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;+-*/=".split("");

type RandomTextProps = {
    text: string;
    className?: string;
    limit?: number;
}

export default function RandomText({ text, className, limit = 40 }: RandomTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const limitsRef = useRef<number[]>([]);

    useEffect(() => {
        setDisplayedText(Array.from(text).map((c) => c == ' ' ? c : chars[Math.floor(Math.random() * chars.length)]).join(""));
        limitsRef.current = Array.from(text, () => 0);
    }, [text]);

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
                            if (limitsRef.current[i] >= limit) return text[i];

                            let pos = chars.indexOf(c);
                            if (pos === -1) pos = 0;
                            if (pos >= chars.length - 1) pos = -1;

                            limitsRef.current[i] += 1;
                            return chars[pos + 1];
                        }

                        return c;
                    })
                    .join("");
            });

        }, 35);

        return () => clearInterval(interval);
    }, [text, limit]);

    return <p className={className}>{displayedText}</p>;
}