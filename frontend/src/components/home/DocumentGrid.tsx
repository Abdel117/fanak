'use client';

import useDocSearchStore from "@/stores/useDocSearchStore";
import clsx from "clsx";
import {motion, Variants} from "framer-motion";
import {DocumentType} from "@/stores/types";

export default function DocumentGrid() {
    const documents = useDocSearchStore(state => state.documents);

    return <div className="flex flex-wrap w-fit gap-40 ">
        {
            documents.map((d, i) => (
                <DocumentElement key={i} doc={d} index={i}/>
            ))
        }
    </div>;
}

const docElementVariants: Variants = {
    initial: {
        scale: 1,
    },
    selected: {
        scale: [1, 0.9, 1.1],
        "--gap": "10px",
        transition: {
            duration: 0.5,
            times: [0, 0.1, 0.2], // marca los momentos del array
            ease: "easeIn"
        }
    }
};

const outlineVariants: Variants = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0
        }
    },
    selected: {
        opacity: [0, 1],
        transition: {
            duration: 0.2,
            times: [0, 1],
            ease: "easeIn"
        }
    }
}

function DocumentElement({doc, index}: { doc: DocumentType, index: number}) {
    const setSelectedDoc = useDocSearchStore(state => state.setSelectedDoc)
    const selectedDoc = useDocSearchStore(state => state.selectedDoc)
    const selected = doc == selectedDoc;

    const handleOnClick = () => {
        setSelectedDoc(doc);
    }

    return <motion.div
        variants={docElementVariants}
        animate={selected ? "selected"  : "initial"}
        className={clsx("flex p-2 cursor-pointer break-inside-avoid", selected ? "opacity-100" : '')} onClick={handleOnClick}
    >
        <motion.div
            variants={outlineVariants}
            animate={selected ? "selected" : "initial"}
            className="absolute -inset-4  pointer-events-none"
        >
            <div className="absolute top-0 left-0 size-4  border-l border-t" />
            <div className="absolute top-0 right-0 size-4 border-r border-t" />
            <div className="absolute bottom-0 left-0 size-4 border-l border-b" />
            <div className="absolute bottom-0 right-0 size-4 border-r border-b" />
        </motion.div>


        <motion.img
            layoutId={"box-" + index}
            className={`shrink-0 w-24 h-36 shadow-xl `}
            src={doc.coverSrc}
            whileInView={{opacity: 1}}
            viewport={{amount: 1}}
        />


        <div className={clsx("flex flex-col w-30 h-full justify-between items-end", selected ? "opacity-100" : "")}>
            <motion.p className={clsx("font-serif w-30")}>{doc.title}</motion.p>
            <motion.p className={clsx("font-serif w-30  opacity-20 hover:opacity-100 hover:underline", selected ? "opacity-100" : "")}>{doc.author}</motion.p>
        </div>
    </motion.div>
}