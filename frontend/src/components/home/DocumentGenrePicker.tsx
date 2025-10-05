

export default function DocumentGenrePicker() {
    return <div className={"flex flex-col sticky w-1/6 justify-center top-20 shrink-0 gap-40 text-xs h-fit"}>
        <div className={"flex flex-col gap-10"}>
            <p className={"cursor-pointer"}>Fiction</p>
            <p className={"opacity-40 cursor-pointer"}>Non fiction</p>
        </div>
        <div className={"flex flex-col gap-10"}>
            <p>Novela</p>
            <p className={"opacity-40"}>Teatro</p>
            <p className={"opacity-40"}>Poesía</p>
            <p className={"opacity-40"}>Cuento corto</p>
        </div>
    </div>
}