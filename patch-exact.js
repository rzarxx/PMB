const fs = require('fs');
const path = require('path');

// Target directory is c:\Users\rezzdev\Desktop\UAS Design Web
const targetBase = 'C:\\Users\\rezzdev\\Desktop\\UAS Design Web';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

// 1. Traverse and patch files
walkDir(targetBase, (filePath) => {
    if (!filePath.endsWith('.html') && !filePath.endsWith('.js')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Standardize naming
    content = content.replace(/PMB\s+University/gi, 'IPB Cirebon');
    content = content.replace(/IPB\s+Ciirebon/gi, 'IPB Cirebon');

    // Perform specific HTML modifications
    if (filePath.endsWith('.html')) {
        // Is it inside the dashboard folder?
        const isDashboard = filePath.includes(path.join('UAS Design Web', 'dashboard'));
        const isPaths = filePath.includes(path.join('UAS Design Web', 'paths'));

        if (isDashboard) {
            // A. Replace "Apply Now" with red "Logout"
            // Style A
            content = content.replace(
                /<div class="p-6 mt-auto">([\s\S]*?)Apply Now([\s\S]*?)<\/div>/g,
                `<div class="p-6 mt-auto">
                    <button onclick="window.location.href='../index.html'" class="w-full py-3 px-4 bg-error text-on-error font-label-md text-label-md rounded-lg shadow-[0_4px_14px_0_rgba(186,26,26,0.12)] hover:bg-error-container hover:text-on-error-container transition-colors font-bold">
                        Logout
                    </button>
                </div>`
            );
            // Style B
            content = content.replace(
                /<div class="px-gutter py-stack-md border-t border-tertiary-container dark:border-surface-variant mt-auto">([\s\S]*?)Apply Now([\s\S]*?)<\/div>/g,
                `<div class="px-gutter py-stack-md border-t border-tertiary-container dark:border-surface-variant mt-auto">
                    <button onclick="window.location.href='../index.html'" class="w-full py-3 px-4 bg-error text-on-error font-label-md text-label-md rounded hover:bg-error-container hover:text-on-error-container transition-colors font-bold">
                        Logout
                    </button>
                </div>`
            );
            // Style C (program.html style)
            content = content.replace(
                /<div class="px-6 mt-auto pb-4">([\s\S]*?)Apply Now([\s\S]*?)<\/div>/g,
                `<div class="px-6 mt-auto pb-4">
                    <button onclick="window.location.href='../index.html'" class="w-full py-3 px-4 bg-error text-on-error font-label-md text-label-md rounded hover:bg-error-container hover:text-on-error-container transition-colors font-bold">
                        Logout
                    </button>
                </div>`
            );

            // B. Replace Profile Avatar with Clickable Dropdown Menu
            // Pattern for index.html (Overview):
            content = content.replace(
                /<!-- Profile Avatar -->\s*<div class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed ml-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">[\s\S]*?<\/div>/g,
                `<!-- Profile Avatar Container -->
                <div class="relative inline-block text-left">
                    <button id="profile-menu-btn" class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed ml-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity focus:outline-none flex">
                        <img alt="Student Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVv1czrhzOhGehB4tS0POV2Lu8w_ZwwMeXiWVaVTRgRQ_HboF2aN2Ze0llT442BGAAKrNxn74IXXjfot9QKR5Tm3js3cfMBBGhcQIdrdxkJ58Ij0Ji7GYVFKHOcq0p1BC3eXOwVvESL6RQ2r4g84Q-A0dx3xvHe1skfqongnfyMuIqjXbr9IvrZQ1p1eHGNXcdl1_WdtOPfBSE-rMCIbLKGwZBVsut6eLs842le8VNnCGvlz_OxNoQ4zUUK_K_X5ILvit7xNy7YBU"/>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded shadow-lg py-2 z-50">
                        <a href="biodata.html" class="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">Profil Saya</a>
                        <hr class="border-outline-variant my-1">
                        <a href="../index.html" class="block px-4 py-2 text-sm text-error hover:bg-error-container hover:text-on-error-container transition-colors font-bold">Logout</a>
                    </div>
                </div>`
            );

            // Pattern for documents.html:
            content = content.replace(
                /<div class="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center border border-outline-variant cursor-pointer hover:opacity-80 transition-opacity">\s*<img alt="Student Avatar"[\s\S]*?<\/div>/g,
                `<!-- Profile Avatar Container -->
                <div class="relative inline-block text-left">
                    <button id="profile-menu-btn" class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed ml-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity focus:outline-none flex">
                        <img alt="Student Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVv1czrhzOhGehB4tS0POV2Lu8w_ZwwMeXiWVaVTRgRQ_HboF2aN2Ze0llT442BGAAKrNxn74IXXjfot9QKR5Tm3js3cfMBBGhcQIdrdxkJ58Ij0Ji7GYVFKHOcq0p1BC3eXOwVvESL6RQ2r4g84Q-A0dx3xvHe1skfqongnfyMuIqjXbr9IvrZQ1p1eHGNXcdl1_WdtOPfBSE-rMCIbLKGwZBVsut6eLs842le8VNnCGvlz_OxNoQ4zUUK_K_X5ILvit7xNy7YBU"/>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded shadow-lg py-2 z-50">
                        <a href="biodata.html" class="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">Profil Saya</a>
                        <hr class="border-outline-variant my-1">
                        <a href="../index.html" class="block px-4 py-2 text-sm text-error hover:bg-error-container hover:text-on-error-container transition-colors font-bold">Logout</a>
                    </div>
                </div>`
            );

            // Pattern for program.html:
            content = content.replace(
                /<div class="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">\s*<img class="w-full h-full object-cover"[\s\S]*?<\/div>/g,
                `<!-- Profile Avatar Container -->
                <div class="relative inline-block text-left">
                    <button id="profile-menu-btn" class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed ml-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity focus:outline-none flex">
                        <img alt="Student Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVv1czrhzOhGehB4tS0POV2Lu8w_ZwwMeXiWVaVTRgRQ_HboF2aN2Ze0llT442BGAAKrNxn74IXXjfot9QKR5Tm3js3cfMBBGhcQIdrdxkJ58Ij0Ji7GYVFKHOcq0p1BC3eXOwVvESL6RQ2r4g84Q-A0dx3xvHe1skfqongnfyMuIqjXbr9IvrZQ1p1eHGNXcdl1_WdtOPfBSE-rMCIbLKGwZBVsut6eLs842le8VNnCGvlz_OxNoQ4zUUK_K_X5ILvit7xNy7YBU"/>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded shadow-lg py-2 z-50">
                        <a href="biodata.html" class="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">Profil Saya</a>
                        <hr class="border-outline-variant my-1">
                        <a href="../index.html" class="block px-4 py-2 text-sm text-error hover:bg-error-container hover:text-on-error-container transition-colors font-bold">Logout</a>
                    </div>
                </div>`
            );

            // C. Fix Mobile Sidebar Toggle Button on biodata.html and guardian.html
            content = content.replace(
                /<header class="md:hidden bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile h-16 w-full fixed top-0 z-50">([\s\S]*?)<button class="text-primary p-2">([\s\S]*?)<\/button>/g,
                `<header class="md:hidden bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile h-16 w-full fixed top-0 z-50">$1<button id="open-sidebar-btn" class="text-primary p-2 focus:outline-none hover:bg-surface-variant rounded transition-colors">$2</button>`
            );
        } else if (isPaths) {
            // D. Top Login/Register buttons in paths pages
            content = content.replace(
                /<button class="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 hidden md:block">([\s\S]*?)Register([\s\S]*?)<\/button>/g,
                `<button id="top-login-btn" onclick="window.location.href='../register.html'" class="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 hidden md:block">$1Register$2</button>`
            );
        } else {
            // E. For landing page (index.html)
            if (filePath.endsWith('index.html')) {
                content = content.replace(
                    /<button onclick="window.location.href='login.html'" class="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded hover:bg-primary-container transition-colors items-center justify-center">([\s\S]*?)Login([\s\S]*?)<\/button>/g,
                    `<button id="top-login-btn" onclick="window.location.href='login.html'" class="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded hover:bg-primary-container transition-colors items-center justify-center">$1Login$2</button>`
                );
            }
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched: ${filePath}`);
    }
});

console.log("Patch execution finished.");
