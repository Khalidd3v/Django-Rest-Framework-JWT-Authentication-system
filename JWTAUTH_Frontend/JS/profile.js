const fetchUserProfile = (accessToken) => {
    fetch('http://localhost:8080/api/user/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        return response.json();
    })
    .then(profileData => {
        // Display user profile content on the page
        const profileContent = document.getElementById('profileContent');
        profileContent.innerHTML = `
            <p>Email: ${profileData.email}</p>
            <p>Name: ${profileData.name}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
        if (error.message === 'Failed to fetch profile') {
            // Handle token expiration: call a function to refresh token and retry
            refreshToken();
        } else {
            // Handle other errors (e.g., redirect to error page)
        }
    });
};

const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        fetch('http://localhost:8080/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    // Refresh token is expired or invalid, redirect to login page
                    window.location.href = '/JWTAUTH_Frontend/HTML/login.html'; // Replace '/login' with your actual login page URL
                }
                throw new Error('Failed to refresh token');
            }
            return response.json();
        })
        .then(data => {
            // Update the access token in local storage
            localStorage.setItem('accessToken', data.access);
            // Retry fetching user profile with the new access token
            fetchUserProfile(data.access);
        })
        .catch(error => {
            console.error('Error refreshing token:', error);
            // Handle token refresh failure (e.g., redirect to login page)
        });
    } else {
        console.error('Refresh token not found in local storage');
        // Handle scenario where refresh token is not found (e.g., redirect to login page)
    }
};

// Retrieve access token from local storage
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    // Call function to fetch user profile content
    fetchUserProfile(accessToken);
} else {
    console.error('Access token not found in local storage');
    // Handle scenario where access token is not found (e.g., redirect to login page)
}
