/* =========================
   SPA NAV (hash-based)
   ========================= */

function setActive(id) {
  var sections = document.querySelectorAll('section');
  for (var i = 0; i < sections.length; i++) sections[i].classList.remove('active');

  var el = document.getElementById(id) || document.getElementById('home');
  if (el) el.classList.add('active');
}

function handleHash() {
  var id = (location.hash || '#home').slice(1);
  setActive(id);
}

// Run once on load, and whenever the URL hash changes
window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);

// Backward-compat: if your HTML still calls onclick="showSection('...')"
// this updates the URL hash (which triggers handleHash)
function showSection(id) {
  location.hash = '#' + id;
}
window.showSection = showSection;


/* =========================
   CONTACT FORM (AJAX + autosave)
   ========================= */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var out = document.getElementById('form-response');
  var KEY = 'contactForm'; // session-only persistence

  // Restore saved values (name, email, reason, company, message)
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || '{}');
    ['name','email','reason','company','message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && saved[id]) el.value = saved[id];
    });
  } catch (e) {}

  // Save on any input
  form.addEventListener('input', function () {
    var data = {};
    ['name','email','reason','company','message'].forEach(function (id) {
      var el = document.getElementById(id);
      data[id] = el ? (el.value || '') : '';
    });
    sessionStorage.setItem(KEY, JSON.stringify(data));
  });

  // AJAX submit
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name    = (document.getElementById('name')    || {}).value || '';
    var email   = (document.getElementById('email')   || {}).value || '';
    var reason  = (document.getElementById('reason')  || {}).value || '';
    var company = (document.getElementById('company') || {}).value || '';
    var message = (document.getElementById('message') || {}).value || '';
    var website = (document.getElementById('website') || {}).value || ''; // honeypot (optional)

    if (!name.trim() || !email.trim() || !reason.trim() || !message.trim()) {
      if (out) out.textContent = 'Please fill out all required fields.';
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'contact.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (out) {
          out.textContent = (xhr.status === 200)
            ? xhr.responseText
            : 'Sorry, there was an error sending your message.';
        }
        if (xhr.status === 200) sessionStorage.removeItem(KEY); // clear autosave on success
      }
    };

    var params =
      'name='    + encodeURIComponent(name) +
      '&email='  + encodeURIComponent(email) +
      '&reason=' + encodeURIComponent(reason) +
      '&company='+ encodeURIComponent(company) +
      '&message='+ encodeURIComponent(message) +
      '&website='+ encodeURIComponent(website);

    xhr.send(params);
  });

  // Clear autosave on reset
  form.addEventListener('reset', function () {
    sessionStorage.removeItem(KEY);
  });
});


/* =========================
   NOTE: No dropdown JS.
   Keep hover-only in CSS:
   .dropdown:hover .dropdown-content { display:block; }
   ========================= */
