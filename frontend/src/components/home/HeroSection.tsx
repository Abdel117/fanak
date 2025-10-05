import RandomText from "@/components/motion/RandomText";
import FloatingDocumentsBg from "@/components/home/FloatingDocumentsBg";
import READ from "@/assets/READ.svg"


export default function HeroSection() {
    return (
        <div className={"w-full h-fit relative"}>
            <div className={"w-full h-screen flex flex-col items-center justify-center "}>
                <div className={"w-full max-w-7xl justify-between flex flex-row"}>
                    <RandomText className={"w-50"} text={"Short open source documents to read on the go"}/>
                    <READ className={"z-10"}/>
                </div>
            </div>

            <FloatingDocumentsBg/>
        </div>
    )
}