document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    fetch('http://localhost:8080/api/user/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('User registered successfully!');
        // Optionally, you can redirect the user to another page here
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering user.', error);
    });
});