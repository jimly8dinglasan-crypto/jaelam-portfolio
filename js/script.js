const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('open');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('open', !isOpen);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const themeToggle = document.querySelector('.theme-toggle');
const themeStorageKey = 'jaelam-portfolio-theme';

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.querySelector('span').textContent = isLight ? '◐' : '☼';
  }
};

let savedTheme = null;
try {
  savedTheme = localStorage.getItem(themeStorageKey);
} catch {
  savedTheme = null;
}
setTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // Theme remains active for this page if browser storage is unavailable.
    }
  });
}

const typingElement = document.querySelector('.typewriter');
if (typingElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const phrases = ['IT Student', 'Learning Web Development', 'Tech Enthusiast', 'Problem Solver'];
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = false;

  const typeLoop = () => {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typingElement.textContent = phrase.slice(0, characterIndex);

    if (characterIndex === phrase.length) {
      deleting = true;
      window.setTimeout(typeLoop, 1250);
      return;
    }
    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    window.setTimeout(typeLoop, deleting ? 55 : 105);
  };

  window.setTimeout(typeLoop, 1800);
}

const skillFills = document.querySelectorAll('.skill-fill');
if ('IntersectionObserver' in window && skillFills.length) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  skillFills.forEach((fill) => skillObserver.observe(fill));
} else {
  skillFills.forEach((fill) => fill.classList.add('is-visible'));
}

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const feedback = document.querySelector('#form-feedback');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.classList.remove('error');

    if (!contactForm.reportValidity()) {
      feedback.textContent = 'Please check the highlighted fields and try again.';
      feedback.classList.add('error');
      return;
    }

    const formData = new FormData(contactForm);
    const subject = `Portfolio message from ${formData.get('name').trim()}`;
    const body = `Name: ${formData.get('name').trim()}\nEmail: ${formData.get('email').trim()}\n\n${formData.get('message').trim()}`;
    const recipient = 'jimly8dinglasan@gmail.com';
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    feedback.textContent = 'Your email app should open with a draft addressed to Jaelam. Review it and send it there.';
    window.location.href = mailto;
  });
}

const topButton = document.querySelector('#topBtn');
if (topButton) {
  const updateTopButton = () => topButton.classList.toggle('visible', window.scrollY > 300);
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
