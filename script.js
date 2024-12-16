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

// Function to switch to the given section
function switchToSection(sectionId) {
  document.querySelectorAll(".main-content").forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  // Hide the settings section when switching away from it
  if (sectionId !== "settings-section") {
    const settingsSection = document.getElementById("settings-section");
    if (settingsSection) {
      settingsSection.style.display = "none";
    }
  }
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

document.getElementById("nav-folders").addEventListener("click", (e) => {
  e.preventDefault();
  switchToSection("folders-section");
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

// Event listener for deleting a file from the list
fileList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-file-btn")) {
    const fileItem = e.target.closest("li");
    fileItem.remove(); // Remove the file from the DOM
    alert("File deleted successfully!");

    // Update the total number of projects
    totalProjects--;
    document.querySelector(
      ".total-project"
    ).textContent = `Total Projects: ${totalProjects}`;

    // Reset the latest submission and assigned department if no files are left
    if (fileList.children.length === 0) {
      document.querySelector(".latest-submission").textContent =
        "Latest Submission: None";
      document.querySelector(".departments").textContent =
        "Assigned Department: None";
    }
  }
});

// Updated code to include a delete button when adding files to the list
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
      "Select a department to upload the file:\n1. Computer Science\n2. Cyber Security\n3. Information Technology\n4. Software Engineering\n5. Computer Engineering\n6. Business Administration"
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
      const listItem = document.createElement("li");
      const fileLink = document.createElement("a");
      const deleteButton = document.createElement("button");

      fileLink.href = URL.createObjectURL(file);
      fileLink.textContent = fileNameWithExtension;
      fileLink.target = "_blank";

      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-file-btn");

      listItem.appendChild(fileLink);
      listItem.appendChild(deleteButton);
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

// Select elements for the folder section
const createFolderBtn = document.getElementById("create-folder-btn");
const folderListContainer = document.getElementById("folder-list-container");
document.getElementById("create-folder-btn").textContent = "New Folder";

// Function to create a folder and update UI
function createFolder() {
  const folderName = prompt("Enter folder name:");
  if (folderName) {
    const folderId = `folder-${Date.now()}`; // Use timestamp for unique folder ID
    const folderItem = document.createElement("li");
    folderItem.classList.add("folder-item");
    folderItem.id = folderId;
    folderItem.innerHTML = `
      <div class="folder-header">
        <span>${folderName}</span>
        <button class="open-folder-btn">Open</button>
        <button class="delete-folder-btn">Delete</button>
      </div>
      <div class="folder-content" id="folder-content-${folderId}" style="display: none;">
        <div class="file-upload-container">
          <input type="file" id="file-input-${folderId}" />
          <input type="text" id="file-name-input-${folderId}" placeholder="Enter custom file name" />
          <button id="upload-button-${folderId}">Upload File</button>
        </div>
        <ul id="file-list-${folderId}" class="file-list">
          <!-- Files will be dynamically added here -->
        </ul>
      </div>
    `;

    folderListContainer.appendChild(folderItem);

    // Event listener for opening the folder
    folderItem
      .querySelector(".open-folder-btn")
      .addEventListener("click", () => toggleFolder(folderId));

    // Event listener for deleting the folder
    folderItem
      .querySelector(".delete-folder-btn")
      .addEventListener("click", () => deleteFolder(folderId));

    alert("Folder created successfully!");
  }
}

// Function to toggle folder visibility and change button text
function toggleFolder(folderId) {
  const folderContent = document.getElementById(`folder-content-${folderId}`);
  const openFolderBtn = document.querySelector(`#${folderId} .open-folder-btn`);

  // Toggle the display of folder content (show/hide)
  if (folderContent.style.display === "none") {
    folderContent.style.display = "block";
    openFolderBtn.textContent = "Close"; // Change button text to 'Close' when folder is open
  } else {
    folderContent.style.display = "none";
    openFolderBtn.textContent = "Open"; // Change button text back to 'Open' when folder is closed
  }

  // Add the event listener for the file upload button
  const fileInput = document.getElementById(`file-input-${folderId}`);
  const fileNameInput = document.getElementById(`file-name-input-${folderId}`);
  const uploadButton = document.getElementById(`upload-button-${folderId}`);

  uploadButton.addEventListener("click", () =>
    uploadFile(folderId, fileInput, fileNameInput)
  );
}

// Function to upload a file to a folder
function uploadFile(folderId, fileInput, fileNameInput) {
  const file = fileInput.files[0];
  const customFileName = fileNameInput.value.trim();
  if (file) {
    const fileExtension = file.name.split(".").pop();
    const baseName = customFileName
      ? customFileName
      : file.name.replace(`.${fileExtension}`, "");
    const fileNameWithExtension = `${baseName}.${fileExtension}`;

    // Create the file list item with a delete button
    const fileList = document.getElementById(`file-list-${folderId}`);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <a href="${URL.createObjectURL(
        file
      )}" target="_blank">${fileNameWithExtension}</a>
      <button class="delete-file-btn">Delete</button>
    `;
    fileList.appendChild(listItem);

    // Add event listener for deleting the file
    listItem
      .querySelector(".delete-file-btn")
      .addEventListener("click", () => deleteFile(listItem));

    // Clear the file inputs
    fileInput.value = "";
    fileNameInput.value = "";
  } else {
    alert("Please select a file to upload.");
  }
}

// Function to delete a folder
function deleteFolder(folderId) {
  const folderItem = document.getElementById(folderId);
  folderItem.remove();
  alert("Folder deleted successfully!");
}

// Function to delete a file from the folder
function deleteFile(fileItem) {
  fileItem.remove();
  alert("File deleted successfully!");
}

// Event listener for creating a new folder
createFolderBtn.addEventListener("click", createFolder);
