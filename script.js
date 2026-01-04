document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const heroVideo = document.getElementById('hero-video');

    // --- Panel Elements ---
    const openProjectsBtn = document.getElementById('open-projects');
    const openContactBtn = document.getElementById('open-contact');
    const panelProjects = document.getElementById('panel-projects');
    const panelContact = document.getElementById('panel-contact');
    const closeButtons = document.querySelectorAll('.close-btn');

    // --- Panel Logic Functions ---

    function openPanel(panel) {
        // Close any already open panels first
        closeAllPanels();
        panel.classList.add('active');
        body.classList.add('no-scroll');
    }

    function closeAllPanels() {
        panelProjects.classList.remove('active');
        panelContact.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    // Event Listeners for Opening
    openProjectsBtn.addEventListener('click', () => openPanel(panelProjects));
    openContactBtn.addEventListener('click', () => openPanel(panelContact));

    // Event Listeners for Closing
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeAllPanels);
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPanels();
        }
    });

    // --- Existing Theme Logic ---
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);

        if (theme === 'light-mode') {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(error => console.log("Video failed:", error));
        }
    }

    // --- Existing Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && body.classList.contains('dark-mode')) {
                heroVideo.pause();
            } else if (entry.isIntersecting && body.classList.contains('dark-mode')) {
                heroVideo.play();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);
});