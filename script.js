// Function to handle the click event on the dropdown button
function handleDropdownClick() {
  var dropdownContent = this.nextElementSibling;
  dropdownContent.classList.toggle("show");
}

// Function to handle the click event outside the dropdown content
function handleOutsideDropdownClick(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  }
}

// Add event listeners to the dropdown buttons
var dropdownButtons = document.getElementsByClassName("dropbtn");
for (var i = 0; i < dropdownButtons.length; i++) {
  var dropdownButton = dropdownButtons[i];
  dropdownButton.addEventListener("click", handleDropdownClick);
}

// Add event listener to handle click outside dropdown content
window.addEventListener("click", handleOutsideDropdownClick);

// Function to show a specific section
function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// Form validation and AJAX submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var reason = document.getElementById('reason').value;
  var company = document.getElementById('company').value;

  if (name && email && reason) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'contact.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('form-response').innerText = xhr.responseText;
      }
    };

    xhr.send('name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&reason=' + encodeURIComponent(reason) + '&company=' + encodeURIComponent(company));
  } else {
    document.getElementById('form-response').innerText = 'Please fill out all required fields.';
  }
});

