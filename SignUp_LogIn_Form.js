const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Handle Form Submissions
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

// Registration Logic
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = registerForm.querySelector('input[type="text"]');
        const emailInput = registerForm.querySelector('input[type="email"]');
        const passwordInput = registerForm.querySelector('input[type="password"]');

        if (usernameInput && passwordInput) {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Get existing users or initialize empty object
            const users = JSON.parse(localStorage.getItem('foodied_auth_users')) || {};

            if (users[username]) {
                alert('Username already exists. Please choose another or login.');
                return;
            }

            // Register new user
            users[username] = { password: password };
            localStorage.setItem('foodied_auth_users', JSON.stringify(users));

            // Set as current logged in user
            localStorage.setItem('foodied_username', username);
            localStorage.setItem('foodied_role', 'user');
            alert('Registration successful!');
            window.location.href = 'menu.html';
        }
    });
}

// Login Logic
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = loginForm.querySelector('input[type="text"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        if (usernameInput && passwordInput) {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Hardcoded Admin Route
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('foodied_username', 'Admin');
                localStorage.setItem('foodied_role', 'admin');
                window.location.href = 'admin.html';
                return;
            }

            const users = JSON.parse(localStorage.getItem('foodied_auth_users')) || {};

            if (users[username] && users[username].password === password) {
                // Successful user or manager login
                localStorage.setItem('foodied_username', username);

                if (users[username].role === 'hotel_manager') {
                    localStorage.setItem('foodied_role', 'hotel_manager');
                    window.location.href = 'hotel.html';
                } else if (users[username].role === 'driver') {
                    localStorage.setItem('foodied_role', 'driver');
                    window.location.href = 'driver.html';
                } else {
                    localStorage.setItem('foodied_role', 'user');
                    window.location.href = 'menu.html';
                }
            } else {
                alert('Invalid username or password. Please try again or register.');
            }
        }
    });
}