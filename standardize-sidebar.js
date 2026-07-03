const fs = require('fs');
const path = require('path');

const dashboardDir = 'C:\\Users\\rezzdev\\Desktop\\UAS Design Web\\dashboard';
const files = ['index.html', 'biodata.html', 'guardian.html', 'program.html', 'documents.html'];

const standardizedSidebar = `<!-- SideNavBar (Standardized & Consistent) -->
    <nav id="mobile-sidebar" class="fixed inset-y-0 left-0 w-64 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out bg-tertiary dark:bg-tertiary-container flex flex-col py-base bg-tertiary-container z-50 border-r border-outline-variant">
        <div class="px-6 py-6 mb-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-secondary-container" style="font-variation-settings: 'FILL' 1;">school</span>
            </div>
            <div>
                <h1 class="font-headline-md text-headline-md font-bold text-on-tertiary leading-tight">IPB Cirebon</h1>
                <p class="font-body-md text-caption text-on-tertiary-container">Admissions Portal</p>
            </div>
        </div>
        <ul class="flex-1 px-4 space-y-2 overflow-y-auto" id="sidebar-nav-links">
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="index.html">
                    <span class="material-symbols-outlined text-xl">dashboard</span>
                    <span class="font-label-md text-label-md">Overview</span>
                </a>
            </li>
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="biodata.html">
                    <span class="material-symbols-outlined text-xl">person</span>
                    <span class="font-label-md text-label-md">Biodata</span>
                </a>
            </li>
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="biodata.html">
                    <span class="material-symbols-outlined text-xl">school</span>
                    <span class="font-label-md text-label-md">Academic</span>
                </a>
            </li>
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="guardian.html">
                    <span class="material-symbols-outlined text-xl">family_restroom</span>
                    <span class="font-label-md text-label-md">Guardian</span>
                </a>
            </li>
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="program.html">
                    <span class="material-symbols-outlined text-xl">account_balance</span>
                    <span class="font-label-md text-label-md">Program</span>
                </a>
            </li>
            <li>
                <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="documents.html">
                    <span class="material-symbols-outlined text-xl">upload_file</span>
                    <span class="font-label-md text-label-md">Documents</span>
                </a>
            </li>
        </ul>
        <div class="p-6 mt-auto">
            <button onclick="window.location.href='../index.html'" class="w-full py-3 px-4 bg-error text-on-error font-label-md text-label-md rounded-lg shadow-[0_4px_14px_0_rgba(186,26,26,0.12)] hover:bg-error-container hover:text-on-error-container transition-colors font-bold">
                Logout
            </button>
        </div>
    </nav>`;

files.forEach(file => {
    const filePath = path.join(dashboardDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace sidebar nav
    content = content.replace(/<nav id="mobile-sidebar"[\s\S]*?<\/nav>/g, standardizedSidebar);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Standardized sidebar in: ${file}`);
    }
});

console.log("Standardize sidebar finished.");
