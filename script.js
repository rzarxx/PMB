/**
 * PMB University — Main JavaScript
 * Handles: Mobile menu, form validation, sidebar toggle,
 * drag-and-drop upload, smooth scroll, animations
 */

// ===================================================================
// 1. MOBILE MENU TOGGLE
// ===================================================================
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    });
  }

  // ===================================================================
  // 2. DASHBOARD SIDEBAR TOGGLE
  // ===================================================================
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      if (window.innerWidth >= 1024) {
        if (sidebar) sidebar.classList.toggle('collapsed');
      } else {
        if (sidebar && sidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // ===================================================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  // ===================================================================
  // 4. NAVBAR SCROLL SHADOW
  // ===================================================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 8px rgba(0,10,30,0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ===================================================================
  // 5. FORM VALIDATION — REGISTER
  // ===================================================================
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = ['fullName', 'whatsapp', 'email', 'password', 'program1'];
      fields.forEach(function (id) {
        const field = document.getElementById(id);
        if (field && !field.value.trim()) {
          showError(field, 'Field ini wajib diisi.');
          valid = false;
        } else if (field) {
          clearError(field);
        }
      });

      const emailField = document.getElementById('email');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showError(emailField, 'Format email tidak valid.');
        valid = false;
      }

      const passField = document.getElementById('password');
      if (passField && passField.value && passField.value.length < 8) {
        showError(passField, 'Password minimal 8 karakter.');
        valid = false;
      }

      if (valid) {
        // Show success
        const btn = registerForm.querySelector('[type="submit"]');
        if (btn) {
          btn.textContent = '✓ Pendaftaran Berhasil!';
          btn.style.backgroundColor = '#166534';
          btn.disabled = true;
          setTimeout(function () {
            window.location.href = 'login.html';
          }, 1500);
        }
      }
    });
  }

  // ===================================================================
  // 6. FORM VALIDATION — LOGIN
  // ===================================================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const emailField = document.getElementById('email');
      const passField = document.getElementById('password');

      if (emailField && !emailField.value.trim()) {
        showError(emailField, 'Email wajib diisi.');
        valid = false;
      } else if (emailField) clearError(emailField);

      if (passField && !passField.value.trim()) {
        showError(passField, 'Password wajib diisi.');
        valid = false;
      } else if (passField) clearError(passField);

      if (valid) {
        const btn = loginForm.querySelector('[type="submit"]');
        if (btn) {
          btn.textContent = 'Masuk...';
          btn.disabled = true;
          setTimeout(function () {
            window.location.href = 'dashboard.html';
          }, 1000);
        }
      }
    });
  }

  // ===================================================================
  // 7. DRAG & DROP FILE UPLOAD
  // ===================================================================
  document.querySelectorAll('.upload-zone').forEach(function (zone) {
    const input = zone.querySelector('input[type="file"]');

    zone.addEventListener('click', function () {
      if (input) input.click();
    });

    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', function () {
      zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFileUpload(files[0], zone);
    });

    if (input) {
      input.addEventListener('change', function () {
        if (input.files.length > 0) handleFileUpload(input.files[0], zone);
      });
    }
  });

  function handleFileUpload(file, zone) {
    const zoneId = zone.getAttribute('data-zone-id');
    const previewId = zoneId ? 'preview-' + zoneId : null;
    const preview = previewId ? document.getElementById(previewId) : null;

    if (preview) {
      preview.style.display = 'flex';
      const nameEl = preview.querySelector('.upload-item-name');
      const metaEl = preview.querySelector('.upload-item-meta');
      if (nameEl) nameEl.textContent = file.name;
      if (metaEl) metaEl.textContent = formatFileSize(file.size) + ' — Siap diupload';
    }

    const icon = zone.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'check_circle';
    const title = zone.querySelector('.upload-zone-title');
    if (title) title.textContent = file.name;
  }

  // ===================================================================
  // 8. INTERSECTION OBSERVER ANIMATIONS
  // ===================================================================
  const animatedElements = document.querySelectorAll('.card, .step-item, .timeline-item, .info-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ===================================================================
  // 9. PROGRESS BAR ANIMATION
  // ===================================================================
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    const targetWidth = progressFill.getAttribute('data-progress') || progressFill.style.width;
    progressFill.style.width = '0';
    setTimeout(function () {
      progressFill.style.width = targetWidth;
    }, 300);
  }

  // ===================================================================
  // 10. DASHBOARD FORM SUBMIT
  // ===================================================================
  const dashForms = document.querySelectorAll('.dashboard-form');
  dashForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const origText = btn.textContent;
        btn.textContent = '✓ Tersimpan!';
        btn.style.backgroundColor = '#166534';
        setTimeout(function () {
          btn.textContent = origText;
          btn.style.backgroundColor = '';
        }, 2000);
      }
    });
  });

  // ===================================================================
  // HELPERS
  // ===================================================================
  function showError(field, message) {
    clearError(field);
    field.style.borderColor = 'var(--error)';
    field.style.boxShadow = '0 0 0 1px var(--error)';
    const err = document.createElement('p');
    err.className = 'field-error';
    err.style.cssText = 'color:var(--error);font-size:12px;margin-top:4px;';
    err.textContent = message;
    field.parentNode.insertBefore(err, field.nextSibling);
  }

  function clearError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const prev = field.parentNode.querySelector('.field-error');
    if (prev) prev.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Skeleton Loading Logic
  const skeletonTargets = document.querySelectorAll('.stat-value, .stat-label, .dash-page-title, .dash-page-subtitle, .info-value, .form-input, .form-select, .upload-card, .btn');
  
  if (skeletonTargets.length > 0) {
    skeletonTargets.forEach(el => el.classList.add('skeleton'));
    setTimeout(() => {
      skeletonTargets.forEach(el => el.classList.remove('skeleton'));
    }, 1200); // 1.2s loading simulation
  }

  // Dropdown Logic
  const notifBtn = document.getElementById('notifToggle');
  const profileBtn = document.getElementById('profileToggle');

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-wrapper.active').forEach(el => el.classList.remove('active'));
  }

  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = notifBtn.closest('.dropdown-wrapper');
      const isActive = parent.classList.contains('active');
      closeAllDropdowns();
      if (!isActive) parent.classList.add('active');
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = profileBtn.closest('.dropdown-wrapper');
      const isActive = parent.classList.contains('active');
      closeAllDropdowns();
      if (!isActive) parent.classList.add('active');
    });
  }

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });
  
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dark Mode Toggle ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    });
  }
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // --- 2. Form Validation Real-Time ---
  const inputs = document.querySelectorAll('.form-input, .form-select');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim() === '') {
        this.classList.remove('is-valid', 'is-invalid');
        return;
      }
      if (this.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value)) {
          this.classList.add('is-valid');
          this.classList.remove('is-invalid');
        } else {
          this.classList.add('is-invalid');
          this.classList.remove('is-valid');
        }
      } else if (this.id === 'nik') {
        if (this.value.length === 16 && /^\d+$/.test(this.value)) {
          this.classList.add('is-valid');
          this.classList.remove('is-invalid');
        } else {
          this.classList.add('is-invalid');
          this.classList.remove('is-valid');
        }
      } else {
        if (this.value.trim().length > 2) {
          this.classList.add('is-valid');
          this.classList.remove('is-invalid');
        }
      }
    });
  });

  // --- 3. Toast Notifications ---
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  window.showToast = function(type, title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    const iconName = type === 'success' ? 'check_circle' : 'error';
    
    toast.innerHTML = '<div class="toast-icon"><span class="material-symbols-outlined">' + iconName + '</span></div>' +
                      '<div class="toast-content">' +
                      '<div style="font-weight:700;color:inherit;margin-bottom:2px;">' + title + '</div>' +
                      '<div style="font-size:12px;opacity:0.8;font-weight:400;">' + message + '</div>' +
                      '</div>';
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';
      if(btn) btn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">autorenew</span> Menyimpan...';
      
      setTimeout(() => {
        if(btn) btn.innerHTML = originalText;
        showToast('success', 'Berhasil', 'Data Anda telah berhasil disimpan ke dalam sistem.');
      }, 800);
    });
  });

  // --- 4. Show/Hide Password ---
  const togglePasswordBtns = document.querySelectorAll('.password-toggle-btn');
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const input = this.previousElementSibling;
      const icon = this.querySelector('.material-symbols-outlined');
      if (input && input.type === 'password') {
        input.type = 'text';
        if(icon) icon.textContent = 'visibility_off';
      } else if (input) {
        input.type = 'password';
        if(icon) icon.textContent = 'visibility';
      }
    });
  });

  // --- 5. Back to Top Button ---
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
