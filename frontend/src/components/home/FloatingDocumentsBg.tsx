'use client';

import { motion, useAnimationControls} from "framer-motion";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {DocumentType} from "@/stores/types";
import useDocSearchStore, {FLOATING_COVERS} from "@/stores/useDocSearchStore";

export default function FloatingDocumentsBg() {
    const documents = useDocSearchStore(state => state.documents);
    const generateDocs = useDocSearchStore(state => state.generateDocuments);

    useEffect(() => {
        generateDocs()
    }, [generateDocs]);

    return (
        <div className="h-screen w-full absolute top-0">
                {
                    documents.map((d, i) => {
                        if (i < FLOATING_COVERS) return <FloatingDocument key={i} doc={d} index={i}/>;
                    })
                }
        </div>
    );
}

function FloatingDocument({ doc, index }: {doc: DocumentType, index: number }) {
    const controls = useAnimationControls();
    const [origen, setOrigen] = useState({ x: 0, y: 0 });
    const [target, setTarget] = useState({ x: 50, y: 50 });
    const [showTitle, setShowTitle] = useState(false);
    const [scale, setScale] = useState(1);
    const [render, setRender] = useState(false);

    const variants = {
        initial: { x: origen.x + 'vw', y: origen.y + 'vh' },
        animate: { x: target.x + 'vw', y: target.y + 'vh' },
        hover: { scale: 2 }
    };

    useEffect(() => {
        setOrigen({
            x: Math.random() * 100,
            y: Math.random() * 100
        });
        setTarget({
            x: Math.random() * 100,
            y: Math.random() * 100
        });
        setScale(0.5 + Math.random() * 0.7);
        setRender(true);
    }, []);

    useEffect(() => {
    }, [controls, render]);

    const handleOnHoverStart = () => {
        controls.stop();
        setShowTitle(true);
    };

    const handleOnHoverEnd = async () => {
        setShowTitle(false);
        await controls.start("animate");
    };

    return (
        render && <motion.div
                className={"absolute hover:cursor-pointer opacity-70 hover:opacity-100 hover:z-[1000]"}
                animate={controls}
                initial={"initial"}
                variants={variants}
                transition={{duration: 200, repeat: Infinity, repeatType: "reverse"}}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
                style={{scale}}
                whileHover="hover"
            >
                <motion.img
                    className="h-[20vh] w-[7vw]"
                    src={doc.coverSrc}
                />

                {
                    <p className={clsx("flex justify-between font-serif w-[7vw] text-shadow", showTitle ? '' : 'opacity-0')}>
                        {index}.{" "}
                        <span className="ml-5 text-end font-serif">{doc.title}</span>
                    </p>
                }
        </motion.div>
    )
}
