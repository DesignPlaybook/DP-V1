/* ===================================================================
 * Mueller 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    'use strict';

    const cfg = {

        // MailChimp URL
        mailChimpURL: 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'

    };


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader')) {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

        // window.addEventListener('beforeunload' , function() {
        //     siteBody.classList.remove('ss-show');
        // });

    }; // end ssPreloader


    /* move header
     * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function () {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    }; // end ssMoveHeader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function (event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function (link) {

            link.addEventListener("click", function (event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function () {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


    /* highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function () {

        const sections = document.querySelectorAll('.target-section');

        // Add an event listener listening for scroll
        window.addEventListener('scroll', navHighlight);

        function navHighlight() {

            // Get current scroll position
            let scrollY = window.pageYOffset;

            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function (current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                /* If our current scroll position enters the space where current section 
                 * on screen is, add .current class to parent element(li) of the thecorresponding 
                 * navigation link, else remove it. To know which link is active, we use 
                 * sectionId variable we are getting while looping through sections as 
                 * an selector
                 */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }

    }; // end ssScrollSpy


    /* masonry
     * ------------------------------------------------------ */
    const ssMasonry = function () {

        const containerBricks = document.querySelector('.bricks-wrapper');
        if (!containerBricks) return;

        imagesLoaded(containerBricks, function () {

            const msnry = new Masonry(containerBricks, {
                itemSelector: '.entry',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                resize: true
            });

        });

    }; // end ssMasonry


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const testimonialsSwiper = new Swiper('.s-testimonials__slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 50
                },
                // when window width is > 1180px
                1181: {
                    slidesPerView: 2,
                    spaceBetween: 100
                }
            }
        });

    }; // end ssSwiper


    /* mailchimp form
     * ---------------------------------------------------- */
    const ssMailChimpForm = function () {
        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;
            let validity = field.validity;
            if (validity.valid) return;
            if (validity.valueMissing) return 'Please enter an email address.';
            if (validity.typeMismatch && field.type === 'email') return 'Please enter a valid email address.';
            return 'The value you entered for this field is invalid.';
        }

        // Show error message
        function showError(field, error) {
            let errorMessage = field.form.querySelector('.mc-status');
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;
        }

        // Display the popup
        function showPopup() {
            document.getElementById('popup').style.display = 'flex';
        }

        // Close the popup
        function closePopup() {
            document.getElementById('popup').style.display = 'none';
        }

        // Submit the form
        mcForm.addEventListener('submit', function (event) {
            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            // Show the popup
            showPopup();

            // Now submit the form to Google Form
            const formData = new FormData(mcForm);
            const actionUrl = mcForm.action;

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Important for cross-origin requests
            }).then(() => {
                // Optionally, handle success (like showing a success message)
                // closePopup(); // Uncomment if you want to close the popup immediately after submission
            }).catch(err => {
                console.error('Submission error:', err);
                // Optionally, handle errors here
            });
        }, false);
    };



    /* Lightbox
     * ------------------------------------------------------ */
    const ssLightbox = function () {

        // video lightbox
        const videoLightbox = function () {

            const videoLink = document.querySelector('.s-intro__content-video-btn');
            if (!videoLink) return;

            videoLink.addEventListener('click', function (event) {

                const vLink = this.getAttribute('href');
                const iframe = "<iframe src='" + vLink + "' frameborder='0'></iframe>";

                event.preventDefault();

                const instance = basicLightbox.create(iframe);
                instance.show()

            });

        };

        // portfolio lightbox
        const folioLightbox = function () {

            const folioLinks = document.querySelectorAll('.brick .entry__link');
            const modals = [];

            folioLinks.forEach(function (link) {
                let modalbox = link.getAttribute('href');
                let instance = basicLightbox.create(
                    document.querySelector(modalbox),
                    {
                        onShow: function (instance) {
                            //detect Escape key press
                            document.addEventListener("keydown", function (event) {
                                event = event || window.event;
                                if (event.key === "Escape") {
                                    instance.close();
                                }
                            });
                        }
                    }
                )
                modals.push(instance);
            });

            folioLinks.forEach(function (link, index) {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    modals[index].show();
                });
            });

        };

        videoLightbox();
        folioLightbox();

    }; // ssLightbox


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (event) {
                if (event.target.matches('.alert-box__close')) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add('hideit');

                    setTimeout(function () {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function () {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function () {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssMasonry();
        ssSwiper();
        ssMailChimpForm();
        ssLightbox();
        ssAlertBoxes();
        ssBackToTop();
        ssMoveTo();

    })();

})(document.documentElement);