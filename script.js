document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // 2. Sticky Header Effect
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init on page load

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated to keep it visible
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // 4. Form AJAX Submission per Messaggio di Successo Personalizzato
    const contactForm = document.querySelector('.contatti-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Blocca il redirect predefinito
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = btn.textContent;
            btn.textContent = 'Invio in corso...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Sostituisce il form con un bellissimo messaggio di successo
                    const formContainer = document.querySelector('.contatti-form');
                    formContainer.innerHTML = `
                        <div class="success-message" style="text-align: center; padding: 40px 20px; animation: fadeIn 0.5s ease-out;">
                            <div style="background: rgba(37, 99, 235, 0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" stroke-width="2.5" style="width: 40px; height: 40px;">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h3 style="color: var(--primary-color); font-size: 1.8rem; margin-bottom: 15px; font-weight: 800;">Richiesta Ricevuta!</h3>
                            <p style="color: var(--text-color); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">Grazie per avermi contattato. Ho ricevuto i tuoi dettagli e analizzerò la tua richiesta.</p>
                            <p style="color: var(--text-color); font-size: 1.05rem;">Ti risponderò al più presto (solitamente entro 24 ore) per fissare una chiacchierata senza impegno.</p>
                            <p style="color: var(--primary-color); font-size: 1.1rem; margin-top: 30px; font-weight: 600;">A presto, <br>Christian</p>
                        </div>
                    `;
                } else {
                    throw new Error('Errore di rete');
                }
            })
            .catch(error => {
                btn.textContent = 'Errore! Riprova';
                setTimeout(() => {
                    btn.textContent = originalBtnText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

});
