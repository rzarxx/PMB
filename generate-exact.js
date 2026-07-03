const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'UAS Design Web');
const dashboardDir = path.join(outputDir, 'dashboard');
const pathsDir = path.join(outputDir, 'paths');
const jsDir = path.join(outputDir, 'js');

// Ensure directories exist
[outputDir, dashboardDir, pathsDir, jsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Exact Tailwind Config from MCP
const tailwindConfig = `
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "error-container": "#ffdad6",
                "on-surface": "#121c2a",
                "inverse-surface": "#27313f",
                "tertiary-fixed-dim": "#c4c7ca",
                "surface-container-high": "#dee9fc",
                "on-error-container": "#93000a",
                "on-error": "#ffffff",
                "on-primary-fixed-variant": "#2d476f",
                "tertiary-fixed": "#e0e2e6",
                "on-primary-container": "#708ab5",
                "on-secondary-fixed-variant": "#604100",
                "surface-container-highest": "#d9e3f6",
                "primary-container": "#002147",
                "primary-fixed": "#d6e3ff",
                "primary-fixed-dim": "#aec7f6",
                "on-tertiary": "#ffffff",
                "error": "#ba1a1a",
                "outline": "#74777f",
                "outline-variant": "#c4c6cf",
                "surface-dim": "#d0dbed",
                "primary": "#000a1e",
                "on-background": "#121c2a",
                "surface-bright": "#f8f9ff",
                "tertiary": "#080b0e",
                "secondary-fixed-dim": "#ffba3b",
                "on-secondary-container": "#6a4800",
                "surface-variant": "#d9e3f6",
                "on-tertiary-fixed": "#191c1f",
                "surface-container-lowest": "#ffffff",
                "secondary": "#7f5700",
                "surface": "#f8f9ff",
                "on-secondary-fixed": "#281900",
                "secondary-fixed": "#ffdead",
                "background": "#f8f9ff",
                "tertiary-container": "#1f2225",
                "on-tertiary-container": "#86898d",
                "on-primary-fixed": "#001b3d",
                "surface-tint": "#465f88",
                "surface-container-low": "#eff4ff",
                "on-secondary": "#ffffff",
                "surface-container": "#e6eeff",
                "inverse-primary": "#aec7f6",
                "inverse-on-surface": "#eaf1ff",
                "on-surface-variant": "#44474e",
                "on-tertiary-fixed-variant": "#44474a",
                "secondary-container": "#feb316",
                "on-primary": "#ffffff"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "stack-sm": "4px",
                "stack-md": "16px",
                "base": "8px",
                "margin-mobile": "20px",
                "margin-desktop": "64px",
                "gutter": "24px",
                "container-max": "1280px",
                "stack-lg": "32px"
            },
            "fontFamily": {
                "headline-md": ["'Source Serif 4'"],
                "display-lg": ["'Source Serif 4'"],
                "display-lg-mobile": ["'Source Serif 4'"],
                "label-md": ["Work Sans"],
                "body-lg": ["Work Sans"],
                "body-md": ["Work Sans"],
                "caption": ["Work Sans"],
                "headline-lg": ["'Source Serif 4'"]
            },
            "fontSize": {
                "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "display-lg-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "caption": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
                "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }]
            }
        }
    }
};
`;
fs.writeFileSync(path.join(jsDir, 'tailwind-config.js'), tailwindConfig);

const mainJs = `
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const topNavMenu = document.getElementById('top-nav-menu');
    if (mobileMenuBtn && topNavMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            topNavMenu.classList.toggle('hidden');
            topNavMenu.classList.toggle('flex');
        });
    }

    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarToggleBtn && mobileSidebar && sidebarOverlay) {
        sidebarToggleBtn.addEventListener('click', () => {
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
fs.writeFileSync(path.join(jsDir, 'main.js'), mainJs);

// HTML Base Template Maker
function makeHTML(title, isDashboard, content, depth = 0) {
    const prefix = depth === 1 ? '../' : '';
    return \`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>\${title}</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="\${prefix}js/tailwind-config.js"></script>
    <style>
        .timeline-line::before {
            content: ''; position: absolute; top: 24px; left: 24px; bottom: 0; width: 2px; background-color: #dee9fc; z-index: 0;
        }
        @media (min-width: 768px) {
            .timeline-line-horizontal::before {
                content: ''; position: absolute; top: 24px; left: 0; right: 0; height: 2px; width: 100%; background-color: #dee9fc; z-index: 0; bottom: auto;
            }
            .timeline-line::before { display: none; }
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen \${isDashboard ? 'flex' : 'flex flex-col'}">
\${content}
    <script src="\${prefix}js/main.js"></script>
</body>
</html>\`;
}

// 1. Exact Landing Page Content
const landingContent = \`
    <!-- Header -->
    <header class="bg-surface sticky top-0 z-50 border-b border-outline-variant">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20 flex items-center justify-between">
            <div class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">school</span>
                PMB University
            </div>
            <nav class="hidden md:flex space-x-8 font-label-md text-label-md">
                <a href="index.html" class="text-primary border-b-2 border-secondary h-20 flex items-center">Home</a>
                <a href="#paths" class="text-on-surface-variant hover:text-secondary transition-colors h-20 flex items-center">Jalur Masuk</a>
                <a href="#timeline" class="text-on-surface-variant hover:text-secondary transition-colors h-20 flex items-center">Timeline</a>
            </nav>
            <a href="login.html" class="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded hover:bg-primary-container transition-colors">Login</a>
            <button id="mobile-menu-btn" class="md:hidden p-2 text-primary">
                <span class="material-symbols-outlined">menu</span>
            </button>
        </div>
        <nav id="top-nav-menu" class="hidden flex-col bg-surface border-b border-outline-variant p-4 space-y-4 absolute w-full shadow-lg md:hidden">
            <a href="index.html" class="text-primary font-bold">Home</a>
            <a href="#paths" class="text-on-surface-variant">Jalur Masuk</a>
            <a href="#timeline" class="text-on-surface-variant">Timeline</a>
            <a href="login.html" class="bg-primary text-on-primary text-center font-bold px-4 py-3 rounded mt-2">Login</a>
        </nav>
    </header>

    <main class="flex-grow">
        <!-- Hero Section -->
        <section class="relative w-full min-h-[600px] md:h-[80vh] flex items-center bg-surface-container-lowest overflow-hidden">
            <div class="absolute inset-0 w-full h-full">
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjW0BvLoTY_MMMOTDr9EgyMydmReWK_sSLUuGSPczaqdtbhpiT3zsu9qN4f6RcYu-0pBQ3sm0XGWxYwJ-R8VxNiMXYyDR58qif3bPrg5IVSPnWsZRxfiXN58eKal458iFuwLqM8xguvzb8sYAj-e1IUw5a9vW_ukGa1-xUes5dddfhQTS2C-MKwvSIgr3qL6brBxF9P1yn9wVIiJydsoELBtGvQ1Vas-SOy_V0Fck6CGC7otpLe-U3SeFMUNoOlkJujpAWaPIATeE');"></div>
                <div class="absolute inset-0 bg-primary/70"></div>
            </div>
            <div class="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div class="max-w-2xl text-on-primary">
                    <h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-primary drop-shadow-sm">Wujudkan Masa Depanmu Bersama PMB University</h1>
                    <p class="font-body-lg text-body-lg mb-8 text-surface-variant">Pendaftaran Mahasiswa Baru Tahun Akademik 2024/2025 telah dibuka. Bergabunglah dengan komunitas akademik terbaik.</p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button onclick="window.location.href='register.html'" class="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-8 py-4 rounded font-bold hover:bg-secondary-fixed transition-colors shadow-sm">Daftar Sekarang</button>
                        <button class="bg-transparent border border-on-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded hover:bg-on-primary/10 transition-colors">Pelajari Program</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Information -->
        <section class="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="font-headline-lg text-headline-lg text-primary mb-6">Membentuk Pemimpin Masa Depan</h2>
                    <p class="font-body-md text-body-md text-on-surface-variant mb-4">PMB University berdedikasi untuk memberikan pendidikan berkualitas tinggi yang menggabungkan keunggulan akademik dengan pengalaman praktis.</p>
                    <p class="font-body-md text-body-md text-on-surface-variant mb-8">Dengan fasilitas modern, fakultas berdedikasi, dan lingkungan belajar yang inklusif, kami mempersiapkan Anda.</p>
                    <a class="inline-flex items-center text-primary font-label-md text-label-md hover:text-secondary transition-colors group" href="javascript:void(0);">Jelajahi Fasilitas Kami <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                </div>
                <div class="relative">
                    <div class="aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant">
                        <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAPq0DCUXrXWHf6p0zHY2KeBpfYGV4BEJXIAuBGpJHJfTkK046g9gMtn9Stm7scMrml_XvihzrVytqgIJ0ORz0H0fOouQU2Sa84qH3X3sks8bE0O1vp0Hy-X0l8J60cEtlFe5d-HX-k8sguubHYAZSDGpA-o1eD2rCHk111Q830tZA9926dSG3OKb7Ne55mNN1XdV_PyygB0D-SQIuqW2xIAGogND0FeyNavCTW0Exmt9oxS9PH3B5lFJVz7yg7OsocatUUVRu75M">
                    </div>
                    <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-surface-container-high rounded-lg -z-10"></div>
                </div>
            </div>
        </section>

        <!-- Paths -->
        <section id="paths" class="bg-surface-container-low py-24 px-margin-mobile md:px-margin-desktop border-y border-outline-variant">
            <div class="max-w-container-max mx-auto">
                <div class="text-center max-w-2xl mx-auto mb-16">
                    <h2 class="font-headline-lg text-headline-lg text-primary mb-4">Jalur Pendaftaran</h2>
                    <p class="font-body-md text-body-md text-on-surface-variant">Pilih jalur penerimaan yang sesuai dengan kualifikasi dan potensi Anda. Kami menawarkan berbagai opsi untuk bergabung.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Mandiri -->
                    <div class="bg-surface rounded-xl p-8 border border-outline-variant hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div class="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-on-primary-container text-3xl">edit_document</span>
                        </div>
                        <h3 class="font-headline-md text-headline-md text-primary mb-3">Jalur Mandiri</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">Seleksi penerimaan berdasarkan hasil ujian tulis mandiri yang diselenggarakan oleh PMB University.</p>
                        <a class="inline-flex items-center text-primary font-label-md text-label-md group-hover:text-secondary transition-colors" href="paths/mandiri.html">Detail Jalur <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <!-- Prestasi -->
                    <div class="bg-surface rounded-xl p-8 border border-outline-variant hover:shadow-md transition-shadow group flex flex-col h-full relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-1 bg-secondary-container"></div>
                        <div class="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-on-secondary-container text-3xl">military_tech</span>
                        </div>
                        <h3 class="font-headline-md text-headline-md text-primary mb-3">Jalur Prestasi</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">Penerimaan tanpa tes tulis bagi siswa yang memiliki prestasi akademik atau non-akademik tingkat nasional.</p>
                        <a class="inline-flex items-center text-primary font-label-md text-label-md group-hover:text-secondary transition-colors" href="paths/prestasi.html">Detail Jalur <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                    <!-- KIP -->
                    <div class="bg-surface rounded-xl p-8 border border-outline-variant hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div class="w-14 h-14 bg-surface-container-highest rounded-full flex items-center justify-center mb-6">
                            <span class="material-symbols-outlined text-primary text-3xl">school</span>
                        </div>
                        <h3 class="font-headline-md text-headline-md text-primary mb-3">Jalur KIP-Kuliah</h3>
                        <p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">Program bantuan biaya pendidikan dari pemerintah bagi siswa yang memiliki potensi akademik namun terbatas ekonomi.</p>
                        <a class="inline-flex items-center text-primary font-label-md text-label-md group-hover:text-secondary transition-colors" href="paths/kip.html">Detail Jalur <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span></a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="bg-tertiary-container border-t border-outline-variant py-12 px-margin-mobile md:px-margin-desktop text-on-tertiary-container">
        <div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-2">
                <div class="font-headline-md text-headline-md font-bold text-on-tertiary mb-4">PMB University</div>
                <p class="font-body-md text-body-md opacity-80 max-w-md">Membentuk masa depan melalui pendidikan unggul dan berkarakter.</p>
            </div>
            <div>
                <h4 class="font-label-md text-label-md text-on-tertiary mb-4 uppercase tracking-wider">Tautan Cepat</h4>
                <ul class="space-y-2 font-body-md text-body-md opacity-80">
                    <li><a href="index.html" class="hover:text-secondary-fixed transition-colors">Beranda</a></li>
                    <li><a href="register.html" class="hover:text-secondary-fixed transition-colors">Pendaftaran</a></li>
                    <li><a href="login.html" class="hover:text-secondary-fixed transition-colors">Masuk</a></li>
                </ul>
            </div>
        </div>
        <div class="max-w-container-max mx-auto mt-12 pt-8 border-t border-outline-variant/30 text-center font-caption text-caption opacity-60">
            &copy; 2024 PMB University. All rights reserved.
        </div>
    </footer>
\`;
fs.writeFileSync(path.join(outputDir, 'index.html'), makeHTML('PMB University - Beranda', false, landingContent, 0));

// Dashboard Template Builder
function makeDashboard(title, innerContent) {
    const dashboardHtml = \`
    <!-- Mobile Header -->
    <div class="md:hidden flex items-center justify-between bg-surface p-4 border-b border-outline-variant fixed w-full top-0 z-40">
        <div class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">school</span>
            PMB Univ
        </div>
        <button id="sidebar-toggle-btn" class="p-2 text-primary">
            <span class="material-symbols-outlined">menu</span>
        </button>
    </div>
    <!-- Sidebar Overlay -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 hidden md:hidden"></div>

    <nav id="mobile-sidebar" class="fixed inset-y-0 left-0 w-64 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out bg-tertiary dark:bg-tertiary-container flex flex-col py-base bg-tertiary-container z-50 border-r border-outline-variant">
        <div class="px-6 py-6 mb-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-secondary-container" style="font-variation-settings: 'FILL' 1;">school</span>
            </div>
            <div>
                <h1 class="font-headline-md text-headline-md font-bold text-on-tertiary leading-tight">PMB University</h1>
                <p class="font-body-md text-caption text-on-tertiary-container">Admissions Portal</p>
            </div>
        </div>
        <ul class="flex-1 px-4 space-y-2 overflow-y-auto">
            <li><a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-secondary font-bold border-r-4 border-secondary translate-x-1" href="index.html"><span class="material-symbols-outlined text-xl">dashboard</span><span class="font-label-md text-label-md">Overview</span></a></li>
            <li><a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="biodata.html"><span class="material-symbols-outlined text-xl">person</span><span class="font-label-md text-label-md">Biodata</span></a></li>
            <li><a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="guardian.html"><span class="material-symbols-outlined text-xl">family_restroom</span><span class="font-label-md text-label-md">Guardian</span></a></li>
            <li><a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="program.html"><span class="material-symbols-outlined text-xl">account_balance</span><span class="font-label-md text-label-md">Program</span></a></li>
            <li><a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-on-tertiary-container hover:text-on-tertiary transition-colors duration-200 text-tertiary-fixed-dim" href="documents.html"><span class="material-symbols-outlined text-xl">upload_file</span><span class="font-label-md text-label-md">Documents</span></a></li>
        </ul>
        <div class="px-4 py-6 mt-auto border-t border-outline-variant/20">
            <a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT hover:bg-error-container hover:text-on-error-container transition-colors duration-200 text-error font-bold" href="../index.html">
                <span class="material-symbols-outlined text-xl">logout</span><span class="font-label-md text-label-md">Sign Out</span>
            </a>
        </div>
    </nav>
    <main class="flex-1 md:ml-64 w-full md:w-[calc(100%-16rem)] p-margin-mobile md:p-margin-desktop bg-surface overflow-y-auto mt-16 md:mt-0">
        <div class="max-w-container-max mx-auto space-y-stack-lg">
            \${innerContent}
        </div>
    </main>
    \`;
    return makeHTML(title, true, dashboardHtml, 1);
}

// 2. Exact Dashboard Overview
const overviewContent = \`
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
            <h2 class="font-headline-lg text-headline-lg text-primary font-bold">Dashboard Overview</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">Pantau status pendaftaran dan kelengkapan dokumen Anda di sini.</p>
        </div>
        <div class="bg-surface-container-high px-4 py-2 rounded-full flex items-center gap-2 border border-outline-variant">
            <span class="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span class="font-label-md text-label-md text-primary">Menunggu Kelengkapan</span>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
            <div class="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-on-primary-container">person</span>
            </div>
            <div>
                <p class="font-body-md text-caption text-on-surface-variant uppercase tracking-wider mb-1">Biodata</p>
                <p class="font-headline-md text-headline-md text-primary font-bold">Belum Lengkap</p>
            </div>
        </div>
        <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
            <div class="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">task</span>
            </div>
            <div>
                <p class="font-body-md text-caption text-on-surface-variant uppercase tracking-wider mb-1">Dokumen</p>
                <p class="font-headline-md text-headline-md text-primary font-bold">0 / 5 Diunggah</p>
            </div>
        </div>
        <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
            <div class="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-on-secondary-container">credit_card</span>
            </div>
            <div>
                <p class="font-body-md text-caption text-on-surface-variant uppercase tracking-wider mb-1">Status Pembayaran</p>
                <p class="font-headline-md text-headline-md text-primary font-bold">Menunggu</p>
            </div>
        </div>
    </div>
\`;
fs.writeFileSync(path.join(dashboardDir, 'index.html'), makeDashboard('Dashboard - Overview', overviewContent));

// Exact Login Page
const loginContent = \`
<div class="min-h-screen flex items-center justify-center bg-surface-container-low p-4">
    <div class="w-full max-w-md bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div class="p-8">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="material-symbols-outlined text-on-primary-container text-3xl">school</span>
                </div>
                <h1 class="font-headline-md text-headline-md font-bold text-primary">Selamat Datang</h1>
                <p class="font-body-md text-body-md text-on-surface-variant mt-2">Masuk ke portal PMB University</p>
            </div>
            <form onsubmit="event.preventDefault(); window.location.href='dashboard/index.html';" class="space-y-6">
                <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-2">Email</label>
                    <input type="email" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                </div>
                <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-2">Password</label>
                    <input type="password" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                </div>
                <button type="submit" class="w-full bg-primary text-on-primary font-label-md text-label-md font-bold py-3.5 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">Masuk</button>
            </form>
            <div class="mt-8 text-center border-t border-outline-variant pt-6">
                <p class="font-body-md text-body-md text-on-surface-variant">Belum punya akun? <a href="register.html" class="text-secondary font-bold hover:underline">Daftar sekarang</a></p>
            </div>
        </div>
    </div>
</div>
\`;
fs.writeFileSync(path.join(outputDir, 'login.html'), makeHTML('Login - PMB University', false, loginContent, 0));

// Exact Register Page
const registerContent = \`
<div class="min-h-screen flex items-center justify-center bg-surface-container-low p-4 py-12">
    <div class="w-full max-w-lg bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div class="p-8 md:p-10">
            <div class="mb-8">
                <h1 class="font-headline-md text-headline-md font-bold text-primary">Buat Akun Baru</h1>
                <p class="font-body-md text-body-md text-on-surface-variant mt-2">Mulai langkah pertama menuju masa depan Anda bersama PMB University.</p>
            </div>
            <form onsubmit="event.preventDefault(); window.location.href='dashboard/index.html';" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block font-label-md text-label-md text-on-surface mb-2">Nama Depan</label>
                        <input type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                    </div>
                    <div>
                        <label class="block font-label-md text-label-md text-on-surface mb-2">Nama Belakang</label>
                        <input type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                    </div>
                </div>
                <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-2">Email</label>
                    <input type="email" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                </div>
                <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-2">Password</label>
                    <input type="password" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md">
                </div>
                <button type="submit" class="w-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold py-3.5 rounded hover:bg-secondary hover:text-white transition-colors shadow-sm mt-8">Buat Akun & Lanjutkan</button>
            </form>
            <div class="mt-8 text-center border-t border-outline-variant pt-6">
                <p class="font-body-md text-body-md text-on-surface-variant">Sudah punya akun? <a href="login.html" class="text-primary font-bold hover:underline">Masuk</a></p>
            </div>
        </div>
    </div>
</div>
\`;
fs.writeFileSync(path.join(outputDir, 'register.html'), makeHTML('Daftar - PMB University', false, registerContent, 0));

console.log("Exact rebuilt files generated in UAS Design Web.");
