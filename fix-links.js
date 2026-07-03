const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'stitch_portal_pendaftaran_mahasiswa_baru');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Forms bypass for login and register (add onsubmit to preventDefault and navigate)
    content = content.replace(/<form([^>]*)>/g, (match, p1) => {
        if (!p1.includes('onsubmit')) {
            // If it's the register or login page, redirect to dashboard overview
            if (filePath.includes('masuk_ke_akun') || filePath.includes('pendaftaran_akun')) {
                return `<form${p1} onsubmit="event.preventDefault(); window.location.href='../dashboard_overview_status_pendaftaran/code.html';">`;
            }
            // For dashboard pages forms, redirect to next step or just prevent reload
            return `<form${p1} onsubmit="event.preventDefault(); alert('Tersimpan!');">`;
        }
        return match;
    });

    // Make regular buttons in forms (like submit) not require fields
    content = content.replace(/required/g, '');

    // Map common link names in the sidebar to their respective dashboard pages
    const linkMapping = {
        'Overview': '../dashboard_overview_status_pendaftaran/code.html',
        'Biodata': '../dashboard_biodata_data_akademik_detail/code.html',
        'Academic': '../dashboard_biodata_data_akademik_detail/code.html', // Pointing to the same for now as there's no separate academic
        'Guardian': '../dashboard_data_orang_tua_kontak_darurat/code.html',
        'Program': '../dashboard_pemilihan_program_studi_jalur/code.html',
        'Documents': '../dashboard_zero_friction_upload_dokumen/code.html',
        'Home': '../halaman_utama_pmb_university/code.html',
        'IPB Ciirebon': '../halaman_utama_pmb_university/code.html'
    };

    // Replace hrefs in the sidebar
    for (const [name, url] of Object.entries(linkMapping)) {
        const regex = new RegExp(`href="[^"]*"(.*?>[^<]*<span[^>]*>${name}</span>)`, 'g');
        content = content.replace(regex, `href="${url}"$1`);
        
        // Alternative sidebar structure
        const regex2 = new RegExp(`href="[^"]*"([^>]*>\\s*<span[^>]*>[^<]*</span>\\s*<span[^>]*>${name}</span>)`, 'g');
        content = content.replace(regex2, `href="${url}"$1`);
        
        // Simple a tags with text
        const regex3 = new RegExp(`href="[^"]*"([^>]*>\\s*${name}\\s*<)`, 'g');
        content = content.replace(regex3, `href="${url}"$1`);
    }

    // specific replacements for "Belum punya akun? Daftar di sini" or similar
    content = content.replace(/href="[^"]*"([^>]*>\s*Daftar di sini\s*<)/g, `href="../pendaftaran_akun_baru_pmb_university/code.html"$1`);
    content = content.replace(/href="[^"]*"([^>]*>\s*Masuk di sini\s*<)/g, `href="../masuk_ke_akun_pmb_pmb_university/code.html"$1`);
    
    // buttons that look like links or submit buttons should be converted if possible
    if (filePath.includes('halaman_utama')) {
        // already handled by multi_replace_file_content earlier, but just in case
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            replaceInFile(fullPath);
            console.log(`Processed: ${fullPath}`);
        }
    }
}

processDirectory(rootDir);
console.log('All links updated successfully!');
