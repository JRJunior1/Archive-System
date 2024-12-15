const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");

let collapsedSidebarHeight = "52px"; // Height in mobile view (collapsed)
let fullSidebarHeight = "calc(100vh - 52px)"; // Height in larger screens

// Function to toggle sidebar's collapsed state
menuToggler.addEventListener("click", () => {
  sidebar.classList.toggle("menu-active");
  sidebar.style.height = sidebar.classList.contains("menu-active")
    ? `${sidebar.scrollHeight}px`
    : collapsedSidebarHeight;
  menuToggler.querySelector("span").innerText = sidebar.classList.contains(
    "menu-active"
  )
    ? "close"
    : "menu";
});

// Adjust sidebar height on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    sidebar.style.height = fullSidebarHeight;
  } else {
    sidebar.style.height = "auto";
  }
});

// Switch to specific sections
function switchToSection(sectionId) {
  document.querySelectorAll(".main-content").forEach((section) => {
    section.style.display = "none";
  });
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) selectedSection.style.display = "block";
}

// Navigation click handlers
document.getElementById("nav-dashboard").addEventListener("click", (e) => {
  e.preventDefault();
  switchToSection("dashboard-section");
});
document.getElementById("nav-notifications").addEventListener("click", (e) => {
  e.preventDefault();
  switchToSection("notifications-section");
});
document.getElementById("nav-profile").addEventListener("click", (e) => {
  e.preventDefault();
  switchToSection("profile-section");
});
document.getElementById("nav-settings").addEventListener("click", (e) => {
  e.preventDefault();
  switchToSection("settings-section");
});

// Function to Update Profile Section with Additional Fields
function updateProfile(username, password, email, phone, role, joinedDate) {
  document.getElementById("profile-username").textContent =
    username || "Not Set";
  document.getElementById("profile-password").textContent = password
    ? "********"
    : "Not Set";
  document.getElementById("profile-password").dataset.password = password; // Store original password
  document.getElementById("profile-email").textContent = email || "Not Set";
  document.getElementById("profile-phone").textContent = phone || "Not Set";
  document.getElementById("profile-role").textContent = role || "Not Set";
  document.getElementById("profile-joined-date").textContent =
    joinedDate || "Not Set";
}

// Profile Navigation Click Event to show the profile section
document.getElementById("nav-profile").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default link behavior
  switchToSection("profile-section"); // Show Profile section
});

// Toggle Password Visibility in Profile Section
document.getElementById("toggle-password-btn").addEventListener("click", () => {
  const passwordElement = document.getElementById("profile-password");
  const button = document.getElementById("toggle-password-btn");
  const isHidden = passwordElement.classList.contains("password-hidden");

  if (isHidden) {
    passwordElement.textContent = passwordElement.dataset.password; // Show actual password
    passwordElement.classList.remove("password-hidden");
    button.textContent = "Hide"; // Update button label
  } else {
    passwordElement.textContent = "********"; // Hide password
    passwordElement.classList.add("password-hidden");
    button.textContent = "Show"; // Update button label
  }
});

// Update Profile When Settings Are Saved (assuming form elements are available)
document.getElementById("settings-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get inputs from Settings form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const role = document.getElementById("role").value;
  const joinedDate = document.getElementById("joined-date").value;

  // Update Profile section
  updateProfile(username, password, email, phone, role, joinedDate);

  // Store the settings data in localStorage
  localStorage.setItem("username", username);
  localStorage.setItem("password", password); // Be cautious with storing sensitive data like password
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("role", role);
  localStorage.setItem("joinedDate", joinedDate);

  alert("Settings Saved and Profile Updated!");
});

// Load Profile Data from Local Storage when the page is loaded
window.addEventListener("load", () => {
  const username = localStorage.getItem("username") || "Not Set";
  const password = localStorage.getItem("password") || "Not Set";
  const email = localStorage.getItem("email") || "Not Set";
  const phone = localStorage.getItem("phone") || "Not Set";
  const role = localStorage.getItem("role") || "Not Set";
  const joinedDate = localStorage.getItem("joinedDate") || "Not Set";

  // Populate the profile section with data
  updateProfile(username, password, email, phone, role, joinedDate);
});

// Function to switch to the given section
function switchToSection(sectionId) {
  const sections = document.querySelectorAll(".main-content");
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });
}

// Show login modal when user clicks logout
document
  .getElementById("nav-logout")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior (page reload)

    // Apply blur effect to the background
    document.body.classList.add("blur-background");

    // Hide the dashboard section and show login modal
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("login-modal").style.display = "flex";

    // Clear any previous login errors
    document.getElementById("login-error").style.display = "none";
  });

// Login functionality
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the entered username and password
    const enteredUsername = document.getElementById("login-username").value;
    const enteredPassword = document.getElementById("login-password").value;

    // Retrieve stored credentials (saved when user logged out previously)
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check if the entered credentials match the stored credentials
    if (
      enteredUsername === storedUsername &&
      enteredPassword === storedPassword
    ) {
      // Credentials are correct, login successful
      localStorage.setItem("isLoggedIn", "true"); // Set a flag that the user is logged in

      // Hide login modal and remove blur effect from the background
      document.getElementById("login-modal").style.display = "none";
      document.body.classList.remove("blur-background");

      // Show dashboard section
      document.getElementById("dashboard-section").style.display = "block";
    } else {
      // Credentials are incorrect, show error message
      document.getElementById("login-error").style.display = "block";
    }
  });

// Select the elements related to file upload
const fileInput = document.getElementById("file-input");
const fileNameInput = document.getElementById("file-name-input");
const uploadButton = document.getElementById("upload-button");
const fileList = document.getElementById("file-list");

let totalProjects = 0;
const departments = [
  "Computer Science",
  "Cyber Security",
  "Information Technology",
  "Software Engineering",
  "Computer Engineering",
  "Business Administration",
];
let departmentAssignments = {
  "Computer Science": 0,
  "Cyber Security": 0,
  "Information Technology": 0,
  "Software Engineering": 0,
  "Computer Engineering": 0,
  "Business Administration": 0,
};

// Function to generate a random department
function getRandomDepartment() {
  const unassignedDepartments = departments.filter(
    (department) => departmentAssignments[department] === 0
  );

  if (unassignedDepartments.length > 0) {
    const department =
      unassignedDepartments[
        Math.floor(Math.random() * unassignedDepartments.length)
      ];
    departmentAssignments[department]++;
    return department;
  } else {
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    departmentAssignments[department]++;
    return department;
  }
}

// Function to update the file list based on search query
function filterFiles(query) {
  const fileList = document.getElementById("file-list");
  const files = fileList.getElementsByTagName("li");
  Array.from(files).forEach((fileItem) => {
    const fileName = fileItem.textContent.toLowerCase();
    if (fileName.includes(query.toLowerCase())) {
      fileItem.style.display = "block";
    } else {
      fileItem.style.display = "none";
    }
  });
}

// Event listener for the upload button
document.getElementById("upload-button").addEventListener("click", () => {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0]; // Get the selected file
  const customFileName = document
    .getElementById("file-name-input")
    .value.trim(); // Get the custom file name

  if (file) {
    const fileExtension = file.name.split(".").pop();
    const baseName = customFileName
      ? customFileName
      : file.name.replace(`.${fileExtension}`, "");
    const fileNameWithExtension = `${baseName}.${fileExtension}`;

    const departmentSelect = prompt(
      `Select a department to upload the file:\n1. Computer Science\n2. Cyber Security\n3. Information Technology\n4. Software Engineering\n5. Computer Engineering\n6. Business Administration`
    );

    const departmentIndex = parseInt(departmentSelect) - 1;

    if (departmentIndex >= 0 && departmentIndex < departments.length) {
      const selectedDepartment = departments[departmentIndex];

      totalProjects++;

      document.querySelector(
        ".total-project"
      ).textContent = `Total Projects: ${totalProjects}`;
      document.querySelector(
        ".latest-submission"
      ).textContent = `Latest Submission: ${fileNameWithExtension}`;
      document.querySelector(
        ".departments"
      ).textContent = `Assigned Department: ${selectedDepartment}`;

      // Add the uploaded file to the list with the new name
      const fileList = document.getElementById("file-list");
      const listItem = document.createElement("li");
      const fileLink = document.createElement("a");
      fileLink.href = URL.createObjectURL(file);
      fileLink.textContent = fileNameWithExtension;
      fileLink.target = "_blank";
      listItem.appendChild(fileLink);
      fileList.appendChild(listItem);

      // Clear the file input and custom name input
      fileInput.value = "";
      document.getElementById("file-name-input").value = "";
    } else {
      alert("Invalid department selection. Please try again.");
    }
  } else {
    alert("Please select a file to upload.");
  }
});

// Event listener for the search input
document.querySelector(".search-bar").addEventListener("input", (e) => {
  const searchQuery = e.target.value;
  filterFiles(searchQuery);
});

/// Select all close buttons in the notification container
const closeButtons = document.querySelectorAll(".close-btn");
const notificationsList = document.querySelector(".notifications-list");
const noNotificationsMessage = document.querySelector(".no-notifications");

// Function to update the visibility of the "No Notifications" message
function checkIfNoNotifications() {
  // If no notifications are left, show the "No Notifications" message
  if (notificationsList.children.length === 0) {
    noNotificationsMessage.style.display = "block";
  } else {
    noNotificationsMessage.style.display = "none";
  }
}

// Add an event listener to each close button
closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Get the parent notification element
    const notification = this.closest(".notification");
    // Remove the notification from the DOM
    notification.remove();

    // Check if there are no notifications left
    checkIfNoNotifications();
  });
});

// Initial check when the page loads
checkIfNoNotifications();
