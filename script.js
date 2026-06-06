function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const name = sanitizeInput(document.getElementById('name').value);
        const email = document.getElementById('email').value.trim();
        const message = sanitizeInput(document.getElementById('message').value);

        if (name.length < 2) {
            alert('Please enter a valid name (at least 2 characters).');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (message.length < 10) {
            alert('Your message is too short. Please provide a bit more detail (at least 10 characters).');
            return;
        }

        alert(`New Message from ${name}!\nEmail: ${email}\nMessage: ${message}`);
        contactForm.reset();
    });
}

const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('waitlistEmail').value.trim();
        const checkedRadio = document.querySelector('input[name="updates"]:checked');

        if (email === '') {
            alert('Email cannot be empty.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!checkedRadio) {
            alert('Please select whether you would like to receive notification updates.');
            return;
        }

        const updates = checkedRadio.value;

        alert(`Waitlist Registration Successful!\nEmail: ${email}\nReceive Updates: ${updates}`);
        waitlistForm.reset();
    });
}

const apiDataContainer = document.getElementById("apiData");
if (apiDataContainer) {
  fetch("https://hn.algolia.com/api/v1/search?query=technology&hitsPerPage=5")
    .then((response) => response.json())
    .then((data) => {
      apiDataContainer.innerHTML = "";

      data.hits.forEach((item) => {
        const card = document.createElement("div");
        card.className = "tech-card";

        // Some HN posts might be comments or lack URLs, so we add fallbacks
        const title = item.title || item.story_title || "Untitled Advancement";
        const url = item.url || item.story_url || "#";
        const author = item.author || "Unknown";
        const points = item.points || 0;

        card.innerHTML = `
    <h3 style="margin-bottom: 8px;">
        <a href="${url}" target="_blank" style="text-decoration: none;">
            ${title}
        </a>
    </h3>
    <p style="font-size: 0.9rem; color: #94a3b8;">
        Posted by <strong>${author}</strong> | ${points} points
    </p>
`;
        apiDataContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      apiDataContainer.innerHTML =
        "<p>Failed to load tech advancements. Please try again later.</p>";
    });
}
