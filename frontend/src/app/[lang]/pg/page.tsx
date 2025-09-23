import PixeledImage from "@/components/motion/PixeledImage";

export default function Pg(){
    return (
        <div className={"flex flex-col items-center justify-center w-screen h-screen"}>
            <PixeledImage pixelSize={40} rows={15} cols={10} src={"/assets/covers/1.webp"}/>
        </div>
    )
}