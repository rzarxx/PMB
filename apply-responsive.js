const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'stitch_portal_pendaftaran_mahasiswa_baru');

const jsCode = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    // 1. Landing Page Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const topNavMenu = document.getElementById('top-nav-menu');
    const loginBtn = document.getElementById('top-login-btn');
    
    if (mobileMenuBtn && topNavMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            topNavMenu.classList.toggle('hidden');
            topNavMenu.classList.toggle('flex');
            topNavMenu.classList.toggle('flex-col');
            topNavMenu.classList.toggle('absolute');
            topNavMenu.classList.toggle('top-20');
            topNavMenu.classList.toggle('left-0');
            topNavMenu.classList.toggle('w-full');
            topNavMenu.classList.toggle('bg-surface');
            topNavMenu.classList.toggle('p-4');
            topNavMenu.classList.toggle('shadow-lg');
            topNavMenu.classList.toggle('z-40');
            topNavMenu.classList.toggle('border-b');
            
            if (loginBtn) {
                loginBtn.classList.toggle('hidden');
                loginBtn.classList.toggle('flex');
                loginBtn.classList.toggle('mt-4');
                loginBtn.classList.toggle('w-full');
            }
        });
    }

    // 2. Dashboard Sidebar Toggle
    const openSidebarBtn = document.getElementById('open-sidebar-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (openSidebarBtn && mobileSidebar && sidebarOverlay) {
        openSidebarBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        });
        
        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        });
    }
});
</script>
</body>`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // -- DASHBOARD FIXES --
    if (filePath.includes('dashboard_')) {
        // Find <nav class="... fixed left-0 ...">
        content = content.replace(/<nav class="([^"]*)fixed left-0([^"]*)"/g, (match, p1, p2) => {
            // Remove any existing transform classes just in case
            let newClasses = p1 + " fixed left-0 " + p2;
            newClasses = newClasses.replace(/transform/g, '').replace(/-translate-x-full/g, '').replace(/md:translate-x-0/g, '');
            return `<nav id="mobile-sidebar" class="${newClasses} transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-50"`;
        });
        
        // Add mobile header and overlay before <main>
        if (!content.includes('id="open-sidebar-btn"')) {
            const mobileHeader = `
<div class="md:hidden flex items-center justify-between bg-surface p-4 border-b border-outline-variant sticky top-0 z-40 w-full">
    <div class="font-headline-md text-primary font-bold text-lg flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">school</span>
        PMB University
    </div>
    <button id="open-sidebar-btn" class="p-2 text-primary focus:outline-none hover:bg-surface-variant rounded transition-colors"><span class="material-symbols-outlined">menu</span></button>
</div>
<div id="sidebar-overlay" class="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 hidden transition-opacity md:hidden"></div>
`;
            content = content.replace(/(<main[^>]*>)/, mobileHeader + '$1');
        }

        // Fix main margin for desktop so it doesn't overlap with sidebar
        content = content.replace(/(<main class="[^"]*)(\s*p-\d+[^"]*")/, (match, p1, p2) => {
            if (!p1.includes('md:ml-64')) {
                return p1 + " md:ml-64 w-full md:w-[calc(100%-16rem)]" + p2;
            }
            return match;
        });
    }

    // -- LANDING / DETAIL FIXES --
    if (filePath.includes('halaman_utama') || filePath.includes('detail_jalur')) {
        // Tag mobile menu button
        content = content.replace(/<button class="md:hidden[^>]*>/, (match) => {
            if (!match.includes('id="mobile-menu-btn"')) {
                return match.replace('<button', '<button id="mobile-menu-btn"');
            }
            return match;
        });

        // Tag Top Nav Menu
        content = content.replace(/<nav class="hidden md:flex[^>]*>/, (match) => {
            if (!match.includes('id="top-nav-menu"')) {
                return match.replace('<nav', '<nav id="top-nav-menu"');
            }
            return match;
        });

        // Tag Login Button in header (assuming it's right after nav)
        content = content.replace(/(<\/nav>\s*)<button class="hidden md:inline-flex[^>]*>/, (match, p1) => {
            if (!match.includes('id="top-login-btn"')) {
                return match.replace('<button', '<button id="top-login-btn"');
            }
            return match;
        });
    }
    
    // -- FORMS (LOGIN/REGISTER) RESPONSIVENESS FIX --
    if (filePath.includes('masuk_') || filePath.includes('pendaftaran_')) {
        content = content.replace(/<div class="([^"]*)max-w-4xl([^"]*)"/, (match, p1, p2) => {
            return `<div class="${p1}w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8${p2}"`;
        });
    }

    // -- GRID FIXES GLOBALLY --
    // Convert generic grids to be responsive (if they aren't already)
    // E.g. grid-cols-2 without md: will be stacked on mobile
    // Using a regex to find grid-cols-[2-4] and prefix with md:, and add grid-cols-1
    // (Skipping if it already has responsive prefixes like md:grid-cols or sm:grid-cols)
    content = content.replace(/class="([^"]*)\b(grid-cols-[2-4])\b([^"]*)"/g, (match, p1, p2, p3) => {
        if (!p1.includes('md:grid-cols') && !p1.includes('sm:grid-cols') && !p1.includes('lg:grid-cols')) {
            return `class="${p1}grid-cols-1 md:${p2}${p3}"`;
        }
        return match;
    });

    // Replace href="#" just in case any were missed
    content = content.replace(/href="#"/g, `href="javascript:void(0);"`);

    // Add Javascript
    if (!content.includes('id="mobile-menu-btn"') && !content.includes('id="open-sidebar-btn"')) {
        // If neither exists, just append the script (won't do harm)
    }
    
    if (!content.includes("document.addEventListener('DOMContentLoaded'")) {
        content = content.replace(/<\/body>/i, jsCode);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function traverseAndProcess(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseAndProcess(fullPath);
        } else if (file.endsWith('.html')) {
            processFile(fullPath);
            console.log(`Processed: ${fullPath}`);
        }
    }
}

traverseAndProcess(rootDir);
console.log("Responsive layout and interactivity applied successfully.");
