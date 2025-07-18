// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const yearSpan = document.getElementById('year');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const progressBars = document.querySelectorAll('.progress-bar');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');

    // Set current year in footer
    yearSpan.textContent = new Date().getFullYear();

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        // Update icon based on theme
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate skill progress bars when in viewport
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = `${percent}%`;
        });
    };

    // Portfolio filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Contact form submission
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value,
            };
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            `;
        });
    }

    // Intersection Observer for animations
    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
                
                // If the target is the skills section, animate progress bars
                if (entry.target.classList.contains('skills-content')) {
                    animateProgressBars();
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe elements for animation
    document.querySelectorAll('.hero-content, .section-header, .about-content, .skills-content, .portfolio-filter, .portfolio-grid, .contact-content').forEach(section => {
        animateOnScroll.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// scroll animatin script 
// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

  // --- SCROLL REVEAL ANIMATION ---
  
  // Select all elements with the 'hidden-on-scroll' class
  const animatedElements = document.querySelectorAll('.hidden-on-scroll');

  // Set up the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in the viewport (i.e., visible on screen)
      if (entry.isIntersecting) {
        // Add the 'visible' class to trigger the animation
        entry.target.classList.add('visible');
        // Stop observing the element once it has become visible
        observer.unobserve(entry.target);
      }
    });
  }, {
    // This option means the animation will start when the element is 10% visible
    threshold: 0.1 
  });

  // Tell the observer to watch each of the animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // --- OTHER SCRIPTS FROM YOUR main.js CAN GO HERE ---
  // For example, your theme toggle or mobile menu logic.
  
});