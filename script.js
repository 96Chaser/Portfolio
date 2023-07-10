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
