function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Name validation
    if (name.value.length <= 5) {
        document.getElementById('nameError').textContent = 'Name should be more than 5 characters long.';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Must be a valid email address.';
        isValid = false;
    }

    // Subject validation
    if (subject.value.length <= 15) {
        document.getElementById('subjectError').textContent = 'Subject should be more than 15 characters long.';
        isValid = false;
    }

    // Message validation
    if (message.value.length <= 25) {
        document.getElementById('messageError').textContent = 'Message content should be more than 25 characters long.';
        isValid = false;
    }

    if (isValid) {
        // Submit the form or show a success message
        alert('Form is valid. Implement form submission here.');
    }
}
