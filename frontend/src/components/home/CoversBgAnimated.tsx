'use client';

import {LayoutGroup, motion, useAnimationControls} from "framer-motion";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {loremIpsum} from "@/utils/utils";
import {DocumentType} from "@/stores/types";
import useDocSearchStore from "@/stores/useDocSearchStore";

const COVERS_COUNT = 100
const FLOATING_COVERS = 12

function DocumentGenrePicker() {
    return <div className={"flex flex-col gap-10"}>
            <p>Novela</p>
            <p className={"opacity-40"}>Teatro</p>
            <p className={"opacity-40"}>Poesía</p>
            <p className={"opacity-40"}>Cuento corto</p>
    </div>;
}

function DocumentTypePicker() {
    return <div className={"flex flex-col gap-40"}>
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
                        src={doc.src}
                        animate={{x: position * 20, opacity: 1.2 - position / docsStack.length}}
                        transition={{duration: 0.7, ease: 'easeOut'}}
                        className={`w-40 absolute`}
                    />
            })
        }

        <motion.img
            className={"w-40 border z-10"}
            src={selectedDoc.src}
        />

        <p className={"font-serif w-40 text-justify"}>{selectedDoc.title}</p>
    </div>
}

export default function CoversBgAnimated() {
    const [floating, setFloating] = useState(true);
    const [covers, setCovers] = useState<DocumentType[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: COVERS_COUNT }).map((value, index, array) => {
            const src = `https://picsum.photos/id/${Math.round(Math.random()*1000)}/200/300`;
            const h = 10 + Math.random() * 200;
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const title = loremIpsum(4);
            return {id: index, title, src, h, x, y };
        });

        setCovers(generated);
    }, []);

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

    return <LayoutGroup>
                <div className="h-screen w-full absolute top-0">
                    {
                        covers.map((c, i) => {
                            if (i < FLOATING_COVERS) return <FloatingCover key={i} floating={floating} c={c} i={i}/>;
                        })
                    }
                </div>
                <div className="flex justify-around">
                    <div className={"h-screen sticky top-0 flex justify-center items-center w-full"}>
                        <DocumentTypePicker />
                    </div>
                    <DocumentGrid covers={covers} floating={floating} />
                    <div className={"h-screen sticky top-0 flex w-full items-center justify-center"}>
                        <SelectedDocumentViewer />
                    </div>
                </div>
             </LayoutGroup>;
}

function DocumentGrid({covers, floating}: {covers: DocumentType[], floating: boolean}) {
    return <div className="columns-3 gap-40">
        {
            covers.map((c, i) => (
                <Document key={i} cover={c} index={i} floating={floating}/>
            ))
        }
    </div>;
}

function Document({ cover, index, floating}: { cover: DocumentType,index: number, floating: boolean }) {
    const setSelectedDoc = useDocSearchStore().setSelectedDoc

    const showCover = (!floating && index < FLOATING_COVERS) || index >= FLOATING_COVERS;
    const [returnDuration, setReturnDuration] = useState(1);
    const [width, setWidth] = useState(5);


    useEffect(() => {
        setReturnDuration(1 + Math.random() * 2);
        setWidth(3 + Math.random() * 3)
    }, []);

    const handleOnHoverStart = () => {
        setSelectedDoc(cover);
    }

    const handleOnHoverEnd = () => {
       // setSelectedDoc(null);
    }

    return <motion.div className={"flex cursor-pointer break-inside-avoid mt-40 "} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
       {
            showCover && <motion.img
                layoutId={"box-" + index}
                style={{ width: `${width}em`, height: `${width*3/2}em` }}
                className={`shrink-0 shadow-xl  h-auto outline outline-primary`}
                src={cover.src}
                whileInView={{opacity: 1}}
                viewport={{amount: 1}}
                transition={{duration: returnDuration, ease: "easeOut"}}
           />
       }

       {
            !showCover && <motion.img
                style={{ width: `${width}em`, height: `${width*3/2}em` }}
                src={cover.src}
            />
       }

        <div className="flex flex-col w-30 h-full">
            <p className={"font-serif w-30 text-justify"}>{cover.title}</p>
        </div>
    </motion.div>
}

function FloatingCover({floating, c, i}: { floating: boolean, c: DocumentType, i: number }) {
    const controls = useAnimationControls();
    const [target, setTarget] = useState({x: 0, y: 0});
    const [showTitle, setShowTitle] = useState(false);
    const [scale, setScale] = useState(1);
    const [returnDuration, setReturnDuration] = useState(1);

    useEffect(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const scale = 0.5 + Math.random() * 0.5;
        const returnDuration = 1 + Math.random() * 2;

        setTarget({x, y});
        setScale(scale);
        setReturnDuration(returnDuration);

        (async () => await controls.start("animate"))()
    }, [controls]);

    const variants = {
        initial: { x: c.x, y: c.y },
        animate: { x: target.x, y: target.y },
        hover: {scale: 1, duration: 0.5 },
    };

    const handleOnHoverStart = () => {
        controls.stop();
        setShowTitle(true);
    }

    const handleOnHoverEnd = async () => {
        setShowTitle(false);
        await controls.start("animate");
    }

    return <motion.div
        className={clsx("h-[20vh] w-[7vw] absolute hover:cursor-pointer opacity-70 hover:opacity-100 hover:z-[1000]", floating ? "" : 'pointer-events-none')}
        initial={"initial"}
        variants={variants}
        animate={controls}
        transition={{duration: 200, repeat: Infinity, repeatType: "reverse"}}
        onHoverStart={handleOnHoverStart}
        onHoverEnd={handleOnHoverEnd}
        style={{scale}}
        whileHover={"hover"}
    >
        {
            floating && <motion.img
                transition={{duration: returnDuration, ease: "easeOut"}}
                layoutId={"box-" + i}
                src={c.src}
            />
        }
        {showTitle && <p className={"flex justify-between font-serif"}>{i}. <span className={"ml-5 text-end font-serif"}>{c.title}</span></p>}
    </motion.div>
}