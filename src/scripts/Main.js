import ComponentFactory from './ComponentFactory';
import Icons from './utils/Icons';
import Carousel from './Carousel';
import Lenis from 'lenis';

class Main {
  constructor() {
    this.init();
  }

  init() {
    new ComponentFactory();

    Icons.load();
  }
}
window.onload = function () {
  const body = document.body;
  const currentPage = window.location.pathname;

  if (currentPage.includes('index.html') || currentPage === '/') {
    // On index.html or home page
    body.classList.add('hover-white');
  } else {
    // On contact.html or any other page
    body.classList.add('hover-black');
  }
};

// Select both .personnalite-item and .img-hover elements
const items = document.querySelectorAll('.personnalite-item, .img-hover');

items.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY, target } = e;
    const { offsetWidth, offsetHeight } = target;

    // Calculate the center of the element
    const x = offsetX / offsetWidth - 0.5;
    const y = offsetY / offsetHeight - 0.5;

    // Set rotation values with higher intensity for more noticeable effect
    const rotateX = y * 40; // Increased intensity for X rotation
    const rotateY = x * 40; // Increased intensity for Y rotation

    // Apply the calculated values as CSS variables
    target.style.setProperty('--rotateX', `${rotateX}deg`);
    target.style.setProperty('--rotateY', `${rotateY}deg`);

    target.classList.add('hover-effect');
  });

  item.addEventListener('mouseleave', (e) => {
    // Reset the effect when the mouse leaves the item
    e.target.style.setProperty('--rotateX', `0deg`);
    e.target.style.setProperty('--rotateY', `0deg`);
    e.target.classList.remove('hover-effect');
  });
});

// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', ScrollTrigger.update, (e) => {
  console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
requestAnimationFrame(raf);
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  tsParticles.load('tsparticles', {
    fpsLimit: 120,
    particles: {
      number: {
        value: 80, // Adjust the number of particles
        density: {
          enable: true,
          area: 800, // Adjust the density of particles
        },
      },
      color: {
        value: '#EF719E', // Particle color
      },
      shape: {
        type: 'circle', // Shape of the particles
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 5,
        random: true,
      },
      links: {
        enable: true,
        distance: 150,
        color: '#fff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2, // Adjust the speed of moving particles
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse', // Repulse particles on hover
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100, // Adjust the repulsion distance
          duration: 0.4,
        },
      },
    },
    retina_detect: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cascadeText = document.querySelector('.cascade-text');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cascadeText.innerHTML = cascadeText.textContent
          .trim()
          .split('')
          .map((char) => (char === ' ' ? '&nbsp;' : `<span>${char}</span>`))
          .join('');

        cascadeText.querySelectorAll('span').forEach((span, index) => {
          span.style.animationDelay = `${index * 0.05}s`;
        });
        observer.unobserve(cascadeText); // Stop observing after animation triggers
      }
    });
  });

  observer.observe(cascadeText);
});

new Main();
