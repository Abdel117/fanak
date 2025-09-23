'use client';

import {LayoutGroup, motion, useAnimationControls} from "framer-motion";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {DocumentType} from "@/stores/types";
import useDocSearchStore, {FLOATING_COVERS} from "@/stores/useDocSearchStore";
import PixeledImage from "@/components/motion/PixeledImage";

function DocumentGenrePicker() {
    return <div className={"flex flex-col gap-10"}>
            <p>Novela</p>
            <p className={"opacity-40"}>Teatro</p>
            <p className={"opacity-40"}>Poesía</p>
            <p className={"opacity-40"}>Cuento corto</p>
    </div>;
}

function DocumentTypePicker() {
    return <div className={"flex flex-col shrink-0 gap-40"}>
        <div className={"flex flex-col gap-10"}>
            <p className={"cursor-pointer"}>
                Fiction
            </p>
            <p className={"opacity-40 cursor-pointer"}>
                Non fiction
            </p>
        </div>
        <DocumentGenrePicker/>
    </div>
}

function SelectedDocumentViewer() {
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

    return selectedDoc != null && <div className={"flex relative items-end w-fit p-10 flex-col gap-10 shrink-0 h-fit  "}>
        {
            docsStack.map((doc, index) => {
                const position = docsStack.length - index;

                return index < docsStack.length - 1 && <motion.img
                        key={doc._instanceId}
                        src={doc.coverSrc}
                        animate={{x: position * 20,y: position * -20, opacity: 1.2 - position / docsStack.length}}
                        transition={{duration: 0.7, ease: 'easeOut'}}
                        className={`w-45 h-60 absolute`}
                    />
            })
        }

        <PixeledImage
            key={selectedDoc.id}
            className={" z-10"}
            src={selectedDoc.coverSrc}
            rows={8}
            cols={6}
            pixelSize={30}
        />

        <p className={"font-serif w-40 text-end h-20 "}>{selectedDoc.title}</p>
    </div>
}

export default function CoversBgAnimated() {
    const documents = useDocSearchStore(state => state.documents);
    const generateDocs = useDocSearchStore(state => state.generateDocuments);

    const [floating, setFloating] = useState(true);

    useEffect(() => {
        // const threshold = window.innerHeight / 4;
        //
        // const onScroll = () => {
        //     if (window.scrollY <= threshold && !floating) {
        //         setFloating(true);
        //     } else if (window.scrollY > threshold && floating) {
        //         setFloating(false);
        //     }
        // };
        //
        // window.addEventListener("scroll", onScroll);
        // return () => window.removeEventListener("scroll", onScroll);
    }, [floating]);

    useEffect(() => {
        generateDocs()
    }, [generateDocs]);

    return <>
                <div className="h-screen w-full absolute top-0">
                    {
                        documents.map((c, i) => {
                            if (i < FLOATING_COVERS) return <FloatingDocument key={i} floating={floating} c={c} i={i}/>;
                        })
                    }
                </div>
                <div className="flex justify-around">
                    <div className={"h-screen sticky top-0 flex justify-center items-center w-1/3 min-w-fit px-20"}>
                        <DocumentTypePicker />
                    </div>
                    <DocumentGrid />
                    <div className={"h-screen sticky top-0 flex w-full items-center justify-center"}>
                        <SelectedDocumentViewer />
                    </div>
                </div>
    </>;
}

function DocumentGrid() {
    const documents = useDocSearchStore(state => state.documents);

    return <div className="flex flex-wrap justify-center">
        {
            documents.map((d, i) => (
                <DocumentElement key={i} doc={d} index={i}/>
            ))
        }
    </div>;
}

function DocumentElement({ doc, index}: { doc: DocumentType, index: number}) {
    const setSelectedDoc = useDocSearchStore(state => state.setSelectedDoc)
    const selectedDoc = useDocSearchStore(state => state.selectedDoc)

    const [returnDuration, setReturnDuration] = useState(1);
    const [width, setWidth] = useState(5);
    const showBorder = doc == selectedDoc;

    useEffect(() => {
        setReturnDuration(1 + Math.random() * 2);
        setWidth(3 + Math.random() * 3)
    }, []);

    const handleOnClick = () => {
        setSelectedDoc(doc);
    }

    return <motion.div className={clsx("flex cursor-pointer p-20 break-inside-avoid", showBorder ? "outline" : '')} onClick={handleOnClick}>
        <motion.img
                layoutId={"box-" + index}
                style={{ width: `${width}em`, height: `${width*3/2}em` }}
                className={`shrink-0 shadow-xl  h-auto outline outline-primary`}
                src={doc.coverSrc}
                whileInView={{opacity: 1}}
                viewport={{amount: 1}}
                transition={{duration: returnDuration, ease: "easeOut"}}
        />

        <div className="flex flex-col w-30 h-full">
            <p className={"font-serif w-30 text-justify"}>{doc.title}</p>
        </div>
    </motion.div>
}

function FloatingDocument({ floating, c, i }: { floating: boolean, c: DocumentType, i: number }) {
    const controls = useAnimationControls();
    const [origen, setOrigen] = useState({ x: 0, y: 0 });
    const [target, setTarget] = useState({ x: 50, y: 50 });
    const [showTitle, setShowTitle] = useState(false);
    const [scale, setScale] = useState(1);
    const [render, setRender] = useState(false);
    const [returnDuration, setReturnDuration] = useState(1);

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

        (async () => {
            await controls.start("animate");
        })();
    }, [controls]);

    const handleOnHoverStart = () => {
        controls.stop();
        setShowTitle(true);
    };

    const handleOnHoverEnd = async () => {
        setShowTitle(false);
        await controls.start("animate");
    };

    return <motion.div
                className={clsx(
                    "absolute hover:cursor-pointer opacity-70 hover:opacity-100 hover:z-[1000]",
                    floating ? "" : "pointer-events-none"
                )}
                animate={controls}
                variants={variants}
                transition={{duration: 200, repeat: Infinity, repeatType: "reverse"}}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
                style={{scale}}
                whileHover="hover"
            >
                <motion.img
                    className="h-[20vh] w-[7vw]"
                    src={c.coverSrc}
                />

                {showTitle && (
                    <p className="flex justify-between font-serif">
                        {i}.{" "}
                        <span className="ml-5 text-end font-serif">{c.title}</span>
                    </p>
                )}
           </motion.div>
}
