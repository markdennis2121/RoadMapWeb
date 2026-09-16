const UI = {
    renderApp: (filter = 'all', searchQuery = '') => {
        const data = Storage.getData();
        UI.renderCategories(data.categories, filter, searchQuery);
        UI.renderProjects(data.projects, filter, searchQuery);
        UI.updateDashboard(data);
        UI.populateCategorySelect(data.categories);
    },

    renderCategories: (categories, filter, searchQuery) => {
        const container = document.getElementById('roadmapContainer');
        container.innerHTML = '';
        
        categories.forEach(category => {
            const filteredTopics = category.topics.filter(topic => {
                const matchesFilter = filter === 'all' || 
                    (filter === 'not-started' && topic.status === 'Not Started') ||
                    (filter === 'in-progress' && topic.status === 'Currently Learning') ||
                    (filter === 'completed' && topic.status === 'Completed');
                
                const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
                
                return matchesFilter && matchesSearch;
            });

            if (filteredTopics.length > 0) {
                const card = document.createElement('div');
                card.className = 'category-card glassmorphism';
                
                let topicsHTML = '';
                filteredTopics.forEach(topic => {
                    const isCompleted = topic.status === 'Completed';
                    const isLearning = topic.status === 'Currently Learning';
                    
                    let selectClass = 'status-select';
                    if (isCompleted) selectClass += ' completed';
                    else if (isLearning) selectClass += ' learning';

                    topicsHTML += `
                        <li class="topic-item ${isCompleted ? 'completed' : ''}">
                            <div class="topic-main">
                                <label class="checkbox-wrap">
                                    <input type="checkbox" class="topic-checkbox" data-cat="${category.id}" data-id="${topic.id}" ${isCompleted ? 'checked' : ''}>
                                    <span class="checkmark"></span>
                                </label>
                                <span class="topic-title" title="${topic.title}">${topic.title}</span>
                            </div>
                            <select class="${selectClass} topic-status" data-cat="${category.id}" data-id="${topic.id}">
                                <option value="Not Started" ${topic.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                                <option value="Currently Learning" ${topic.status === 'Currently Learning' ? 'selected' : ''}>Learning</option>
                                <option value="Completed" ${topic.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </li>
                    `;
                });

                card.innerHTML = `
                    <div class="category-header">
                        <h2>${category.name}</h2>
                        <span class="text-secondary">${filteredTopics.length} topics</span>
                    </div>
                    <ul class="topic-list">
                        ${topicsHTML}
                    </ul>
                `;
                container.appendChild(card);
            }
        });
    },

    renderProjects: (projects, filter, searchQuery) => {
        const container = document.getElementById('projectsContainer');
        container.innerHTML = '';

        const filteredProjects = projects.filter(project => {
            const matchesFilter = filter === 'all' || 
                (filter === 'not-started' && project.status === 'Not Started') ||
                (filter === 'in-progress' && project.status === 'Currently Learning') ||
                (filter === 'completed' && project.status === 'Completed');
            
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });

        filteredProjects.forEach(project => {
            const isCompleted = project.status === 'Completed';
            const isLearning = project.status === 'Currently Learning';
            
            let selectClass = 'status-select';
            if (isCompleted) selectClass += ' completed';
            else if (isLearning) selectClass += ' learning';

            const card = document.createElement('div');
            card.className = 'category-card glassmorphism';
            
            card.innerHTML = `
                <div class="topic-item ${isCompleted ? 'completed' : ''}" style="padding:0; background:none; border:none;">
                    <div class="topic-main">
                        <label class="checkbox-wrap">
                            <input type="checkbox" class="project-checkbox" data-id="${project.id}" ${isCompleted ? 'checked' : ''}>
                            <span class="checkmark"></span>
                        </label>
                        <div>
                            <span class="topic-title" title="${project.title}">${project.title}</span>
                            ${isCompleted && project.completedDate ? `<span class="project-date">Completed: ${project.completedDate}</span>` : ''}
                        </div>
                    </div>
                    <select class="${selectClass} project-status" data-id="${project.id}">
                        <option value="Not Started" ${project.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                        <option value="Currently Learning" ${project.status === 'Currently Learning' ? 'selected' : ''}>Learning</option>
                        <option value="Completed" ${project.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
            `;
            container.appendChild(card);
        });
    },

    updateDashboard: (data) => {
        let totalTopics = 0;
        let completedTopics = 0;
        let inProgressTopics = 0;

        data.categories.forEach(category => {
            category.topics.forEach(topic => {
                totalTopics++;
                if (topic.status === 'Completed') completedTopics++;
                if (topic.status === 'Currently Learning') inProgressTopics++;
            });
        });

        data.projects.forEach(project => {
            totalTopics++;
            if (project.status === 'Completed') completedTopics++;
            if (project.status === 'Currently Learning') inProgressTopics++;
        });

        document.getElementById('totalTopics').textContent = totalTopics;
        document.getElementById('completedTopics').textContent = completedTopics;
        document.getElementById('inProgressTopics').textContent = inProgressTopics;

        const progressPercent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
        document.getElementById('overallProgressBar').style.width = `${progressPercent}%`;
        document.getElementById('overallProgressText').textContent = `${progressPercent}%`;
    },

    populateCategorySelect: (categories) => {
        const select = document.getElementById('itemCategory');
        select.innerHTML = '';
        categories.forEach(c => {
            const option = document.createElement('option');
            option.value = c.id;
            option.textContent = c.name;
            select.appendChild(option);
        });
    }
};
