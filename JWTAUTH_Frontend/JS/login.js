document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    fetch('http://localhost:8080/api/user/login/', {
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
        // Save tokens to local storage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        console.log('accessToken:', data.access);
        console.log('refreshToken:', data.refresh);
        // Redirect user to another page (optional)
        window.location.href = 'http://127.0.0.1:5500/JWTAUTH_Frontend/HTML/profile.html'; // Redirect to dashboard page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Invalid email or password.');
    });
});