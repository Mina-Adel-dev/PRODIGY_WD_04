// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Form validation
function validateForm() {
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });
    
    // Validate name
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

// Show success message
function showSuccessMessage() {
    successMessage.classList.add('active');
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 5000);
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show a success message
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showSuccessMessage();
    }
});

// Real-time validation
contactForm.addEventListener('input', (e) => {
    const input = e.target;
    const errorElement = document.getElementById(`${input.id}-error`);
    
    if (input.id === 'name') {
        if (!input.value.trim()) {
            errorElement.textContent = 'Name is required';
        } else {
            errorElement.textContent = '';
        }
    }
    
    if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim()) {
            errorElement.textContent = 'Email is required';
        } else if (!emailRegex.test(input.value)) {
            errorElement.textContent = 'Please enter a valid email';
        } else {
            errorElement.textContent = '';
        }
    }
    
    if (input.id === 'message') {
        if (!input.value.trim()) {
            errorElement.textContent = 'Message is required';
        } else if (input.value.trim().length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
        } else {
            errorElement.textContent = '';
        }
    }
});