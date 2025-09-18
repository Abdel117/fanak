"use client"
import { motion, LayoutGroup } from "framer-motion"
import { useState } from "react"

export default function Example() {
    const [moved, setMoved] = useState(false)

    return (
        <LayoutGroup>
            <div className="flex gap-4 z-100">
                {!moved && (
                    <motion.div
                        layoutId="box"
                        className="w-24 h-24 bg-blue-400 rounded-lg"
                    />
                )}
                <button
                    onClick={() => setMoved(!moved)}
                    className="px-4 py-2 border"
                >
                    Toggle
                </button>
                {moved && (
                    <motion.div
                        layoutId="box"
                        className="w-24 h-24 bg-blue-400 rounded-lg"
                    />
                )}
            </div>
        </LayoutGroup>
    )
}
