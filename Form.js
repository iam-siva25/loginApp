document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const retypePasswordInput = document.getElementById('retypePassword');
    const termsCheckbox = document.getElementById('terms');
    
    // New DOM elements for the right-side message
    const rightMessageHeading = document.getElementById('right-message-heading');
    const rightMessageText = document.getElementById('right-message-text');

    // Password toggle
    document.querySelectorAll('.password-toggle').forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const type = targetInput.getAttribute('type') === 'password' ? 'text' : 'password';
            targetInput.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        clearErrors();

        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email.');
            isValid = false;
        }

        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required.');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters.');
            isValid = false;
        }

        if (retypePasswordInput.value.trim() === '') {
            showError(retypePasswordInput, 'Please re-type your password.');
            isValid = false;
        } else if (retypePasswordInput.value !== passwordInput.value) {
            showError(retypePasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'You must accept the terms.');
            isValid = false;
        }

        if (isValid) {
            // Update the welcome message on the right side
            const registeredName = nameInput.value.trim();
            rightMessageHeading.textContent = `Welcome, ${registeredName}!`;
            rightMessageText.textContent = `You've successfully created your account.`;
            
            console.log('Form submitted successfully!');
            
            // Optionally hide the form after success
            // form.style.display = 'none';
        }
    });

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});