const fs = require('fs');
const path = require('path');

// Source directory (MCP original files)
const srcBase = path.join(__dirname, 'stitch_portal_pendaftaran_mahasiswa_baru');
// Target directory (new clean output)
const outBase = path.join(__dirname, '..', 'UAS Design Web');

// Ensure target dirs exist
const dirs = [
    outBase,
    path.join(outBase, 'dashboard'),
    path.join(outBase, 'paths'),
    path.join(outBase, 'js')
];
dirs.forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// Shared JS script content
const sharedJS = `
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Hamburger Menu for Landing/Paths pages
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
    // Dashboard Sidebar Toggle
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
`;
fs.writeFileSync(path.join(outBase, 'js', 'main.js'), sharedJS);

// Function to read source and perform minimal transformations
function transformPage(srcFile, targetFile, linkReplacements, depth = 0) {
    let html = fs.readFileSync(srcFile, 'utf8');
    
    // Replace all inter-page links
    for (const [from, to] of Object.entries(linkReplacements)) {
        html = html.split(from).join(to);
    }

    // Remove inline <script> at end and replace with external ref
    // Also ensure sidebar has correct translate classes
    // Fix sidebar: remove 'hidden md:flex' and use just 'flex' so JS can toggle
    html = html.replace(
        /class="hidden md:flex bg-tertiary/g,
        'class="flex bg-tertiary'
    );
    // Add proper transform on sidebar navs that lack it
    html = html.replace(
        /transform -translate-x-full md:translate-x-0/g,
        'transform -translate-x-full md:translate-x-0'
    );
    // Fix main content wrapper for dashboard pages to not double-offset
    html = html.replace(
        /<div class="flex-1 ml-64 flex flex-col min-h-screen">/g,
        '<div class="flex-1 min-h-screen flex flex-col">'
    );
    
    // Replace inline scripts with external reference
    const prefix = depth === 1 ? '../' : '';
    html = html.replace(
        /<script>\s*document\.addEventListener[\s\S]*?<\/script>/g,
        `<script src="${prefix}js/main.js"></script>`
    );
    
    fs.writeFileSync(targetFile, html, 'utf8');
    console.log(`Written: ${targetFile}`);
}

// Landing Page
transformPage(
    path.join(srcBase, 'halaman_utama_pmb_university', 'code.html'),
    path.join(outBase, 'index.html'),
    {
        "'../pendaftaran_akun_baru_pmb_university/code.html'": "'register.html'",
        "'../masuk_ke_akun_pmb_pmb_university/code.html'": "'login.html'",
        "../detail_jalur_mandiri_pmb_university/code.html": "paths/mandiri.html",
        "../detail_jalur_prestasi_pmb_university/code.html": "paths/prestasi.html",
        "../detail_jalur_kip_kuliah_pmb_university/code.html": "paths/kip.html",
        "../halaman_utama_pmb_university/code.html": "index.html",
    },
    0
);

// Login Page
transformPage(
    path.join(srcBase, 'masuk_ke_akun_pmb_pmb_university', 'code.html'),
    path.join(outBase, 'login.html'),
    {
        "'../dashboard_overview_status_pendaftaran/code.html'": "'dashboard/index.html'",
        "../pendaftaran_akun_baru_pmb_university/code.html": "register.html",
        "../halaman_utama_pmb_university/code.html": "index.html",
    },
    0
);

// Register Page
transformPage(
    path.join(srcBase, 'pendaftaran_akun_baru_pmb_university', 'code.html'),
    path.join(outBase, 'register.html'),
    {
        "'../dashboard_overview_status_pendaftaran/code.html'": "'dashboard/index.html'",
        "../masuk_ke_akun_pmb_pmb_university/code.html": "login.html",
        "../halaman_utama_pmb_university/code.html": "index.html",
    },
    0
);

// Dashboard Links map (shared for all dashboard pages)
const dashLinks = {
    "../dashboard_overview_status_pendaftaran/code.html": "index.html",
    "../dashboard_biodata_data_akademik_detail/code.html": "biodata.html",
    "../dashboard_data_orang_tua_kontak_darurat/code.html": "guardian.html",
    "../dashboard_pemilihan_program_studi_jalur/code.html": "program.html",
    "../dashboard_zero_friction_upload_dokumen/code.html": "documents.html",
    "../halaman_utama_pmb_university/code.html": "../index.html",
};

// Dashboard Overview
transformPage(
    path.join(srcBase, 'dashboard_overview_status_pendaftaran', 'code.html'),
    path.join(outBase, 'dashboard', 'index.html'),
    dashLinks,
    1
);

// Dashboard Biodata
transformPage(
    path.join(srcBase, 'dashboard_biodata_data_akademik_detail', 'code.html'),
    path.join(outBase, 'dashboard', 'biodata.html'),
    dashLinks,
    1
);

// Dashboard Guardian
transformPage(
    path.join(srcBase, 'dashboard_data_orang_tua_kontak_darurat', 'code.html'),
    path.join(outBase, 'dashboard', 'guardian.html'),
    dashLinks,
    1
);

// Dashboard Program
transformPage(
    path.join(srcBase, 'dashboard_pemilihan_program_studi_jalur', 'code.html'),
    path.join(outBase, 'dashboard', 'program.html'),
    dashLinks,
    1
);

// Dashboard Documents
transformPage(
    path.join(srcBase, 'dashboard_zero_friction_upload_dokumen', 'code.html'),
    path.join(outBase, 'dashboard', 'documents.html'),
    dashLinks,
    1
);

// Path detail pages
const pathLinks = {
    "../halaman_utama_pmb_university/code.html": "../index.html",
    "../pendaftaran_akun_baru_pmb_university/code.html": "../register.html",
    "../masuk_ke_akun_pmb_pmb_university/code.html": "../login.html",
    "../detail_jalur_mandiri_pmb_university/code.html": "mandiri.html",
    "../detail_jalur_prestasi_pmb_university/code.html": "prestasi.html",
    "../detail_jalur_kip_kuliah_pmb_university/code.html": "kip.html",
};

transformPage(
    path.join(srcBase, 'detail_jalur_mandiri_pmb_university', 'code.html'),
    path.join(outBase, 'paths', 'mandiri.html'),
    pathLinks,
    1
);

transformPage(
    path.join(srcBase, 'detail_jalur_prestasi_pmb_university', 'code.html'),
    path.join(outBase, 'paths', 'prestasi.html'),
    pathLinks,
    1
);

transformPage(
    path.join(srcBase, 'detail_jalur_kip_kuliah_pmb_university', 'code.html'),
    path.join(outBase, 'paths', 'kip.html'),
    pathLinks,
    1
);

console.log('\nAll files generated successfully in UAS Design Web/');
