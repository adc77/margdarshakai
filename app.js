// Scroll to Signup Section
function scrollToSignup() {
    document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
}

// Validate Email Format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Handle Signup Form Submission
function handleSignup(event) {
    event.preventDefault(); // Prevent the default form submission

    const emailInput = document.querySelector('.signup-form input[type="email"]');
    const email = emailInput.value;

    // Validate email format
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Send the email to your server
    fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        alert('Thank you for signing up! We will notify you when the app is ready.');
        emailInput.value = ''; // Clear the input field
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error signing up. Please try again later.');
    });
}
