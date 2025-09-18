'use client';

import {LayoutGroup, motion, useAnimationControls, useMotionValue, useScroll, useSpring} from "framer-motion";
import {Ref, RefObject, useEffect, useRef, useState} from "react";
import clsx from "clsx";

type Cover = {
    title: string;
    src: number;
    h: number;
    x: number;
    y: number;
}

const boxCount = 100

const covers: Cover[] = Array.from({length: boxCount}).map(() => {
    const src = Math.random() * 1000
    const h = 10 + Math.random() * 20
    const x = Math.random() * 1000
    const y = Math.random() * 1000
    const title = "Very very long title"
    return {title, src, h, x, y}
});

function DocumentGenrePicker() {
    return <div className={"flex gap-2 opacity-50 flex-col items-end "}>
        <p>Novela</p>
        <p>Teatro</p>
        <p>Poesía</p>
        <p>Cuento corto</p>
        <p>Fiction</p>
    </div>;
}

function DocumentTypePicker() {
    return <p className={"w-30 text-3xl font-serif opacity-20"}>Fiction</p>;
}


export default function CoversBgAnimated() {
    const [floating, setFloating] = useState(true);
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY === 0 && !floating) {
                setFloating(true);
            } else if (window.scrollY > 0 && floating) {
                setFloating(false);
            }

            setInView(window.scrollY >= window.innerHeight);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [floating]);

    return (
        <>
            <LayoutGroup>
                <div className="h-screen w-full absolute top-0">
                    {
                        covers.map((c, i) => {
                            if (i < 10)
                                return <FloatingCover key={i} floating={floating} c={c} i={i}/>;

                        })
                    }
                </div>
                <div className="border flex justify-around  ">
                    <div className={clsx("h-screen sticky top-0 flex justify-between items-center shrink-0 w-fit")}>
                        <DocumentTypePicker />
                    </div>
                    <DocumentGrid windowRef={ref} floating={floating} />
                    <div className={"h-screen sticky top-0 flex justify-between items-center w-fit"}>
                        <DocumentGenrePicker />
                        <div ref={ref} className={"h-1/2 absolute -left-[87vw] w-screen flex justify-between items-center border-orange-500 border"}></div>
                    </div>
                </div>
            </LayoutGroup>
        </>
    )
}

function DocumentGrid({floating, windowRef}: { floating: boolean, windowRef: RefObject<HTMLDivElement | null> }) {
    const parentRef = useRef<HTMLDivElement>(null);
    const [halfHeight, setHalfHeight] = useState<number | undefined>(undefined);
    const row = useMotionValue(0)

    useEffect(() => {
        const onScroll = () => {
            row.set(-window.scrollY);
        };

        window.addEventListener("scroll", onScroll, { passive: false });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (parentRef.current) {
            const height = parentRef.current.scrollHeight;
            setHalfHeight(height / 2);
        }
    }, []);

    return <div
        ref={parentRef}
        className="pl-25 grid gap-x-20 gap-y-20 grid-cols-3 grid-flow-row w-fit relative"
        style={halfHeight ? { height: halfHeight } : {}}
    >
        {
            covers.map((c, i) => (
                <motion.div key={i} style={{y: row}} transition={{duration: 0.3}} >
                    <Document parentRef={windowRef} cover={c} index={i}/>
                </motion.div>
            ))
        }
    </div>;
}

function Document({parentRef, cover, index}: {
    parentRef: RefObject<HTMLDivElement | null>,
    cover: Cover,
    index: number,
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isInside, setIsInside] = useState(false)

    useEffect(() => {
        if (!parentRef.current || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsInside(entry.isIntersecting),
            {root: parentRef.current}
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [parentRef]);

    return <div className={"flex gap-10"} key={index} ref={ref}>
        <motion.img
            layoutId={"box-" + index}
            className={clsx(`shrink-0 w-30`, isInside ? '' : 'opacity-20')}
            whileHover={{border: "white bottom 2px solid", cursor: "pointer", scale: 1.02}}
            src={`https://picsum.photos/200/300?random=${cover.src}`}
        />

        {isInside && <div className="flex flex-col justify-end w-30 h-full">
            <p className={"font-serif  w-30"}>{cover.title}</p>
        </div>}
    </div>
}

function FloatingCover({floating, c, i}: { floating: boolean, c: Cover, i: number }) {
    const controls = useAnimationControls();

    const variants = {
        initial: {x: c.x, y: c.y},
        animate: {x: `${100 * Math.random()}vw`, y: `${100 * Math.random()}vh`}
    }

    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        controls.start("animate")
    }, []);

    const handleOnHoverStart = () => {
        controls.stop();
        setShowTitle(true);
    }

    const handleOnHoverEnd = () => {
        setShowTitle(false);
        controls.start("animate")
    }

    return <motion.div
        key={i}
        className={"h-[20vh] w-[7vw] absolute"}
        // initial={{x: size.x * Math.random(), y: size.y  * Math.random() }}
        // animate={{x: size.x * Math.random(), y: size.y  * Math.random() }}
        initial={"initial"}
        variants={variants}
        animate={controls}
        transition={{duration: 200, repeat: Infinity, repeatType: "reverse"}}
        whileHover={{zIndex: 1000}}
        onHoverStart={handleOnHoverStart}
        onHoverEnd={handleOnHoverEnd}
    >
        {
            floating && <motion.img
                layoutId={"box-" + i}
                animate={{width: "7vw", height: "20vh", opacity: 0.5}}
                className="h-32 w-20"
                whileHover={{opacity: 1}}
                src={`https://picsum.photos/200/300?random=${c.src}`}
            />
        }

        {/*<motion.img*/}
        {/*    layoutId={"box-"+i}*/}
        {/*    src={`https://picsum.photos/200/300?random=${c.src}`}*/}
        {/*/>*/}

        {showTitle && <p className={"flex justify-between"}>{i}. <span className={"text-end"}>{c.title}</span></p>}
    </motion.div>
}