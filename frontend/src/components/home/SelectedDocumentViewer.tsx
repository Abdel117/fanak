'use client';

import {useEffect, useState} from "react";
import useDocSearchStore from "@/stores/useDocSearchStore";
import {motion} from "framer-motion";
import {DocumentType} from "@/stores/types";
import PixelatedImage from "@/components/motion/PixelatedImage";
import RandomText from "@/components/motion/RandomText";

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

    return selectedDoc != null && <div className={"flex items-end w-fit sticky top-20 flex-col gap-10 shrink-0 h-fit"}>
        {/*{*/}
        {/*    docsStack.map((doc, index) => {*/}
        {/*        const position = docsStack.length - index - 1;*/}

        {/*        return index < docsStack.length - 1 && <motion.img*/}
        {/*            key={doc._instanceId}*/}
        {/*            src={doc.coverSrc}*/}
        {/*            animate={{x: position * 20,  opacity: 1.4 - position / docsStack.length}}*/}
        {/*            transition={{duration: 0.7, ease: 'easeOut'}}*/}
        {/*            className={`w-45 h-60 absolute`}*/}
        {/*        />*/}
        {/*    })*/}
        {/*}*/}

        <PixelatedImage
            key={selectedDoc.id}
            className={"outline z-10"}
            src={selectedDoc.coverSrc}
            rows={8}
            cols={6}
            pixelSize={30}
        />

        <RandomText text={selectedDoc.title} className={"text-end max-w-40"}/>

    </div>
}