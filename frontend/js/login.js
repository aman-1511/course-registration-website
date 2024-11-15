
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorDiv = document.getElementById('error');
    
    if (!username || !password || !role) {
        errorDiv.textContent = 'All fields are required.';
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
           
            localStorage.setItem('token', data.token);
          
            if (data.role === 'student') {
                window.location.href = 'student_dashboard.html';
            } else if (data.role === 'teacher') {
                window.location.href = 'teacher_dashboard.html';
            } else if (data.role === 'admin') {
                window.location.href = 'admin_dashboard.html';
            }
        } else {
            errorDiv.textContent = data.message || 'Login failed.';
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'An error occurred. Please try again.';
    }
});


async function handleGoogleLogin() {
    
    window.location.href = '/api/auth/google';
}
