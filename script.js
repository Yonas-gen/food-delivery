// Navigation scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Simple interaction for buttons to simulate functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for stored username and update profile immediately
    const storedUsername = localStorage.getItem('foodied_username');

    // Auth Guard for Menu Page
    if (window.location.pathname.includes('menu.html') && !storedUsername) {
        alert('Please login to view the menu.');
        window.location.href = 'SignUp_LogIn_Form.html#login';
        return; // Stop execution
    }

    if (storedUsername) {
        // Targets both the new menu page and original index page if it has a profile
        const profileNames = document.querySelectorAll('.profile-info .name, .userprofile .name');
        profileNames.forEach(el => {
            el.textContent = storedUsername;
        });
    }

    // Menu Page Search Functionality
    const searchInput = document.querySelector('.searchbar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const menuCards = document.querySelectorAll('.menu-items-section .regular-card');

            menuCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('.desc').textContent.toLowerCase();

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Search Button click handler
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default if it's in a form
            });
        }
    }

    const buyButtons = document.querySelectorAll('.btn-buy, .btn-add, .btn-buy-small');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Basic animation feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let count = parseInt(cartCount.innerText);
            cartCount.innerText = count + 1;

            // Toast notification could go here
        });
    });

    // Form submission prevent default
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input').value;
            if (input) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');

            // Toggle icon between bars and times
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }
});
