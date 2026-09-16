document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    UI.renderApp();

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    // Event Delegation for Checkboxes and Selects
    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('topic-checkbox')) {
            const isChecked = e.target.checked;
            const newStatus = isChecked ? 'Completed' : 'Not Started';
            Storage.updateTopicStatus(e.target.dataset.cat, e.target.dataset.id, newStatus);
            UI.renderApp(document.getElementById('statusFilter').value, document.getElementById('searchInput').value);
        }

        if (e.target.classList.contains('topic-status')) {
            const newStatus = e.target.value;
            Storage.updateTopicStatus(e.target.dataset.cat, e.target.dataset.id, newStatus);
            UI.renderApp(document.getElementById('statusFilter').value, document.getElementById('searchInput').value);
        }

        if (e.target.classList.contains('project-checkbox')) {
            const isChecked = e.target.checked;
            const newStatus = isChecked ? 'Completed' : 'Not Started';
            Storage.updateProjectStatus(e.target.dataset.id, newStatus);
            UI.renderApp(document.getElementById('statusFilter').value, document.getElementById('searchInput').value);
        }

        if (e.target.classList.contains('project-status')) {
            const newStatus = e.target.value;
            Storage.updateProjectStatus(e.target.dataset.id, newStatus);
            UI.renderApp(document.getElementById('statusFilter').value, document.getElementById('searchInput').value);
        }
    });

    // Search and Filter
    document.getElementById('searchInput').addEventListener('input', (e) => {
        UI.renderApp(document.getElementById('statusFilter').value, e.target.value);
    });

    document.getElementById('statusFilter').addEventListener('change', (e) => {
        UI.renderApp(e.target.value, document.getElementById('searchInput').value);
    });

    // Export JSON
    document.getElementById('exportBtn').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Storage.getData(), null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "roadmap_tracker_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // Modals
    const addModal = document.getElementById('addModal');
    const resetModal = document.getElementById('resetModal');

    document.getElementById('addCustomBtn').addEventListener('click', () => addModal.classList.add('show'));
    document.getElementById('resetBtn').addEventListener('click', () => resetModal.classList.add('show'));

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            addModal.classList.remove('show');
            resetModal.classList.remove('show');
        });
    });

    document.getElementById('cancelResetBtn').addEventListener('click', () => resetModal.classList.remove('show'));

    document.getElementById('confirmResetBtn').addEventListener('click', () => {
        Storage.resetData();
        UI.renderApp();
        resetModal.classList.remove('show');
    });

    // Form Submits
    const itemTypeSelect = document.getElementById('itemType');
    const categoryGroup = document.getElementById('categoryGroup');

    itemTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'project') {
            categoryGroup.style.display = 'none';
        } else {
            categoryGroup.style.display = 'block';
        }
    });

    document.getElementById('addForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = itemTypeSelect.value;
        const title = document.getElementById('itemTitle').value;

        if (type === 'topic') {
            const catId = document.getElementById('itemCategory').value;
            Storage.addTopic(catId, title);
        } else {
            Storage.addProject(title);
        }

        document.getElementById('itemTitle').value = '';
        addModal.classList.remove('show');
        UI.renderApp(document.getElementById('statusFilter').value, document.getElementById('searchInput').value);
    });
});
