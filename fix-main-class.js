const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'stitch_portal_pendaftaran_mahasiswa_baru');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix malformed tailwind class "lg: md:ml-64 w-full md:w-[calc(100%-16rem)]p-12"
    content = content.replace(/lg: md:ml-64 w-full md:w-\[calc\(100%-16rem\)\]p-12/g, 'md:ml-64 w-full md:w-[calc(100%-16rem)] lg:p-12');
    
    // Also check other dashboard mains just in case they broke similarly
    // It might look like: <main class="flex-1 md:ml-64 w-full md:w-[calc(100%-16rem)] p-margin-mobile md:p-margin-desktop bg-surface overflow-y-auto">
    content = content.replace(/\]p-/g, '] p-');
    content = content.replace(/lg:\s+md:ml-64/g, 'lg:p-8 md:ml-64'); // fallback
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed main class in: ${filePath}`);
    }
}

function traverseAndProcess(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseAndProcess(fullPath);
        } else if (file.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

traverseAndProcess(rootDir);
console.log("Cleanup complete.");
