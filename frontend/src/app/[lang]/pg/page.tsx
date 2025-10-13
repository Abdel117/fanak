import PixelatedImage from "@/components/motion/PixelatedImage";



type CreateElement = {
    (tag: 'a'): HTMLAnchorElement
    (tag: 'canvas'): HTMLCanvasElement
}

const createElement = ((tag) => {
    switch (tag) {
        case 'a':
            return new HTMLAnchorElement();
        case 'canvas':
        default:
            throw new Error(`Unknown tag "${tag}"`);
    }
}) as CreateElement;

createElement('a')
createElement('canvas')

export default function Pg(){
    return (
        <div className={"flex flex-col items-center justify-center w-screen h-screen"}>
            <PixelatedImage pixelSize={40} rows={11} cols={10} src={"/assets/covers/1.webp"}/>
        </div>
    )
}