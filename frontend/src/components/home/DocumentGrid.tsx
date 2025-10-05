'use client';

import useDocSearchStore from "@/stores/useDocSearchStore";
import clsx from "clsx";
import { motion } from "framer-motion";
import {DocumentType} from "@/stores/types";

export default function DocumentGrid() {
    const documents = useDocSearchStore(state => state.documents);

    return <div className="flex flex-wrap w-fit gap-40">
        {
            documents.map((d, i) => (
                <DocumentElement key={i} doc={d} index={i}/>
            ))
        }
    </div>;
}

function DocumentElement({doc, index}: { doc: DocumentType, index: number}) {
    const setSelectedDoc = useDocSearchStore(state => state.setSelectedDoc)
    const selectedDoc = useDocSearchStore(state => state.selectedDoc)
    const selected = doc == selectedDoc;

    const handleOnClick = () => {
        setSelectedDoc(doc);
    }

    return <motion.div className={clsx("flex p-2 cursor-pointer break-inside-avoid", selected ? "outline" : '')} onClick={handleOnClick}>
        <motion.img
            layoutId={"box-" + index}
            className={`shrink-0 w-24 h-36 shadow-xl outline outline-primary`}
            src={doc.coverSrc}
            whileInView={{opacity: 1}}
            viewport={{amount: 1}}
        />

        <div className="flex flex-col w-30 h-full">
            <p className={"font-serif w-30 text-justify"}>{doc.title}</p>
        </div>
    </motion.div>
}