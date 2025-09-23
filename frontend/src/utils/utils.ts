export function loremIpsum(words: number): string {
    const base = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    const parts = base.split(" ");
    const result: string[] = [];
    for (let i = 0; i < words; i++) {
        result.push(parts[Math.floor(Math.random() * parts.length)]);
    }
    return result.join(" ");
}

export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}