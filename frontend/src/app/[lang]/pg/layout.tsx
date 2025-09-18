import React from "react";

export default function PgLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <div >
            {children}
        </div>
    );
}