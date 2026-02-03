import projectsData from '../data/projects.json' assert { type: 'json' };

// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const moreProjectsContainer = document.getElementById('more-projects-container');
const prodigyContainer = document.getElementById('prodigy-container');
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Separate featured and additional projects
const featuredProjects = projectsData.filter(project => !project.type || project.type !== 'additional');
const additionalProjects = projectsData.filter(project => project.type === 'additional');

// Load main projects from JSON and render them
function loadProjects() {
    // Load featured projects
    featuredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    // Load additional projects if they exist
    if (additionalProjects.length > 0) {
        additionalProjects.forEach(project => {
            const projectCard = createProjectCard(project, true);
            moreProjectsContainer.appendChild(projectCard);
        });
    } else {
        document.getElementById('more-projects').style.display = 'none';
    }
}

// Load Prodigy projects
async function loadProdigyProjects() {
    try {
        const response = await fetch('./data/prodigy.json');
        const prodigyData = await response.json();
        
        prodigyData.forEach(project => {
            const prodigyCard = createProdigyCard(project);
            prodigyContainer.appendChild(prodigyCard);
        });
    } catch (error) {
        console.error('Error loading Prodigy projects:', error);
        prodigyContainer.innerHTML = '<p class="error-message">Unable to load Prodigy projects. Please check your connection.</p>';
    }
}

// Create a project card element
function createProjectCard(project, isAdditional = false) {
    const card = document.createElement('div');
    card.className = 'project-card';
    if (isAdditional) {
        card.classList.add('additional-project');
    }
    card.setAttribute('data-project', project.id);
    
    // Create tech tags
    const techTags = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Determine GitHub button text and link
    const githubUrl = project.github || 'https://github.com/Mina-Adel-dev';
    const githubButtonText = project.github === 'https://github.com/Mina-Adel-dev' ? 'GitHub Profile' : 'GitHub';
    
    // Create Live Demo button only if live URL exists
    const liveDemoButton = project.live ? 
        `<a href="${project.live}" target="_blank" class="btn btn-primary project-link">Live Demo</a>` : 
        '';
    
    card.innerHTML = `
        <div class="project-image">
            <span>${project.emoji}</span>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">
                <button class="btn btn-secondary project-link case-study-btn" data-project="${project.id}">Case Study</button>
                ${liveDemoButton}
                <a href="${githubUrl}" target="_blank" class="btn btn-primary project-link">${githubButtonText}</a>
            </div>
        </div>
    `;
    
    return card;
}

// Create a Prodigy project card element
function createProdigyCard(project) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'prodigy-card-wrapper';
    card.setAttribute('data-prodigy-id', project.id);
    
    // Create card content
    let cardContent = '';
    
    // Create tech tags
    const techTags = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Create highlights list
    const highlightsList = project.highlights.map(highlight => 
        `<li>${highlight}</li>`
    ).join('');
    
    // Create demo checklist
    const demoChecklist = project.demoSteps.map(step => 
        `<li class="demo-checklist-item">
            <span class="demo-checkbox"></span>
            <span class="demo-step">${step}</span>
        </li>`
    ).join('');
    
    // Create buttons (only show if URL exists)
    const buttons = [];
    
    if (project.github) {
        const githubButtonText = project.github === 'https://github.com/Mina-Adel-dev' ? 'GitHub Profile' : 'GitHub';
        buttons.push(`<a href="${project.github}" target="_blank" class="btn btn-secondary prodigy-btn">${githubButtonText}</a>`);
    }
    
    if (project.video) {
        buttons.push(`<a href="${project.video}" target="_blank" class="btn btn-secondary prodigy-btn">Video Demo</a>`);
    }
    
    const buttonsRow = buttons.length > 0 ? 
        `<div class="prodigy-buttons">${buttons.join('')}</div>` : 
        '';
    
    // Add local demo line if available
    const localDemoLine = project.localDemo ? 
        `<div class="local-demo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>Local demo: ${project.localDemo}</span>
        </div>` : 
        '';
    
    // Create card content
    cardContent = `
        <div class="prodigy-card-header">
            <span class="task-badge">${project.taskCode}</span>
            <h3 class="prodigy-card-title">${project.title}</h3>
        </div>
        <div class="prodigy-card-content">
            <p class="prodigy-card-description">${project.description}</p>
            
            <div class="prodigy-tech-tags">${techTags}</div>
            
            <div class="prodigy-highlights">
                <h4 class="prodigy-section-title">Key Features</h4>
                <ul class="prodigy-highlights-list">${highlightsList}</ul>
            </div>
            
            <div class="prodigy-demo-checklist">
                <h4 class="prodigy-section-title">Demo Checklist</h4>
                <ul class="demo-checklist">${demoChecklist}</ul>
            </div>
            
            ${localDemoLine}
            ${buttonsRow}
        </div>
    `;
    
    // If project has live URL, wrap entire card in clickable link
    if (project.live) {
        const link = document.createElement('a');
        link.className = 'prodigy-card-link';
        link.href = project.live;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `Open ${project.title} live demo`);
        link.innerHTML = cardContent;
        card.appendChild(link);
        
        // Add clickable indicator
        link.classList.add('clickable');
    } else {
        // Otherwise, just create a regular div
        const cardDiv = document.createElement('div');
        cardDiv.className = 'prodigy-card';
        cardDiv.innerHTML = cardContent;
        card.appendChild(cardDiv);
    }
    
    return card;
}

// Open modal with project case study
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    
    if (!project) return;
    
    const techTags = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Determine GitHub button text and link
    const githubUrl = project.github || 'https://github.com/Mina-Adel-dev';
    const githubButtonText = project.github === 'https://github.com/Mina-Adel-dev' ? 'View GitHub Profile' : 'View Code';
    
    // Create Live Demo button only if live URL exists
    const liveDemoButton = project.live ? 
        `<a href="${project.live}" target="_blank" class="btn btn-primary">Live Demo</a>` : 
        '';
    
    // Update modal title
    modalTitle.textContent = `${project.title} - Case Study`;
    
    // Update modal body content
    modalBody.innerHTML = `
        <p class="modal-subtitle">${project.subtitle}</p>
        
        <div class="modal-section">
            <h3 class="modal-section-title">Problem</h3>
            <p>${project.caseStudy.problem}</p>
        </div>
        
        <div class="modal-section">
            <h3 class="modal-section-title">Solution</h3>
            <p>${project.caseStudy.solution}</p>
        </div>
        
        <div class="modal-section">
            <h3 class="modal-section-title">Key Features</h3>
            <ul>
                ${project.caseStudy.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        ${project.caseStudy.security ? `
        <div class="modal-section">
            <h3 class="modal-section-title">Security Implementation</h3>
            <p>${project.caseStudy.security}</p>
        </div>
        ` : ''}
        
        ${project.caseStudy.learned ? `
        <div class="modal-section">
            <h3 class="modal-section-title">What I Learned</h3>
            <p>${project.caseStudy.learned}</p>
        </div>
        ` : ''}
        
        <div class="modal-section">
            <h3 class="modal-section-title">Technologies Used</h3>
            <div class="modal-tech">${techTags}</div>
        </div>
        
        <div class="modal-links">
            ${liveDemoButton}
            <a href="${githubUrl}" target="_blank" class="btn btn-secondary">${githubButtonText}</a>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set focus to the modal for accessibility
    setTimeout(() => {
        modalTitle.focus();
    }, 100);
}

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the button that opened the modal
    const lastFocusedElement = document.activeElement;
    if (lastFocusedElement && lastFocusedElement.classList.contains('case-study-btn')) {
        lastFocusedElement.focus();
    }
}

// Event listeners for project cards
document.addEventListener('click', (e) => {
    // Case study button click
    if (e.target.classList.contains('case-study-btn')) {
        const projectId = e.target.getAttribute('data-project');
        openProjectModal(projectId);
    }
    
    // Close modal when clicking overlay or close button
    if (e.target === modalOverlay || e.target === modalClose) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
    
    // Trap focus within modal when open
    if (e.key === 'Tab' && projectModal.classList.contains('active')) {
        const focusableElements = modalBody.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadProdigyProjects();
    
    // Add CSS for additional projects
    const style = document.createElement('style');
    style.textContent = `
        .more-projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
        }
        
        .additional-project {
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        
        .additional-project:hover {
            transform: scale(0.97);
        }
        
        .additional-project .project-links {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .additional-project .project-link {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});