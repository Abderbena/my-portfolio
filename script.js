/**
 * Bouton de retour en haut de page
 * Apparaît lorsque l'utilisateur fait défiler la page vers le bas
 */

(function() {
    'use strict';

    // Créer le bouton retour en haut
    const scrollTopButton = document.createElement('button');
    scrollTopButton.setAttribute('id', 'scroll-top-btn');
    scrollTopButton.setAttribute('aria-label', 'Retour en haut de la page');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.classList.add('scroll-top-hidden');
    document.body.appendChild(scrollTopButton);

    // Fonction pour afficher/masquer le bouton selon la position du scroll
    function toggleScrollButton() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const showButtonThreshold = 300; // Afficher le bouton après 300px de scroll

        if (scrollPosition > showButtonThreshold) {
            scrollTopButton.classList.remove('scroll-top-hidden');
            scrollTopButton.classList.add('scroll-top-visible');
        } else {
            scrollTopButton.classList.remove('scroll-top-visible');
            scrollTopButton.classList.add('scroll-top-hidden');
        }
    }

    // Fonction pour remonter en haut de la page avec animation fluide
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Écouter l'événement de scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleScrollButton();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Ajouter l'événement de clic sur le bouton
    scrollTopButton.addEventListener('click', scrollToTop);

    // Vérifier la position initiale au chargement de la page
    toggleScrollButton();

    // Smooth scroll pour les liens de navigation (si pas déjà présent)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Gestion du formulaire de contact (si pas déjà présent)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai bientôt.');
            this.reset();
        });
    }
})();

