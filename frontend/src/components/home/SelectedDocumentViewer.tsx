'use client';

import {useEffect, useState} from "react";
import useDocSearchStore from "@/stores/useDocSearchStore";
import {DocumentType} from "@/stores/types";
import PixelatedImage from "@/components/motion/PixelatedImage";
import RandomText from "@/components/motion/RandomText";
import { motion } from "framer-motion";

export default function SelectedDocumentViewer() {
    const [docsStack, setDocsStack] = useState<(DocumentType & { _instanceId: string })[]>([]);
    const selectedDoc = useDocSearchStore().selectedDoc;

    useEffect(() => {
        if (selectedDoc != null) {
            setDocsStack(d => {
                const entry = { ...selectedDoc, _instanceId: crypto.randomUUID() };
                const next = [...d, entry];
                return next.slice(-7);
            });
        }
    }, [selectedDoc]);

    return selectedDoc != null && <div className={"flex justify-center pl-20 w-1/4 items-center sticky top-0 flex-col gap-10 shrink-0 h-screen"}>
        {
            docsStack.map((doc, index) => {
                const position = docsStack.length - index - 1;

                return index < docsStack.length - 1 && <motion.img
                    key={doc._instanceId}
                    src={doc.coverSrc}
                    animate={{x: position * 20, y: position * -20,  opacity: 1.4 - position / docsStack.length}}
                    transition={{duration: 0.7, ease: 'easeOut'}}
                    className={`w-45 h-60 absolute m-auto`}
                />
            })
        }

        <RandomText text={selectedDoc.title} className={"text-end max-w-40 absolute bottom-0"}/>

        <PixelatedImage
            key={selectedDoc.id}
            className={"outline z-10 relative"}
            src={selectedDoc.coverSrc}
            rows={8}
            cols={6}
            pixelSize={30}
        />
    </div>
}