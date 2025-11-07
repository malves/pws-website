// ===================================
// Powerspace - Auth JS (Signup only)
// ===================================

// Toggle Password Visibility
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('ri-eye-line');
            icon.classList.add('ri-eye-off-line');
        } else {
            input.type = 'password';
            icon.classList.remove('ri-eye-off-line');
            icon.classList.add('ri-eye-line');
        }
    });
});

// Signup Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(signupForm);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        
        if (password.length < 8) {
            alert('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }
        
        console.log('Signup data:', Object.fromEntries(formData));
        
        alert('Demande envoyée avec succès !\nNotre équipe vous contactera sous 24h pour finaliser votre inscription.');
    });
}

// Animation d'entrée
document.addEventListener('DOMContentLoaded', () => {
    const authBox = document.querySelector('.auth-box');
    if (authBox) {
        authBox.style.opacity = '0';
        authBox.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            authBox.style.transition = 'all 0.6s ease';
            authBox.style.opacity = '1';
            authBox.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Pre-fill email from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const emailParam = urlParams.get('email');
if (emailParam && document.getElementById('email')) {
    document.getElementById('email').value = emailParam;
}
