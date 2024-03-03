
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
        // Handle other errors (e.g., redirect to error page)
    });
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