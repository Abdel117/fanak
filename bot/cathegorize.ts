import * as fs from "fs";
import * as path from "path";

function categorize(sizeKB: number): string {
    if (sizeKB <= 14) return "5min";
    if (sizeKB <= 28) return "10min";
    if (sizeKB <= 42) return "15min";
    if (sizeKB <= 56) return "20min";
    if (sizeKB <= 69) return "25min";
    if (sizeKB <= 82) return "30min";
    return "mas30min";
}

const folder = "./descargas";
const files = fs.readdirSync(folder).filter(f => f.endsWith(".epub"));

for (const file of files) {
    const filePath = path.join(folder, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);

    const category = categorize(sizeKB);
    const destDir = path.join(folder, category);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);

    const destPath = path.join(destDir, file);
    fs.renameSync(filePath, destPath);

    console.log(`${file} (${sizeKB} KB) → ${category}`);
}
