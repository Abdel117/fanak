export function loremIpsum(words: number): string {
    const base = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    const parts = base.split(" ");
    const result: string[] = [];
    for (let i = 0; i < words; i++) {
        result.push(parts[Math.floor(Math.random() * parts.length)]);
    }
    return result.join(" ");
}