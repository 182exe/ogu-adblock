const fs = require("fs/promises");
const path = require("path");

const target = process.argv[2];
const root = path.resolve(__dirname, "..");

if (!target || !["chrome", "firefox"].includes(target)) {
    console.error("usage: node scripts/build.js <chrome|firefox>");
    process.exit(1);
}

const srcDir = path.join(root, "src");
const manifestPath = path.join(root, "manifests", `manifest.${target}.json`);
const outDir = path.join(root, "dist", target);
 
const copyDir = async (from, to) => {
    await fs.mkdir(to, { recursive: true });
    const entries = await fs.readdir(from, { withFileTypes: true });
    await Promise.all(
        entries.map(async (entry) => {
            if (entry.isDirectory() && entry.name === "options") {
                return;
            }
            const srcPath = path.join(from, entry.name);
            const destPath = path.join(to, entry.name);
            if (entry.isDirectory()) {
                await copyDir(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        })
    );
};

const build = async () => {
    await fs.rm(outDir, { recursive: true, force: true });
    await copyDir(srcDir, outDir);
    await fs.copyFile(manifestPath, path.join(outDir, "manifest.json"));
};

build().catch((error) => {
    console.error(error);
    process.exit(1);
});
