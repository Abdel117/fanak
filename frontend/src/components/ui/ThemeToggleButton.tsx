'use client'

import { useEffect, useState } from 'react';

export default function ThemeToggleButton() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <button onClick={() => setTheme('light')}>
                Tema claro
            </button>

            <button onClick={() => setTheme('dark')}>
                Tema dark
            </button>
        </>
    );
}