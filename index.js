const update = () => {
  document.documentElement.dataset.theme = 'system';
  document.documentElement.dataset.enhanced = true;
  document.documentElement.dataset.stick = true;
  document.documentElement.dataset.center = true;
  document.documentElement.dataset.layers = true;
  document.documentElement.dataset.stagger = 'range';
}

update()

function setupDynamicAboutUsPhoto() {
  const scaler = document.getElementsByClassName("scaler")[0];
  const ourPeoplePhoto = document.getElementById("our-people-photo");
  const aboutUsPhoto = document.getElementById("about-us-photo");
  scaler.addEventListener("animationend", listener);
  scaler.addEventListener("animationstart", listener);
  
  let lastEndWidth = null; // width at the last animationend
  let isFirstAnimation = true; // flag for the very first scroll-down
  
  function listener(event) {
    switch (event.type) {
      case "animationstart": {
        const currentWidth = ourPeoplePhoto.clientWidth;
        if (isFirstAnimation) {
          break;
        }
        // If the width at start matches the last end width, the photo is growing (scroll up)
        if (lastEndWidth !== null && currentWidth === lastEndWidth) {
          aboutUsPhoto.classList.remove("visible"); // process fades out, people shows through
        }
        break;
      }
      case "animationend": {
        const currentWidth = ourPeoplePhoto.clientWidth;
        // Only change to "our process photo" when shrinking
        // i.e. when the end width is smaller than the last start/end width
        if (lastEndWidth === null || currentWidth < lastEndWidth) {
          aboutUsPhoto.classList.add("visible"); // process fades in on top
        }
        lastEndWidth = currentWidth;
        isFirstAnimation = false;
        break;
      }
    }
  }
}

// CONTACT FORM
function showHideContactFields() {
document.querySelectorAll(".contact-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    // Deactivate all tabs and panels
    document.querySelectorAll(".contact-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".contact-panel").forEach(p => {
      p.classList.remove("active");
    });

    // Activate clicked tab and its target panel
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

  document.getElementById("booking-toggle").addEventListener("change", function () {
    document.getElementById("booking-fields").classList.toggle("visible", this.checked);
  });
}

function clearForm() {
  document.getElementById("cancel-btn").addEventListener("click", () => {
    document.querySelector(".app-form").reset();
    document.getElementById("booking-fields").classList.remove("visible");
  });
}

function handleFormSubmission() {
  document.querySelector(".app-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // stop the page from redirecting at all

    const form = e.target;
    const data = new FormData(form);
    const sendBtn = form.querySelector("[type='submit']");

    sendBtn.textContent = "SENDING...";
    sendBtn.disabled = true;

    try {
      const response = await fetch("https://formspree.io/f/mreapeko", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        sendBtn.textContent = "SENT ✓";
        sendBtn.style.color = "#14532d";
        form.reset();
        document.getElementById("booking-fields").classList.remove("visible");
      } else {
        sendBtn.textContent = "FAILED — TRY AGAIN";
        sendBtn.disabled = false;
      }
    } catch {
      sendBtn.textContent = "FAILED — TRY AGAIN";
      sendBtn.disabled = false;
    }
  });
}
// GET ON THE ELEVATOR
// window.addEventListener('scroll', () => {
//   document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
// }, false);

// const elevator = document.querySelector('.elevator');
// const elevatorL = document.querySelector('.elevatorL');
// const elevatorR = document.querySelector('.elevatorR');

// // Create the observer, same as before:
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
    
//     if (entry.isIntersecting) {
      
//       elevator.classList.add('elevator-transition');
//             elevatorL.classList.add('elevatorL-transition');
//       elevatorR.classList.add('elevatorR-transition');

//       return;
//     }

//     elevator.classList.remove('elevator-transition');
//     elevatorL.classList.remove('elevatorL-transition');
//     elevatorR.classList.remove('elevatorR-transition');

//   });
// });

// observer.observe(document.querySelector('.elevator'));
// observer.observe(document.querySelector('.elevatorL'));
// observer.observe(document.querySelector('.elevatorR'));


// time recorder
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

// Initialize all functions reliant on DOM
document.addEventListener("DOMContentLoaded", () => {
  initDynamicCurrentTime();
  setupDynamicAboutUsPhoto();
  showHideContactFields();
  clearForm();
  handleFormSubmission();
});