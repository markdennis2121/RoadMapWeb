import { DEFAULT_DATA } from './data.js';

const STORAGE_KEY = 'roadmap_tracker_data';

export const Storage = {
    getData: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        Storage.saveData(DEFAULT_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    },
    
    saveData: (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    updateTopicStatus: (categoryId, topicId, newStatus) => {
        const data = Storage.getData();
        const category = data.categories.find(c => c.id === categoryId);
        if (category) {
            const topic = category.topics.find(t => t.id === topicId);
            if (topic) {
                topic.status = newStatus;
                Storage.saveData(data);
            }
        }
    },

    updateProjectStatus: (projectId, newStatus) => {
        const data = Storage.getData();
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
            project.status = newStatus;
            if (newStatus === 'Completed') {
                project.completedDate = new Date().toISOString().split('T')[0];
            } else {
                project.completedDate = null;
            }
            Storage.saveData(data);
        }
    },

    addTopic: (categoryId, title) => {
        const data = Storage.getData();
        const category = data.categories.find(c => c.id === categoryId);
        if (category) {
            const newId = `${categoryId}-custom-${Date.now()}`;
            category.topics.push({ id: newId, title: title, status: 'Not Started' });
            Storage.saveData(data);
        }
    },

    addProject: (title) => {
        const data = Storage.getData();
        const newId = `proj-custom-${Date.now()}`;
        data.projects.push({ id: newId, title: title, status: 'Not Started', completedDate: null });
        Storage.saveData(data);
    },

    resetData: () => {
        localStorage.removeItem(STORAGE_KEY);
        Storage.saveData(DEFAULT_DATA);
    }
};
