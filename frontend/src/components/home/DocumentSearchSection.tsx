import SelectedDocumentViewer from "@/components/home/SelectedDocumentViewer";
import DocumentGrid from "@/components/home/DocumentGrid";
import DocumentGenrePicker from "@/components/home/DocumentGenrePicker";

export default function DocumentSearchSection() {
    return (
        <div className="flex justify-around">
            <DocumentGenrePicker />
            <DocumentGrid />
            <SelectedDocumentViewer />
        </div>
    );
}