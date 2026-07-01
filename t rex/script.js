const yearNode = document.getElementById("year");
console.log('script loaded');
const loginForm = document.getElementById("login-form");
const loginNameInput = document.getElementById("login-name");
const loginPhoneInput = document.getElementById("login-phone");
const loginPasswordInput = document.getElementById("login-password");
const rememberPasswordInput = document.getElementById("remember-password");
const togglePasswordButton = document.getElementById("toggle-password");
const authLoginBtn = document.getElementById("auth-login");
const authRegisterBtn = document.getElementById("auth-register");
const loginNameField = document.querySelector(".auth-name-field");
const loginCopy = document.getElementById("login-copy");
const otpPanel = document.getElementById("otp-panel");
const otpMessage = document.getElementById("otp-message");
const otpCodeInput = document.getElementById("otp-code");
const verifyOtpBtn = document.getElementById("verify-otp");
const resendOtpBtn = document.getElementById("resend-otp");
const loginStatusNode = document.getElementById("login-status");
const toastNode = document.getElementById("toast");
const loginScreen = document.getElementById("login-screen");
const loginBtn = document.getElementById("login-btn");
const loginSubmitButton = document.getElementById("login-submit");
const logoutBtn = document.getElementById("logout-btn");
const userDisplay = document.getElementById("user-display");
const detailsForm = document.getElementById("details-form-element");
const detailsStatus = document.getElementById("details-status");
const photographerSearchInput = document.getElementById("photographer-search");
const photographerList = document.getElementById("photographer-list-container");
const registeredMembersList = document.getElementById("registered-members-list");
const photographerDetail = document.getElementById("photographer-detail");
const photographerAvatarInput = document.getElementById("photographer-avatar-input");
const photosInput = document.getElementById("photos");
const adminPostForm = document.getElementById("admin-post-form");
const postTextInput = document.getElementById("post-text");
const postMediaInput = document.getElementById("post-media");
const adminFeed = document.getElementById("admin-feed");
const viewProfileTitle = document.getElementById("view-profile-title");
const viewProfileSummary = document.getElementById("view-profile-summary");
const viewProfileMediaHistory = document.getElementById("view-profile-media-history");
const viewProfileFeed = document.getElementById("view-profile-feed");
const backToPhotographersButton = document.getElementById("back-to-photographers");
const adminTab = document.querySelector(".tab-link[data-screen='admin']");
const submitterNameNode = document.getElementById("submitter-name");
const submitterLocationNode = document.getElementById("submitter-location");
const submitterDeviceNode = document.getElementById("submitter-device");
const submitterPackagesNode = document.getElementById("submitter-packages");
const submitterContactNode = document.getElementById("submitter-contact");
const submitterCopy = document.getElementById("submitter-copy");
const viewPhotographersButton = document.getElementById("view-photographers-btn");
const updateDetailsButton = document.getElementById("update-details-btn");
const tabLinks = document.querySelectorAll(".tab-link");
const detailsTab = document.querySelector(".tab-link[data-screen='details']");
const startUpdateButton = document.getElementById("start-update-btn");
const screenLinks = document.querySelectorAll(".screen-link");
const screens = document.querySelectorAll(".interface-screen");
const galleryCards = document.querySelectorAll(".gallery-card");
const galleryFallbacks = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
];

const STORAGE_USERS = "trex-users";
const STORAGE_ACTIVE = "trex-active-user";
const STORAGE_PHOTOGRAPHERS = "trex-photographers";

let authMode = "login";
let pendingRegistration = null;
let currentOtp = null;
let lastSubmitter = null;
let currentPhotographerIndex = 0;
const STORAGE_ADMIN_POSTS = "trex-admin-posts";
let adminPosts = [];
let editingPostId = null;
let editingProfileDetails = false;

let photographers = [
  {
    name: "Asha Menon",
    location: "Kochi",
    device: "Canon EOS R6",
    packages: "Wedding, Portrait",
    contact: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=80",
    summary: "Warm cinematic portraits with a natural storytelling style.",
  },
  {
    name: "Ravi Sharma",
    location: "Jaipur",
    device: "Sony A7 IV",
    packages: "Travel, Event",
    contact: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=320&q=80",
    summary: "Bold travel photography with vibrant colors and motion.",
  },
  {
    name: "Nadia Joseph",
    location: "Bengaluru",
    device: "iPhone 15 Pro",
    packages: "Lifestyle, Social Media",
    contact: "+91 99887 66554",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    summary: "Minimal, modern content that feels authentic and polished.",
  },
];

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const storedPhotographers = getStoredPhotographers();
if (storedPhotographers.length) {
  photographers = storedPhotographers;
} else {
  setStoredPhotographers(photographers);
}
const storedAdminPosts = getStoredAdminPosts();
if (storedAdminPosts.length) {
  adminPosts = storedAdminPosts.map((post) => ({
    ...post,
    photographerIndex: post.photographerIndex ?? 0,
  }));
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || "{}");
  } catch {
    return {};
  }
}

function setStoredUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function getStoredPhotographers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PHOTOGRAPHERS) || "null") || [];
  } catch {
    return [];
  }
}

function setStoredPhotographers(list) {
  localStorage.setItem(STORAGE_PHOTOGRAPHERS, JSON.stringify(list));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function getStoredAdminPosts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ADMIN_POSTS) || "null") || [];
  } catch {
    return [];
  }
}

function setStoredAdminPosts(list) {
  localStorage.setItem(STORAGE_ADMIN_POSTS, JSON.stringify(list));
}

function setActiveUser(phone) {
  localStorage.setItem(STORAGE_ACTIVE, phone);
}

function getActiveUser() {
  return localStorage.getItem(STORAGE_ACTIVE);
}

function clearActiveUser() {
  localStorage.removeItem(STORAGE_ACTIVE);
}

function updateUserDisplay(userName, phone) {
  if (!userDisplay) return;
  if (userName && phone) {
    userDisplay.textContent = `${userName} (${phone})`;
    if (logoutBtn) logoutBtn.removeAttribute("hidden");
    if (loginBtn) loginBtn.setAttribute("hidden", "true");
  } else {
    userDisplay.textContent = "";
    if (logoutBtn) logoutBtn.setAttribute("hidden", "true");
    if (loginBtn) loginBtn.removeAttribute("hidden");
  }
}

function showSite() {
  if (loginScreen) loginScreen.hidden = true;
  if (adminTab) adminTab.classList.remove("hidden");
  updateUserDisplay((currentUser && currentUser.name) || "", (currentUser && currentUser.phone) || "");
  switchScreen("home");
  if (window.location.hash !== "#home") {
    window.location.hash = "#home";
  }
}

function hideOtpPanel() {
  if (!otpPanel) return;
  otpPanel.hidden = true;
  if (otpCodeInput) otpCodeInput.value = "";
  pendingRegistration = null;
  currentOtp = null;
}

function setAuthMode(mode) {
  authMode = mode;
  if (authLoginBtn) authLoginBtn.classList.toggle("active", mode === "login");
  if (authRegisterBtn) authRegisterBtn.classList.toggle("active", mode === "register");
  if (loginNameField) loginNameField.hidden = mode === "login";
  if (loginForm) {
    const submitButton = loginForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.textContent = mode === "login" ? "Continue to login" : "Continue to register";
    }
  }
  if (loginCopy) {
    loginCopy.textContent = mode === "login"
      ? "Existing numbers log in instantly. Enter phone and password."
      : "New numbers register with OTP verification. Enter your details to receive the code.";
  }
  hideOtpPanel();
  setLoginStatus("You must sign in before using the site.", "info");
}

function startOtpVerification(phone) {
  currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
  if (otpPanel) otpPanel.hidden = false;
  if (otpMessage) otpMessage.textContent = `OTP sent to ${phone}. Use code ${currentOtp} to complete registration.`;
  setLoginStatus(`OTP sent to ${phone}.`, "info");
  console.log(`OTP for ${phone}: ${currentOtp}`);
}

function showLogin(message = "You must sign in before using the site.", type = "info") {
  setAuthMode("login");
  if (loginScreen) loginScreen.hidden = false;
  if (adminTab) adminTab.classList.add("hidden");
  if (loginBtn) loginBtn.hidden = true;
  if (logoutBtn) logoutBtn.hidden = true;
  hideOtpPanel();
  if (loginForm) loginForm.reset();
  if (message) setLoginStatus(message, type);
  updateUserDisplay("", "");
}

function setLoginStatus(message, type = "info") {
  if (!loginStatusNode) return;
  loginStatusNode.textContent = message;
  loginStatusNode.className = "auth-status";
  if (type === "success") {
    loginStatusNode.classList.add("success");
  } else if (type === "error") {
    loginStatusNode.classList.add("error");
  }
}

function showToast(message, type = "info") {
  if (!toastNode) return;
  toastNode.textContent = message;
  toastNode.className = `toast ${type}`;
  toastNode.hidden = false;
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    if (toastNode) toastNode.hidden = true;
  }, 3000);
}

let currentUser = null;

const activePhone = getActiveUser();
if (activePhone) {
  const users = getStoredUsers();
  const saved = users[activePhone];
  if (saved) {
    currentUser = { name: saved.name, phone: activePhone };
    showSite();
  }
}

setAuthMode("login");

function switchScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${screenId}`);
  });

  tabLinks.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.screen === screenId);
  });
}

tabLinks.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    if (tab.dataset.screen === "admin") {
      openEditableProfileScreen();
      return;
    }
    switchScreen(tab.dataset.screen);
  });
});

screenLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.dataset.screen === "admin") {
      openEditableProfileScreen();
      return;
    }
    switchScreen(link.dataset.screen);
  });
});

if (startUpdateButton) {
  startUpdateButton.addEventListener("click", () => {
    if (detailsTab) detailsTab.classList.remove("hidden");
  });
}

function handleAuthSubmit(event) {
  if (event) event.preventDefault();

  const name = loginNameInput && loginNameInput.value ? loginNameInput.value.trim() : "";
  const phone = loginPhoneInput && loginPhoneInput.value ? loginPhoneInput.value.trim() : "";
  const password = loginPasswordInput && loginPasswordInput.value ? loginPasswordInput.value : "";
  const rememberPassword = rememberPasswordInput ? rememberPasswordInput.checked : false;

  if (!phone || !password) {
    setLoginStatus("Phone and password are required.", "error");
    return;
  }

  if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
    setLoginStatus("Enter a valid phone number.", "error");
    return;
  }

  const users = getStoredUsers();
  const existingUser = users[phone];

  if (authMode === "login") {
    if (!existingUser) {
      setLoginStatus("Number not registered. Switch to sign up.", "error");
      return;
    }
    if (existingUser.password !== password) {
      setLoginStatus("Incorrect password for this number.", "error");
      return;
    }
    existingUser.rememberPassword = rememberPassword;
    setStoredUsers(users);
    currentUser = { name: existingUser.name, phone };
    renderRegisteredMembers();
    setActiveUser(phone);
    setLoginStatus("Signed in successfully.", "success");
    showToast("Signed in successfully.", "success");
    showSite();
    return;
  }

  if (existingUser) {
    setLoginStatus("Number already registered. Switch to login.", "error");
    return;
  }

  if (!name) {
    setLoginStatus("Name is required for registration.", "error");
    return;
  }

  pendingRegistration = { name, phone, password, rememberPassword };
  startOtpVerification(phone);
}

if (loginForm) {
  loginForm.addEventListener("submit", handleAuthSubmit);
}

if (loginSubmitButton) {
  loginSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleAuthSubmit(event);
  });
}

if (togglePasswordButton) {
  togglePasswordButton.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  togglePasswordButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
  });

  togglePasswordButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!loginPasswordInput) return;
    const isPassword = loginPasswordInput.type === "password";
    loginPasswordInput.type = isPassword ? "text" : "password";
    loginPasswordInput.setAttribute("type", loginPasswordInput.type);
    togglePasswordButton.textContent = isPassword ? "Hide" : "Show";
  });
}

if (authLoginBtn) authLoginBtn.addEventListener("click", () => setAuthMode("login"));
if (authRegisterBtn) authRegisterBtn.addEventListener("click", () => setAuthMode("register"));

if (loginPhoneInput) {
  loginPhoneInput.addEventListener("blur", () => {
    if (authMode !== "login" || !loginPhoneInput || !loginPasswordInput) return;
    const phone = loginPhoneInput.value.trim();
    const users = getStoredUsers();
    const stored = users[phone];
    if (stored && stored.rememberPassword) {
      loginPasswordInput.value = stored.password;
      if (rememberPasswordInput) rememberPasswordInput.checked = true;
    }
  });
}

if (verifyOtpBtn) {
  verifyOtpBtn.addEventListener("click", () => {
    const otp = otpCodeInput && otpCodeInput.value ? otpCodeInput.value.trim() : "";
    if (!pendingRegistration) {
      setLoginStatus("No registration pending. Start sign up again.", "error");
      return;
    }
    if (!otp || otp !== currentOtp) {
      setLoginStatus("OTP is incorrect. Check the code and try again.", "error");
      return;
    }

    const users = getStoredUsers();
    users[pendingRegistration.phone] = {
      name: pendingRegistration.name,
      password: pendingRegistration.password,
      rememberPassword: pendingRegistration.rememberPassword,
    };
    setStoredUsers(users);
    currentUser = { name: pendingRegistration.name, phone: pendingRegistration.phone };
    renderRegisteredMembers();
    setActiveUser(pendingRegistration.phone);
    setLoginStatus("Account created and signed in.", "success");
    showToast("Account created and signed in.", "success");
    hideOtpPanel();
    showSite();
  });
}

if (resendOtpBtn) {
  resendOtpBtn.addEventListener("click", () => {
    if (!pendingRegistration) {
      setLoginStatus("No pending registration to resend OTP.", "error");
      return;
    }
    startOtpVerification(pendingRegistration.phone);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    clearActiveUser();
    currentUser = null;
    showLogin("You have been logged out.", "info");
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    showLogin();
  });
}

function setStatus(message, type = "info") {
  if (!detailsStatus) return;
  detailsStatus.textContent = message;
  detailsStatus.className = "auth-status";
  if (type === "success") {
    detailsStatus.classList.add("success");
  } else if (type === "error") {
    detailsStatus.classList.add("error");
  }
}

function updateSubmitterPage(person) {
  if (!person) return;
  if (submitterNameNode) submitterNameNode.textContent = person.name || "—";
  if (submitterLocationNode) submitterLocationNode.textContent = person.location || "—";
  if (submitterDeviceNode) submitterDeviceNode.textContent = person.device || "Unknown device";
  if (submitterPackagesNode) submitterPackagesNode.textContent = person.packages || "General";
  if (submitterContactNode) submitterContactNode.textContent = person.contact || "—";
  if (submitterCopy) submitterCopy.textContent = `Your submission for ${person.name} is live and now part of the photographer directory.`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSelectedPhotographer() {
  if (currentPhotographerIndex === null || currentPhotographerIndex === undefined) return null;
  return photographers[currentPhotographerIndex] || null;
}

function isCurrentUserProfile(person) {
  if (!person || !currentUser) return false;
  if (person.isOwner === true) {
    return person.ownerPhone ? person.ownerPhone === currentUser.phone : person.name === currentUser.name;
  }
  return false;
}

function openEditableProfileScreen() {
  const ownerIndex = photographers.findIndex((person) => isCurrentUserProfile(person));
  if (ownerIndex >= 0) {
    currentPhotographerIndex = ownerIndex;
    renderPhotographers();
  }
  switchScreen("admin");
  renderProfilePage();
}

function getProfilePosts() {
  return adminPosts.filter((post) => (post.photographerIndex ?? 0) === currentPhotographerIndex);
}

function renderProfileSummary() {
  if (!document.getElementById("profile-summary")) return;
  const person = getSelectedPhotographer();
  const profileTitle = document.getElementById("profile-title");
  if (profileTitle) {
    profileTitle.textContent = person ? `${person.name}'s profile` : "Photographer profile";
  }

  const summaryNode = document.getElementById("profile-summary");
  if (!person) {
    summaryNode.innerHTML = '<p class="auth-status">Choose a photographer from the list to open their profile.</p>';
    return;
  }

  summaryNode.innerHTML = `
    <div class="profile-summary-card">
      <div class="profile-summary-main">
        <div class="profile-summary-avatar-wrap">
          <img class="profile-summary-avatar" src="${person.avatar || 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=320&q=80'}" alt="${escapeHtml(person.name || "Profile picture")}" />
          ${editingProfileDetails ? "" : `<button type="button" id="change-own-avatar-btn" class="btn secondary">Change photo</button>`}
        </div>
        <div>
          ${editingProfileDetails
            ? `
              <div class="profile-edit-form">
                <label for="profile-edit-name">Name</label>
                <input id="profile-edit-name" type="text" value="${escapeHtml(person.name || "")}" />
                <label for="profile-edit-location">Location</label>
                <input id="profile-edit-location" type="text" value="${escapeHtml(person.location || "")}" />
                <label for="profile-edit-device">Device</label>
                <input id="profile-edit-device" type="text" value="${escapeHtml(person.device || "")}" />
                <label for="profile-edit-packages">Packages</label>
                <input id="profile-edit-packages" type="text" value="${escapeHtml(person.packages || "")}" />
                <label for="profile-edit-contact">Contact</label>
                <input id="profile-edit-contact" type="text" value="${escapeHtml(person.contact || "")}" />
                <div class="admin-actions">
                  <button type="button" id="save-profile-btn" class="btn primary">Save</button>
                  <button type="button" id="cancel-profile-edit-btn" class="btn secondary">Cancel</button>
                </div>
              </div>
            `
            : `
              <h3>${escapeHtml(person.name || "")}</h3>
              <p><strong>Location:</strong> ${escapeHtml(person.location || "—")}</p>
              <p><strong>Device:</strong> ${escapeHtml(person.device || "—")}</p>
              <p><strong>Packages:</strong> ${escapeHtml(person.packages || "—")}</p>
              <p><strong>Contact:</strong> ${escapeHtml(person.contact || "—")}</p>
            `}
        </div>
      </div>
      <div class="profile-summary-actions">
        <div class="profile-summary-badge">${escapeHtml(person.location || "Photographer")}</div>
        ${editingProfileDetails
          ? ""
          : `
            <div class="admin-actions">
              <button type="button" id="edit-profile-btn" class="btn secondary">Edit details</button>
              <button type="button" id="delete-profile-btn" class="btn secondary">Delete profile</button>
            </div>
          `}
      </div>
    </div>
  `;
}

function renderProfileMediaHistory() {
  const mediaHistoryNode = document.getElementById("profile-media-history");
  if (!mediaHistoryNode) return;
  const posts = getProfilePosts();
  const mediaItems = posts.flatMap((post) => post.media || []);

  if (!mediaItems.length) {
    mediaHistoryNode.innerHTML = '<p class="auth-status">No photos or videos shared yet.</p>';
    return;
  }

  mediaHistoryNode.innerHTML = mediaItems
    .map((item) => {
      if (item.type.startsWith("video/")) {
        return `<div class="profile-media-card"><video controls class="post-media"><source src="${item.src}" type="${item.type}" />Your browser does not support video.</video></div>`;
      }
      return `<div class="profile-media-card"><img src="${item.src}" alt="Profile media" class="post-media" /></div>`;
    })
    .join("");
}

function renderProfileFeed() {
  if (!adminFeed) return;
  const posts = getProfilePosts();
  if (!posts.length) {
    adminFeed.innerHTML = `<p class="auth-status">No profile posts yet. Share an update above.</p>`;
    return;
  }

  adminFeed.innerHTML = posts
    .slice()
    .reverse()
    .map((post) => {
      const mediaHtml = (post.media || [])
        .map((item) => {
          if (item.type.startsWith("video/")) {
            return `<video controls class="post-media"><source src="${item.src}" type="${item.type}" />Your browser does not support video.</video>`;
          }
          return `<img src="${item.src}" alt="Post media" class="post-media" />`;
        })
        .join("");

      const isEditing = editingPostId === post.id;

      return `
        <article class="post-card">
          <div class="post-header">
            <span class="post-author">${escapeHtml(post.author)}</span>
            <span class="post-time">${new Date(post.timestamp).toLocaleString()}</span>
          </div>
          ${isEditing
            ? `
              <textarea class="edit-post-input" data-post-id="${post.id}">${escapeHtml(post.text || "")}</textarea>
              <div class="admin-actions">
                <button type="button" class="btn primary save-post-btn" data-post-id="${post.id}">Save</button>
                <button type="button" class="btn secondary cancel-edit-btn">Cancel</button>
              </div>
            `
            : `
              <p class="post-text">${escapeHtml(post.text || "")}</p>
              <div class="admin-actions">
                <button type="button" class="btn secondary edit-post-btn" data-post-id="${post.id}">Edit</button>
                <button type="button" class="btn secondary delete-post-btn" data-post-id="${post.id}">Delete</button>
              </div>
            `}
          <div class="post-media-grid">${mediaHtml}</div>
        </article>
      `;
    })
    .join("");
}

function renderViewProfileSummary() {
  if (!viewProfileSummary) return;
  const person = getSelectedPhotographer();
  if (viewProfileTitle) {
    viewProfileTitle.textContent = person ? `${person.name}'s profile` : "Photographer profile";
  }

  if (!person) {
    viewProfileSummary.innerHTML = '<p class="auth-status">Choose a photographer from the list to open their profile.</p>';
    return;
  }

  viewProfileSummary.innerHTML = `
    <div class="profile-summary-card">
      <div>
        <h3>${person.name}</h3>
        <p><strong>Location:</strong> ${person.location || "—"}</p>
        <p><strong>Device:</strong> ${person.device || "—"}</p>
        <p><strong>Packages:</strong> ${person.packages || "—"}</p>
        <p><strong>Contact:</strong> ${person.contact || "—"}</p>
      </div>
      <div class="profile-summary-actions">
        <div class="profile-summary-badge">${person.location || "Photographer"}</div>
      </div>
    </div>
  `;
}

function renderViewProfileMediaHistory() {
  if (!viewProfileMediaHistory) return;
  const posts = getProfilePosts();
  const mediaItems = posts.flatMap((post) => post.media || []);

  if (!mediaItems.length) {
    viewProfileMediaHistory.innerHTML = '<p class="auth-status">No photos or videos shared yet.</p>';
    return;
  }

  viewProfileMediaHistory.innerHTML = mediaItems
    .map((item) => {
      if (item.type.startsWith("video/")) {
        return `<div class="profile-media-card"><video controls class="post-media"><source src="${item.src}" type="${item.type}" />Your browser does not support video.</video></div>`;
      }
      return `<div class="profile-media-card"><img src="${item.src}" alt="Profile media" class="post-media" /></div>`;
    })
    .join("");
}

function renderViewProfileFeed() {
  if (!viewProfileFeed) return;
  const posts = getProfilePosts();
  if (!posts.length) {
    viewProfileFeed.innerHTML = '<p class="auth-status">No profile posts yet.</p>';
    return;
  }

  viewProfileFeed.innerHTML = posts
    .slice()
    .reverse()
    .map((post) => {
      const mediaHtml = (post.media || [])
        .map((item) => {
          if (item.type.startsWith("video/")) {
            return `<video controls class="post-media"><source src="${item.src}" type="${item.type}" />Your browser does not support video.</video>`;
          }
          return `<img src="${item.src}" alt="Post media" class="post-media" />`;
        })
        .join("");

      return `
        <article class="post-card">
          <div class="post-header">
            <span class="post-author">${escapeHtml(post.author)}</span>
            <span class="post-time">${new Date(post.timestamp).toLocaleString()}</span>
          </div>
          <p class="post-text">${escapeHtml(post.text || "")}</p>
          <div class="post-media-grid">${mediaHtml}</div>
        </article>
      `;
    })
    .join("");
}

function renderProfilePage() {
  renderProfileSummary();
  renderProfileMediaHistory();
  renderProfileFeed();
}

function renderViewProfilePage() {
  renderViewProfileSummary();
  renderViewProfileMediaHistory();
  renderViewProfileFeed();
}

function saveProfileDetails() {
  const person = getSelectedPhotographer();
  if (!person) return;

  const nameInput = document.getElementById("profile-edit-name");
  const locationInput = document.getElementById("profile-edit-location");
  const deviceInput = document.getElementById("profile-edit-device");
  const packagesInput = document.getElementById("profile-edit-packages");
  const contactInput = document.getElementById("profile-edit-contact");

  const newName = nameInput ? nameInput.value.trim() : person.name;
  const newLocation = locationInput ? locationInput.value.trim() : person.location;
  const newDevice = deviceInput ? deviceInput.value.trim() : person.device;
  const newPackages = packagesInput ? packagesInput.value.trim() : person.packages;
  const newContact = contactInput ? contactInput.value.trim() : person.contact;

  if (!newName || !newLocation || !newContact) {
    showToast("Please fill in your name, location, and contact.", "error");
    return;
  }

  const previousName = person.name;
  person.name = newName;
  person.location = newLocation;
  person.device = newDevice;
  person.packages = newPackages;
  person.contact = newContact;
  person.summary = `A photographer from ${newLocation} offering ${newPackages} packages.`;

  setStoredPhotographers(photographers);

  adminPosts.forEach((post) => {
    if ((post.photographerIndex ?? 0) === currentPhotographerIndex && post.author === previousName) {
      post.author = newName;
    }
  });
  setStoredAdminPosts(adminPosts);

  if (currentUser) {
    const users = getStoredUsers();
    if (users[currentUser.phone]) {
      users[currentUser.phone].name = newName;
      setStoredUsers(users);
    }
    currentUser.name = newName;
  }

  editingProfileDetails = false;
  renderPhotographers();
  renderProfilePage();
  showToast("Profile details updated.", "success");
}

function deleteCurrentProfile() {
  const person = getSelectedPhotographer();
  if (!person) return;

  const confirmed = window.confirm(`Are you sure you want to delete ${person.name}'s profile?`);
  if (!confirmed) return;

  photographers.splice(currentPhotographerIndex, 1);
  setStoredPhotographers(photographers);
  adminPosts = adminPosts.filter((post) => (post.photographerIndex ?? 0) !== currentPhotographerIndex);
  setStoredAdminPosts(adminPosts);
  currentPhotographerIndex = Math.max(0, currentPhotographerIndex - 1);
  renderPhotographers();
  renderProfilePage();
  photographerDetail.hidden = true;
  photographerDetail.innerHTML = "";
  showToast(`${person.name}'s profile deleted.`, "success");
}

async function readMediaFiles(files) {
  const entries = Array.from(files);
  const readers = entries.map(
    (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            src: reader.result,
          });
        };
        reader.onerror = () => {
          resolve(null);
        };
        reader.readAsDataURL(file);
      })
  );
  const loaded = await Promise.all(readers);
  return loaded.filter(Boolean);
}

if (detailsForm) {
  detailsForm.setAttribute("novalidate", "");

  detailsForm.addEventListener("invalid", (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);

  detailsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const nameInput = document.getElementById("name");
    const locationInput = document.getElementById("location");
    const deviceInput = document.getElementById("device");
    const packagesInput = document.getElementById("packages");
    const contactInput = document.getElementById("details-contact");

    const name = nameInput ? nameInput.value.trim() : "";
    const location = locationInput ? locationInput.value.trim() : "";
    const device = deviceInput ? deviceInput.value.trim() : "";
    const packages = packagesInput ? packagesInput.value.trim() : "";
    const contact = contactInput ? contactInput.value.trim() : "";
    let avatar = "";

    if (photosInput && photosInput.files && photosInput.files.length) {
      const photo = photosInput.files[0];
      if (photo.type.startsWith("image/")) {
        avatar = await readFileAsDataUrl(photo);
      }
    }

    if (!name || !location || !contact) {
      if (detailsStatus) {
        detailsStatus.textContent = "Please fill in your name, location, and contact details.";
        detailsStatus.className = "auth-status error";
      }
      return;
    }

      const newPhotographer = {
      name,
      location,
      device,
      packages,
      contact,
      avatar: avatar || "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=320&q=80",
      summary: `A photographer from ${location} offering ${packages} packages.`,
      isOwner: Boolean(currentUser),
      ownerPhone: currentUser ? currentUser.phone : null,
    };

    photographers.push(newPhotographer);
    setStoredPhotographers(photographers);
    if (photographerSearchInput) photographerSearchInput.value = "";
    renderPhotographers();
    renderFeaturedGallery();

    lastSubmitter = newPhotographer;
    updateSubmitterPage(newPhotographer);
    switchScreen("submitter");

    if (detailsStatus) {
      detailsStatus.textContent = `Thanks ${name}! Your details were submitted and added to the photographers list.`;
      detailsStatus.className = "auth-status success";
    }
    showToast(`Thanks ${name}! Your details were submitted.`, "success");

    detailsForm.reset();
  });
}

function renderFeaturedGallery() {
  galleryCards.forEach((card, index) => {
    const photographerIndex = Number(card.getAttribute("data-photographer-index"));
    const person = photographers[photographerIndex] || photographers[index] || photographers[0] || null;
    const image = card.querySelector("img");
    const title = card.querySelector(".gallery-card-title");
    const copy = card.querySelector(".gallery-card-copy");
    const badge = card.querySelector(".gallery-card-badge");

    if (image) {
      image.src = person?.avatar || galleryFallbacks[index] || galleryFallbacks[0];
      image.alt = person?.name ? `${person.name} portfolio preview` : "Photography portfolio preview";
    }
    if (title) {
      title.textContent = person?.name || "Featured photographer";
    }
    if (copy) {
      copy.textContent = person?.summary || "Explore their details, packages, and portfolio highlights.";
    }
    if (badge) {
      badge.textContent = person?.location ? `${person.location} studio` : "Featured work";
    }

    card.dataset.photographerIndex = String(photographerIndex >= 0 ? photographerIndex : index);
  });
}

function getRegisteredMembers() {
  const users = getStoredUsers();
  return Object.entries(users).map(([phone, user]) => ({
    name: user.name || "Member",
    phone,
    rememberPassword: Boolean(user.rememberPassword),
  }));
}

function renderRegisteredMembers() {
  if (!registeredMembersList) return;

  const members = getRegisteredMembers();
  if (!members.length) {
    registeredMembersList.innerHTML = '<p class="auth-status">No registered accounts yet. Sign up to appear here.</p>';
    return;
  }

  registeredMembersList.innerHTML = members
    .map((member) => `
      <article class="member-card">
        <div>
          <h4>${escapeHtml(member.name)}</h4>
          <p>${escapeHtml(member.phone)}</p>
        </div>
        <span class="member-pill">${member.rememberPassword ? "Saved device" : "Registered"}</span>
      </article>
    `)
    .join("");
}

function renderPhotographers(query = "") {
  if (!photographerList) return;

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? photographers.filter((person) => person.name.toLowerCase().includes(normalized))
    : photographers;

  if (!filtered.length) {
    photographerList.innerHTML = `<p class="auth-status">No photographers found for "${query}".</p>`;
    return;
  }

  photographerList.innerHTML = filtered
    .map((person) => {
      const originalIndex = photographers.indexOf(person);
      const selected = currentPhotographerIndex === originalIndex;
      return `
        <article class="photographer-card ${selected ? "active" : ""}" data-index="${originalIndex}">
          <div class="photographer-avatar">
            <img src="${person.avatar || 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=320&q=80'}" alt="${person.name} profile" />
          </div>
          <div class="photographer-card-content">
            <h3>${person.name}</h3>
            <p><strong>Location:</strong> ${person.location}</p>
            <div class="photographer-card-description ${selected ? "open" : ""}">
              <p>${person.summary}</p>
              <p><strong>Device:</strong> ${person.device || "—"}</p>
              <p><strong>Packages:</strong> ${person.packages || "—"}</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function showPhotographer(index) {
  const person = photographers[index];
  if (!person || !photographerDetail) return;

  currentPhotographerIndex = index;
  renderPhotographers();
  renderFeaturedGallery();

  if (isCurrentUserProfile(person)) {
    switchScreen("admin");
    renderProfilePage();
  } else {
    switchScreen("view-profile");
    renderViewProfilePage();
  }

  photographerDetail.hidden = false;
  const isOwner = isCurrentUserProfile(person);
  const profilePosts = adminPosts.filter((post) => (post.photographerIndex ?? 0) === index);
  const portfolioItems = profilePosts.flatMap((post) => post.media || []);
  const portfolioHtml = portfolioItems.length
    ? portfolioItems
        .map((item) => {
          if (item.type.startsWith("video/")) {
            return `<div class="portfolio-card"><video controls><source src="${item.src}" type="${item.type}" />Your browser does not support video.</video></div>`;
          }
          return `<div class="portfolio-card"><img src="${item.src}" alt="Portfolio preview" /></div>`;
        })
        .join("")
    : '<div class="portfolio-card portfolio-card-empty"><p>Portfolio updates will appear here once this photographer shares more photos.</p></div>';

  photographerDetail.innerHTML = `
    <div class="photographer-detail-shell">
      <div class="photographer-detail-header">
        <img class="photographer-detail-avatar" src="${person.avatar || 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=320&q=80'}" alt="${person.name} profile" />
        <div>
          <h3>${person.name}</h3>
          <p><strong>Location:</strong> ${person.location}</p>
          <p><strong>Contact:</strong> ${person.contact}</p>
        </div>
      </div>
      <div class="detail-stats">
        <div class="detail-stat"><span>Device</span><strong>${person.device || "—"}</strong></div>
        <div class="detail-stat"><span>Packages</span><strong>${person.packages || "—"}</strong></div>
        <div class="detail-stat"><span>Availability</span><strong>Open for booking</strong></div>
      </div>
      <div class="detail-copy">
        <p>${person.summary || "A storyteller capturing meaningful moments with a calm, cinematic approach."}</p>
        <p class="detail-copy-muted">Explore their full profile, recent updates, and contact details below.</p>
      </div>
      <div class="detail-actions">
        ${isOwner ? '<button type="button" id="change-avatar-btn" class="btn secondary">Change profile picture</button>' : ""}
        <button type="button" id="open-profile-btn" class="btn primary">Open full profile</button>
        <button type="button" id="book-session-btn" class="btn secondary">Book session</button>
      </div>
      <div class="detail-portfolio">
        <h4>Portfolio highlights</h4>
        <div class="portfolio-grid">${portfolioHtml}</div>
      </div>
    </div>
  `;
}

renderFeaturedGallery();
renderRegisteredMembers();
renderPhotographers();
renderProfilePage();

if (galleryCards.length) {
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.getAttribute("data-photographer-index"));
      if (!Number.isNaN(index)) {
        showPhotographer(index);
      }
    });
  });
}

if (viewPhotographersButton) {
  viewPhotographersButton.addEventListener("click", () => {
    renderPhotographers();
    switchScreen("photographers");
  });
}

if (updateDetailsButton) {
  updateDetailsButton.addEventListener("click", () => {
    switchScreen("details");
  });
}

if (photographerDetail) {
  photographerDetail.addEventListener("click", (event) => {
    const avatarButton = event.target.closest("#change-avatar-btn");
    if (avatarButton) {
      if (photographerAvatarInput) photographerAvatarInput.click();
      return;
    }

    const profileButton = event.target.closest("#open-profile-btn");
    if (profileButton) {
      const person = getSelectedPhotographer();
      if (person && isCurrentUserProfile(person)) {
        switchScreen("admin");
        renderProfilePage();
      } else {
        switchScreen("view-profile");
        renderViewProfilePage();
      }
      return;
    }

    const bookButton = event.target.closest("#book-session-btn");
    if (bookButton) {
      const person = getSelectedPhotographer();
      showToast(`Contact ${person?.name || "this photographer"} at ${person?.contact || "their listed number"} to book a session.`, "success");
      return;
    }
  });

  photographerDetail.addEventListener("dblclick", () => {
    const person = getSelectedPhotographer();
    if (person && isCurrentUserProfile(person)) {
      switchScreen("admin");
      renderProfilePage();
    } else {
      switchScreen("view-profile");
      renderViewProfilePage();
    }
  });
}

if (document.body) {
  document.body.addEventListener("click", (event) => {
    const changeOwnAvatarButton = event.target.closest("#change-own-avatar-btn");
    if (changeOwnAvatarButton) {
      if (photographerAvatarInput) photographerAvatarInput.click();
      return;
    }

    const editProfileButton = event.target.closest("#edit-profile-btn");
    if (editProfileButton) {
      editingProfileDetails = true;
      renderProfileSummary();
      return;
    }

    const saveProfileButton = event.target.closest("#save-profile-btn");
    if (saveProfileButton) {
      saveProfileDetails();
      return;
    }

    const cancelProfileButton = event.target.closest("#cancel-profile-edit-btn");
    if (cancelProfileButton) {
      editingProfileDetails = false;
      renderProfileSummary();
      return;
    }

    const deleteProfileButton = event.target.closest("#delete-profile-btn");
    if (deleteProfileButton) {
      deleteCurrentProfile();
    }
  });
}

if (photographerAvatarInput) {
  photographerAvatarInput.addEventListener("change", async () => {
    if (!photographerAvatarInput.files || !photographerAvatarInput.files.length) return;
    const file = photographerAvatarInput.files[0];
    if (!file.type.startsWith("image/")) return;

    const avatarSrc = await readFileAsDataUrl(file);
    if (currentPhotographerIndex === null || currentPhotographerIndex === undefined) return;

    const person = photographers[currentPhotographerIndex];
    if (!person || !isCurrentUserProfile(person)) {
      showToast("You can only change your own profile picture.", "error");
      return;
    }

    person.avatar = avatarSrc;
    setStoredPhotographers(photographers);
    renderPhotographers();
    showPhotographer(currentPhotographerIndex);
    showToast("Profile picture updated.", "success");
  });
}

if (adminPostForm) {
  adminPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const person = getSelectedPhotographer();
    if (!person) {
      showToast("Choose a photographer first.", "error");
      return;
    }

    const text = postTextInput ? postTextInput.value.trim() : "";
    const media = postMediaInput && postMediaInput.files ? await readMediaFiles(postMediaInput.files) : [];

    if (!text && !media.length) {
      showToast("Please add a message or media before posting.", "error");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      photographerIndex: currentPhotographerIndex,
      author: person.name,
      timestamp: Date.now(),
      text,
      media,
      edited: false,
    };

    adminPosts.push(newPost);
    setStoredAdminPosts(adminPosts);
    renderProfilePage();
    showToast("Your update was posted.", "success");

    if (postTextInput) postTextInput.value = "";
    if (postMediaInput) postMediaInput.value = "";
  });
}

const clearMediaButton = document.getElementById("clear-media");
if (clearMediaButton) {
  clearMediaButton.addEventListener("click", () => {
    if (postMediaInput) postMediaInput.value = "";
  });
}

if (backToPhotographersButton) {
  backToPhotographersButton.addEventListener("click", () => {
    switchScreen("photographers");
  });
}

if (photographerSearchInput) {
  photographerSearchInput.addEventListener("input", () => {
    renderPhotographers(photographerSearchInput.value);
  });
}

if (photographerList) {
  photographerList.addEventListener("click", (event) => {
    const card = event.target.closest(".photographer-card");
    if (!card) return;
    const index = Number(card.getAttribute("data-index"));
    showPhotographer(index);
  });

  photographerList.addEventListener("dblclick", (event) => {
    const card = event.target.closest(".photographer-card");
    if (!card) return;
    const index = Number(card.getAttribute("data-index"));
    showPhotographer(index);
  });
}

if (adminFeed) {
  adminFeed.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit-post-btn");
    if (editButton) {
      editingPostId = editButton.dataset.postId;
      renderProfileFeed();
      return;
    }

    const saveButton = event.target.closest(".save-post-btn");
    if (saveButton) {
      const postId = saveButton.dataset.postId;
      const textarea = adminFeed.querySelector(`.edit-post-input[data-post-id="${postId}"]`);
      const newText = textarea ? textarea.value.trim() : "";
      const post = adminPosts.find((item) => item.id === postId);
      if (post) {
        post.text = newText;
        post.edited = true;
        setStoredAdminPosts(adminPosts);
        editingPostId = null;
        renderProfileFeed();
        renderProfileMediaHistory();
        showToast("Post updated.", "success");
      }
      return;
    }

    const cancelButton = event.target.closest(".cancel-edit-btn");
    if (cancelButton) {
      editingPostId = null;
      renderProfileFeed();
      return;
    }

    const deleteButton = event.target.closest(".delete-post-btn");
    if (deleteButton) {
      const postId = deleteButton.dataset.postId;
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (confirmed) {
        adminPosts = adminPosts.filter((item) => item.id !== postId);
        setStoredAdminPosts(adminPosts);
        editingPostId = null;
        renderProfilePage();
        showToast("Post deleted.", "success");
      }
    }
  });
}
