import { create } from 'zustand/react';
import { DocumentType } from './types';


interface DocSearchStore {
    selectedDoc: DocumentType | null;

    setSelectedDoc: (newCover: DocumentType | null) => void;
}


const useDocSearchStore = create<DocSearchStore>((set, get, store) => ({

    selectedDoc: null,

    setSelectedDoc: (newCover: DocumentType | null) => {
        set({
            selectedDoc: newCover
        })
    }

}));

export default useDocSearchStore;
