const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const target = process.argv[2];
const root = path.resolve(__dirname, "..");

if (!target || !["chrome", "firefox"].includes(target)) {
    console.error("usage: node scripts/zip.js <chrome|firefox>");
    process.exit(1);
}

const sourceDir = path.join(root, "dist", target);
const outPath = path.join(root, "dist", `${target}.zip`);

const outDir = path.dirname(outPath);
if (!fs.existsSync(sourceDir)) {
    console.error(`missing source dir: ${sourceDir}`);
    process.exit(1);
}
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

if (fs.existsSync(outPath)) {
    try {
        fs.rmSync(outPath, { force: true });
    } catch (err) {
        console.error(`unable to remove ${outPath}. close anything using it and retry.`);
        console.error(err.message || err);
        process.exit(1);
    }
}

const output = fs.createWriteStream(outPath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
    console.log(`created ${outPath} (${archive.pointer()} bytes)`);
});

archive.on("error", (err) => {
    throw err;
});

archive.pipe(output);
archive.directory(sourceDir, false);
archive.finalize();
