// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme toggle functionality
  initThemeToggle();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize smooth scrolling for navigation links
  initSmoothScrolling();
  
  // Initialize projects page if needed
  if (document.getElementById('projects-page')) {
    initProjectsPage();
  }
});

// Initialize theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme
  if (savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches)) {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
  
  // Theme toggle button event listener
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    
    if (themeIcon) {
      if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile navbar if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
          navbarToggler.click();
        }
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize projects page specific functionality
function initProjectsPage() {
  // Add animation to project cards on scroll
  const projectCards = document.querySelectorAll('.project-card-3d');
  
  const cardOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, cardOptions);
  
  projectCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.backgroundColor = 'rgba(15, 17, 26, 0.95)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.backgroundColor = 'rgba(15, 17, 26, 0.9)';
  }
});