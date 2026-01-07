// --- THIS IS A FINAL FIX v4 ---
document.addEventListener("DOMContentLoaded", function() {
    
    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");

            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                });
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    // --- Counter Animation Logic (FIXED & CORRECTED) ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200; // The lower the speed, the faster the count

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;

            const updateCount = () => {
                const increment = target / speed;
                count += increment;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount(); // Start the animation
        };

        // Intersection Observer to start counter when visible
        // This observer is now correctly defined at this scope
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing after it has animated
                }
            });
        }, {
            threshold: 0.5 // Start when 50% of the element is visible
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    // (The animateCounter function was previously trapped inside another observer's scope. It is now fixed.)

    // --- Premium Hero Slider Logic (FIXED) ---
    const sliderWrapperPremium = document.querySelector(".hero-slider-premium"); // Changed to parent container
    if (sliderWrapperPremium) {
        const slidesPremium = document.querySelectorAll(".slide-premium");
        const prevBtnPremium = document.querySelector(".prev-btn-premium");
        const nextBtnPremium = document.querySelector(".next-btn-premium");
        const dotsContainerPremium = document.querySelector(".slider-dots-premium");
        
        let currentIndexPremium = 0;
        const totalSlidesPremium = slidesPremium.length;
        let slideIntervalPremium;

        // Create dots dynamically
        for (let i = 0; i < totalSlidesPremium; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                goToSlidePremium(i);
                resetIntervalPremium();
            });
            dotsContainerPremium.appendChild(dot);
        }

        const dotsPremium = document.querySelectorAll(".slider-dots-premium .dot");
        
        function updateSliderPremium() {
            slidesPremium.forEach((slide, index) => {
                slide.classList.toggle("active", index === currentIndexPremium);
                const content = slide.querySelector('.slide-content');
                if (content) {
                    // Reset animation for content in all slides
                    content.style.animation = 'none';
                }
            });
            // Reapply animation only for the active slide's content
            if (slidesPremium[currentIndexPremium]) {
                const activeContent = slidesPremium[currentIndexPremium].querySelector('.slide-content');
                if (activeContent) {
                    void activeContent.offsetWidth; // Trigger reflow
                    activeContent.style.animation = 'fadeInSlide 1s ease-out forwards';
                }
            }
            updateDotsPremium();
        }

        function updateDotsPremium() {
            dotsPremium.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndexPremium);
            });
        }

        function goToSlidePremium(index) {
            if (index < 0) {
                currentIndexPremium = totalSlidesPremium - 1;
            } else if (index >= totalSlidesPremium) {
                currentIndexPremium = 0;
            } else {
                currentIndexPremium = index;
            }
            updateSliderPremium();
        }

        function nextSlidePremium() {
            goToSlidePremium(currentIndexPremium + 1);
        }

        function prevSlidePremium() {
            goToSlidePremium(currentIndexPremium - 1);
        }

        function startIntervalPremium() {
            slideIntervalPremium = setInterval(nextSlidePremium, 6000); // Change slide every 6 seconds
        }

        function resetIntervalPremium() {
            clearInterval(slideIntervalPremium);
            startIntervalPremium();
        }

        // Event Listeners
        nextBtnPremium.addEventListener("click", () => {
            nextSlidePremium();
            resetIntervalPremium();
        });

        prevBtnPremium.addEventListener("click", () => {
            prevSlidePremium();
            resetIntervalPremium();
        });

        // Initial setup
        goToSlidePremium(0); // Show the first slide
        startIntervalPremium();
    }

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const body = document.querySelector("body");
    const primaryNav = document.querySelector(".primary-navigation");

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            // মেন্যু খোলা বা বন্ধ করা
            body.classList.toggle("nav-open");
            const isExpanded = body.classList.contains("nav-open");
            mobileNavToggle.setAttribute("aria-expanded", isExpanded);
        });

        // মেন্যুর বাইরে ক্লিক করলে মেন্যু বন্ধ করা
        document.addEventListener('click', function(e) {
            if (body.classList.contains('nav-open') && !primaryNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                body.classList.remove("nav-open");
                mobileNavToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // --- Service Page Scrollspy Logic ---
    const sections = document.querySelectorAll(".service-detail-box");
    const navLinks = document.querySelectorAll(".service-nav a");

    if (sections.length > 0 && navLinks.length > 0) {
        
        const onScroll = () => {
            let currentSection = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) { // 150px offset for header
                    currentSection = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + currentSection) {
                    link.classList.add("active");
                }
            });
        };
        
        window.addEventListener("scroll", onScroll);
    }
    
    // --- 6. Portfolio Page Filter Logic (Upgraded for multiple galleries) ---
    
    // Find all filterable components on the page (one on index.html, one on portfolio.html)
    const portfolioComponents = document.querySelectorAll(".portfolio-page-content, .homepage-portfolio-component"); 

    if (portfolioComponents.length > 0) {
        portfolioComponents.forEach(component => {
            const filterButtons = component.querySelectorAll(".filter-btn");
            const galleryItems = component.querySelectorAll(".gallery-item-card");

            if (filterButtons.length > 0 && galleryItems.length > 0) {
                filterButtons.forEach(button => {
                    button.addEventListener("click", () => {
                        // Set active class on button *within this component*
                        filterButtons.forEach(btn => btn.classList.remove("active"));
                        button.classList.add("active");

                        const filterValue = button.getAttribute("data-filter");

                        // Filter items *within this component*
                        galleryItems.forEach(item => {
                            if (filterValue === "all" || item.classList.contains(filterValue)) {
                                item.classList.remove("hide");
                                item.style.animation = "fadeIn 0.5s ease";
                            } else {
                                item.classList.add("hide");
                                item.style.animation = "none";
                            }
                        });
                    });
                });
            }
        });
    } // End of Portfolio Filter Logic

    // --- Scroll Animation Logic ---
    const hiddenSections = document.querySelectorAll(".hidden-section");
    if (hiddenSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-section");
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // 15% of the section must be visible
        });

        hiddenSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});
// --- 7. Portfolio Detail Modal (Lightbox) Logic ---

// Get the modal and its elements
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-btn");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalWhatsappLink = document.getElementById("modalWhatsappLink");

// Get all gallery cards
const galleryCards = document.querySelectorAll(".portfolio-gallery-grid .gallery-item-card");

if (galleryCards.length > 0) {
    galleryCards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Check if the click was directly on the card or its children (excluding other interactive elements if any)
            if (e.target.closest('.gallery-item-card')) {
                // Prevent default action if it was an anchor tag, but our current design has no anchors, so this is fine.

                // 1. Extract data from the clicked card
                const imgSource = card.getAttribute("data-img");
                const titleText = card.getAttribute("data-title");
                const descriptionText = card.getAttribute("data-description");
                
                // 2. Populate the modal elements
                modalImage.src = imgSource;
                modalImage.alt = titleText;
                modalTitle.textContent = titleText;
                modalDescription.textContent = descriptionText;

                // 3. Update the WhatsApp link with the project title
                const whatsappBaseUrl = "https://wa.me/8801997426656?text=";
                const encodedMessage = encodeURIComponent(`Hello, I am interested in the '${titleText}' design I saw on your portfolio. Can you share a quote?`);
                modalWhatsappLink.href = whatsappBaseUrl + encodedMessage;

                // 4. Display the modal
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent scrolling on main page
            }
        });
    });
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

// 1. Close the modal when the close button (x) is clicked
closeBtn.onclick = closeModal;

// 2. Close the modal when the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}