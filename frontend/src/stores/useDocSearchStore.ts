import { create } from 'zustand/react';
import { DocumentType } from './types';
import { loremIpsum } from "@/utils/utils";

export const COVERS_COUNT = 100
export const FLOATING_COVERS = 12

interface DocSearchStore {
    documents: DocumentType[];

    selectedDoc: DocumentType | null;

    setSelectedDoc: (newCover: DocumentType | null) => void;

    generateDocuments: () => void;
}

const useDocSearchStore = create<DocSearchStore>((set, get, store) => ({

    documents: [],

    selectedDoc: null,

    setSelectedDoc: (newCover: DocumentType | null) => {
        set({
            selectedDoc: newCover
        })
    },

    generateDocuments: () => {
        const docs = Array.from({ length: COVERS_COUNT }).map((_, index) => {
            const coverSrc = `https://picsum.photos/id/${Math.round(Math.random() * 1000)}/200/300`;
            const title = loremIpsum(4);
            return { id: index, title, coverSrc };
        });
        set({ documents: docs });
    }
}));

export default useDocSearchStore;
