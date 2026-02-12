// import Grid1Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js';

// const bg = Grid1Background(document.getElementById('webgl-canvas'))


// const color = 0x48577D;

// // Set grid colors
// bg.grid.setColors([color, color, color]);

// // Set lights to the same color
// bg.grid.light1.color.set(color);
// bg.grid.light1.intensity = 2; // pick a fixed intensity
// bg.grid.light2.color.set(color);
// bg.grid.light2.intensity = 1;

// bg.renderer.setPixelRatio(1);
// bg.renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);

// Newsletter issue: https://craftofui.substack.com/p/scrolling-a-page-out-of-the-playbook

import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

const hasScrollSupport = CSS.supports(
  '(animation-timeline: view()) and (animation-range: 0 100%)'
)

const config = {
  theme: 'system',
  enhanced: true,
  stick: true,
  layers: true,
  center: true,
  stagger: 'range',
}

if (!hasScrollSupport) {
  gsap.registerPlugin(ScrollTrigger)
  console.info('GSAP ScrollTrigger registered')
}

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.enhanced = config.enhanced
  document.documentElement.dataset.stick = config.stick
  document.documentElement.dataset.center = config.center
  document.documentElement.dataset.layers = config.layers
  document.documentElement.dataset.stagger = config.stagger
}

update()

// GET ON THE ELEVATOR
window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

const elevator = document.querySelector('.elevator');
const elevatorL = document.querySelector('.elevatorL');
const elevatorR = document.querySelector('.elevatorR');

// Create the observer, same as before:
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    
    if (entry.isIntersecting) {
      
      elevator.classList.add('elevator-transition');
            elevatorL.classList.add('elevatorL-transition');
      elevatorR.classList.add('elevatorR-transition');

      return;
    }

    elevator.classList.remove('elevator-transition');
    elevatorL.classList.remove('elevatorL-transition');
    elevatorR.classList.remove('elevatorR-transition');

  });
});

observer.observe(document.querySelector('.elevator'));
observer.observe(document.querySelector('.elevatorL'));
observer.observe(document.querySelector('.elevatorR'));


// time recorder ayyur
function initDynamicCurrentTime() {
  const defaultTimezone = "Europe/Amsterdam";

  // Function to create a time formatter with the correct timezone
  const createFormatter = (timezone) => {
    return new Intl.DateTimeFormat([], {
      timeZone: timezone,
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Function to extract time parts safely
  const getTimeParts = (formatter) => {
    const parts = formatter.formatToParts(new Date());
    const timeParts = {};
    parts.forEach(({ type, value }) => {
      if (["hour", "minute", "second", "timeZoneName"].includes(type)) {
        timeParts[type] = value;
      }
    });
    return timeParts;
  };

  // Function to update the time for all elements
  const updateTime = () => {
    document.querySelectorAll("[data-current-time]").forEach((element) => {
      const timezone =
        element.getAttribute("data-current-time") || defaultTimezone;
      const formatter = createFormatter(timezone);
      const { hour, minute, second, timeZoneName } = getTimeParts(formatter);

      // Update child elements if they exist
      const hoursElem = element.querySelector("[data-current-time-hours]");
      const minutesElem = element.querySelector("[data-current-time-minutes]");
      const secondsElem = element.querySelector("[data-current-time-seconds]");
      const timezoneElem = element.querySelector(
        "[data-current-time-timezone]"
      );

      if (hoursElem) hoursElem.textContent = hour;
      if (minutesElem) minutesElem.textContent = minute;
      if (secondsElem) secondsElem.textContent = second;
      if (timezoneElem) timezoneElem.textContent = timeZoneName;
    });
  };

  // Initial update and interval for subsequent updates
  updateTime();
  setInterval(updateTime, 1000);
}

// Initialize Dynamic Current Time
document.addEventListener("DOMContentLoaded", () => {
  initDynamicCurrentTime();
});