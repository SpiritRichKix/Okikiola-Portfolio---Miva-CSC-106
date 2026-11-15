document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    if (!form) return;

    const feedback = document.getElementById('form-feedback');

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        message: document.getElementById('message')
    };

    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        errorElement.textContent = message;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        let isValid = true;

        Object.keys(fields).forEach(key => showError(key, ''));

        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        const phone = fields.phone.value.trim();
        const message = fields.message.value.trim();

        if (name.length < 2) {
            showError('name', 'Please enter a valid name.');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        }

        const phonePattern = /^[0-9+\-\s()]{7,20}$/;

        if (!phonePattern.test(phone)) {
            showError('phone', 'Please enter a valid phone number.');
            isValid = false;
        }

        if (message.length < 10) {
            showError('message', 'Your message should contain at least 10 characters.');
            isValid = false;
        }

        if (isValid) {
            feedback.textContent =
                'All fields are valid. This demonstration form does not send messages.';
            form.reset();
        } else {
            feedback.textContent = 'Please correct the highlighted fields.';
        }
    });
});