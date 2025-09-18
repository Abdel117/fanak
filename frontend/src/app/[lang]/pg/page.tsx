'use client';

import {useEffect, useRef, useState} from "react";
import {LayoutGroup, motion} from "framer-motion";


export default function Pg(){
    return (
        <div className={"flex flex-col items-center justify-center w-screen h-fit"}>
            <Box/>
        </div>
    )
}

function Box() {
    const [moved, setMoved] = useState(true)
    const [size, setSize] = useState({x: 0, y: 0});
    const scrollThreshold = 300;

    const boxes = Array.from({length: 14});

    useEffect(() => {

        if(window) {
            setSize({x: window.innerWidth, y: window.innerHeight});
        }

        const handleScroll = () => {
            setMoved(window.scrollY <= scrollThreshold);
        }

        const handleResize = () => {
            if(window) {
                setSize({x: window.innerWidth, y: window.innerHeight});
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <LayoutGroup>
            <div className="w-full h-screen overflow-hidden">
                {
                    boxes.map((box, i) => (
                        <motion.div
                            key={i}
                            className={"h-[20vh] w-[7vw] absolute"}
                            initial={{x: size.x * Math.random(), y: size.y  * Math.random() }}
                            animate={{x: size.x * Math.random(), y: size.y  * Math.random() }}
                            transition={{duration: 20, repeat: Infinity, repeatType: "reverse"}}
                        >
                            {
                                moved && (
                                    <motion.div
                                        layoutId={"box " + i}
                                        animate={{width: "10vw", height: "30vh", opacity: 0.5}}
                                        className="h-32 w-20 bg-blue-400"
                                        whileHover={{opacity: 1, scale: 1.2}}
                                    />
                                )
                            }
                        </motion.div>
                    ))
                }
            </div>
            <div className={"w-full max-w-6xl h-screen flex gap-40"}>
                <div className="w-full h-full flex content-start gap-20 items-start flex-wrap ">
                    {
                        boxes.map((box, i) => (
                            !moved && (
                                <motion.div
                                    key={"box" + i}
                                    layoutId={"box " + i}
                                    className="h-32 w-20 bg-blue-400 shrink-0"
                                    whileHover={{border: "white bottom 2px solid", cursor: "pointer", scale: 1.02}}
                                />
                            )
                        ))
                    }
                </div>
                <div className={"h-full flex flex-col items-end mt-20 w-xs gap-10"}>
                    <p>Narrativa</p>
                    <p>Cuento</p>
                    <p>Ensayo</p>
                    <p>Teatro</p>
                    <p>Lírica</p>
                </div>
            </div>
        </LayoutGroup>
    )
}