// Validation Rules
const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email format",
  },
  name: {
    pattern: /^[a-zA-Z\s'-]+$/,
    message: "Name can only contain letters, spaces, hyphens, and apostrophes",
  },
  phoneNumber: {
    pattern: /^\d{11}$/,
    message: "Phone number must be exactly 11 digits",
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{5,}$/,
    message: "Password must have uppercase, lowercase, number, special symbol, and be 5+ characters",
  },
}

// Utility function to show messages
function showMessage(element, message, type) {
  if (!element || !element.nextElementSibling) return
  const messageEl = element.nextElementSibling
  if (messageEl && messageEl.classList.contains("validation-message")) {
    messageEl.textContent = message
    messageEl.className = `validation-message ${type}`

    if (type === "error") {
      element.classList.add("is-invalid")
      element.classList.remove("is-valid")
    } else if (type === "success") {
      element.classList.add("is-valid")
      element.classList.remove("is-invalid")
    }
  }
}

function clearMessage(element) {
  if (!element || !element.nextElementSibling) return
  const messageEl = element.nextElementSibling
  if (messageEl && messageEl.classList.contains("validation-message")) {
    messageEl.textContent = ""
    messageEl.className = "validation-message"
    element.classList.remove("is-invalid", "is-valid")
  }
}

// Validation functions
function validateEmail(email) {
  return validationRules.email.pattern.test(email)
}

function validateName(name) {
  return validationRules.name.pattern.test(name) && name.trim().length > 0
}

function validatePhoneNumber(phone) {
  const digitsOnly = phone.replace(/\D/g, "")
  return digitsOnly.length === 11
}

function validatePassword(password) {
  return validationRules.password.pattern.test(password)
}

function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword && password.length > 0
}

// Password strength checker
function checkPasswordStrength(password) {
  const strengthFill = document.querySelector(".strength-fill")
  if (!strengthFill) return

  if (!password) {
    strengthFill.style.width = "0%"
    return
  }

  let strength = 0
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++
  if (password.length >= 8) strength++

  const percentage = (strength / 5) * 100
  strengthFill.style.width = percentage + "%"

  if (strength <= 2) {
    strengthFill.style.backgroundColor = "#dc3545"
  } else if (strength <= 3) {
    strengthFill.style.backgroundColor = "#ffc107"
  } else {
    strengthFill.style.backgroundColor = "#198754"
  }
}

// Show alert message
function showAlert(containerId, message, type) {
  const alertEl = document.getElementById(containerId)
  if (!alertEl) return

  alertEl.className = `alert alert-message show alert-${type}`
  alertEl.textContent = message
  alertEl.style.display = "block"

  setTimeout(() => {
    alertEl.classList.remove("show")
    alertEl.style.display = "none"
  }, 5000)
}

// Admin Dashboard Data
const adminProfile = {
  name: "Admin User",
  email: "admin@example.com",
  role: "System Administrator",
  phone: "+1 (555) 000-0000",
  employeeId: "ADM-001",
}

const bins = [
  {
    id: "BIN-001",
    location: "Main Street - Corner Store",
    type: "General",
    status: "full",
    lastEmptied: "2 hours ago",
    capacity: "95%",
    assignedTo: "John Doe",
  },
  {
    id: "BIN-002",
    location: "Park Avenue - Central Park",
    type: "Recyclable",
    status: "empty",
    lastEmptied: "30 mins ago",
    capacity: "10%",
    assignedTo: "Jane Smith",
  },
  {
    id: "BIN-003",
    location: "Downtown - Market Square",
    type: "Organic",
    status: "needs_attention",
    lastEmptied: "5 hours ago",
    capacity: "80%",
    assignedTo: "Bob Johnson",
  },
]

const janitors = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567", bins: 5, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 (555) 234-5678", bins: 4, status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 (555) 345-6789", bins: 6, status: "inactive" },
]

const notifications = [
  {
    id: 1,
    type: "critical",
    message: "Bin BIN-001 is FULL - Immediate action required",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    message: "Bin BIN-003 capacity at 80% - Schedule emptying soon",
    time: "5 mins ago",
    read: false,
  },
  { id: 3, type: "info", message: "Bin BIN-002 emptied successfully", time: "30 mins ago", read: true },
]

const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Admin] DOM Content Loaded - Initializing dashboard")
  initializeSidebar()
  initializeButtons()
  loadDashboardData()
  loadBinsTable()
  loadJanitorsTable()
  loadNotifications()
  updateNotificationCount()
  console.log("[Admin] Dashboard initialization complete")
})

function initializeSidebar() {
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  console.log("[Admin] Initializing sidebar with", sidebarItems.length, "items")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      sidebarItems.forEach((i) => i.classList.remove("active"))
      this.classList.add("active")

      const section = this.getAttribute("data-section")
      console.log("[Admin] Sidebar clicked - showing section:", section)

      const sectionId = section.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      const sectionElement = document.getElementById(`${sectionId}Section`)

      document.querySelectorAll(".content-section").forEach((s) => {
        s.style.display = "none"
      })

      if (sectionElement) {
        sectionElement.style.display = "block"
        console.log("[Admin] Section displayed:", section)

        if (section === "bins") {
          loadBinsTable()
        } else if (section === "janitors") {
          loadJanitorsTable()
        } else if (section === "notifications") {
          loadNotificationsTable()
        }
      } else {
        console.error("[Admin] Section element not found:", `${sectionId}Section`)
      }
    })
  })
}

function initializeButtons() {
  // Notifications button
  const notificationsBtn = document.getElementById("notificationsBtn")
  if (notificationsBtn) {
    notificationsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openNotificationsModal()
    })
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      handleLogout()
    })
  }

  // Search inputs
  const searchBinsInput = document.getElementById("searchBinsInput")
  if (searchBinsInput) {
    searchBinsInput.addEventListener("input", function () {
      filterBinsTable(this.value)
    })
  }

  const searchJanitorsInput = document.getElementById("searchJanitorsInput")
  if (searchJanitorsInput) {
    searchJanitorsInput.addEventListener("input", function () {
      filterJanitorsTable(this.value)
    })
  }

  // Bin filter dropdown
  const filterBinsItems = document.querySelectorAll("#filterBinsDropdown ~ .dropdown-menu a")
  filterBinsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      filterBinsByStatus(filter)
    })
  })

  // Janitor filter dropdown
  const filterJanitorsItems = document.querySelectorAll("#filterJanitorsDropdown ~ .dropdown-menu a")
  filterJanitorsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      filterJanitorsByStatus(filter)
    })
  })

  // Notification filter dropdown
  const filterNotificationsItems = document.querySelectorAll("#filterNotificationsDropdown ~ .dropdown-menu a")
  filterNotificationsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      filterNotificationsByType(filter)
    })
  })

  // Alert sound switch
  const alertSoundSwitch = document.getElementById("alertSoundSwitch")
  if (alertSoundSwitch) {
    alertSoundSwitch.addEventListener("change", function () {
      const status = this.checked ? "enabled" : "disabled"
      console.log(`Alert sound ${status}`)
    })
  }

  // Mark all read button
  const markAllReadBtn = document.getElementById("markAllReadBtn")
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      markAllNotificationsRead()
    })
  }

  // Clear notifications button
  const clearNotificationsBtn = document.getElementById("clearNotificationsBtn")
  if (clearNotificationsBtn) {
    clearNotificationsBtn.addEventListener("click", () => {
      clearAllNotifications()
    })
  }

  // Password toggle buttons
  const passwordToggleBtns = document.querySelectorAll(".password-toggle-btn")
  passwordToggleBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("data-target")
      const passwordInput = document.querySelector(targetId)
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Profile forms
  const personalInfoForm = document.getElementById("personalInfoForm")
  if (personalInfoForm) {
    setupPersonalInfoForm(personalInfoForm)
  }

  const changePasswordForm = document.getElementById("changePasswordForm")
  if (changePasswordForm) {
    setupChangePasswordForm(changePasswordForm)
  }

  // Profile photo upload
  const changePhotoBtn = document.getElementById("changePhotoBtn")
  const photoInput = document.getElementById("photoInput")
  const photoMessage = document.getElementById("photoMessage")
  const profileImg = document.getElementById("profileImg")

  if (changePhotoBtn && photoInput) {
    changePhotoBtn.addEventListener("click", () => photoInput.click())

    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (!file) return

      const allowedTypes = ["image/png", "image/jpeg"]
      const allowedExtensions = ["png", "jpg", "jpeg"]
      const fileExtension = file.name.split(".").pop().toLowerCase()

      if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension)) {
        if (photoMessage) {
          photoMessage.textContent = "Only PNG, JPG, and JPEG files are allowed"
          photoMessage.className = "validation-message error"
        }
        photoInput.value = ""
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        if (photoMessage) {
          photoMessage.textContent = "File size must be less than 5MB"
          photoMessage.className = "validation-message error"
        }
        photoInput.value = ""
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (profileImg) profileImg.src = event.target.result
        if (photoMessage) {
          photoMessage.textContent = "Photo updated successfully!"
          photoMessage.className = "validation-message success"
        }
        setTimeout(() => {
          if (photoMessage) {
            photoMessage.className = "validation-message"
            photoMessage.textContent = ""
          }
        }, 3000)
      }
      reader.readAsDataURL(file)
    })
  }

  // Profile tab switching
  initializeProfileTabs()
}

function initializeProfileTabs() {
  const profileMenuItems = document.querySelectorAll(".profile-menu-item")

  profileMenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      // Remove active class from all menu items
      profileMenuItems.forEach((menuItem) => {
        menuItem.classList.remove("active")
      })

      // Add active class to clicked item
      this.classList.add("active")

      // Hide all tab panes
      const tabPanes = document.querySelectorAll(".tab-pane")
      tabPanes.forEach((pane) => {
        pane.classList.remove("show", "active")
      })

      // Show the target tab pane
      const targetPane = document.querySelector(targetId)
      if (targetPane) {
        targetPane.classList.add("show", "active")
      }
    })
  })
}

function setupPersonalInfoForm(form) {
  const firstNameInput = document.getElementById("firstName")
  const lastNameInput = document.getElementById("lastName")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phoneNumber")

  // Add validation on blur
  if (firstNameInput) {
    firstNameInput.addEventListener("blur", () => {
      if (firstNameInput.value.trim()) {
        if (validateName(firstNameInput.value)) {
          showMessage(firstNameInput, "Valid name", "success")
        } else {
          showMessage(firstNameInput, validationRules.name.message, "error")
        }
      } else {
        clearMessage(firstNameInput)
      }
    })
  }

  if (lastNameInput) {
    lastNameInput.addEventListener("blur", () => {
      if (lastNameInput.value.trim()) {
        if (validateName(lastNameInput.value)) {
          showMessage(lastNameInput, "Valid name", "success")
        } else {
          showMessage(lastNameInput, validationRules.name.message, "error")
        }
      } else {
        clearMessage(lastNameInput)
      }
    })
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value.trim()) {
        if (validateEmail(emailInput.value)) {
          showMessage(emailInput, "Valid email", "success")
        } else {
          showMessage(emailInput, validationRules.email.message, "error")
        }
      } else {
        clearMessage(emailInput)
      }
    })
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      if (phoneInput.value.trim()) {
        if (validatePhoneNumber(phoneInput.value)) {
          showMessage(phoneInput, "Valid phone number", "success")
        } else {
          showMessage(phoneInput, validationRules.phoneNumber.message, "error")
        }
      } else {
        clearMessage(phoneInput)
      }
    })
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true

    if (!validateName(firstNameInput.value)) {
      showMessage(firstNameInput, validationRules.name.message, "error")
      isValid = false
    }

    if (!validateName(lastNameInput.value)) {
      showMessage(lastNameInput, validationRules.name.message, "error")
      isValid = false
    }

    if (!validateEmail(emailInput.value)) {
      showMessage(emailInput, validationRules.email.message, "error")
      isValid = false
    }

    if (phoneInput.value.trim() && !validatePhoneNumber(phoneInput.value)) {
      showMessage(phoneInput, validationRules.phoneNumber.message, "error")
      isValid = false
    }

    if (isValid) {
      // Update local adminProfile
      adminProfile.name = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`.trim()
      adminProfile.email = emailInput.value.trim()
      adminProfile.phone = phoneInput.value.trim()

      // Update profile display
      const profileNameEl = document.getElementById("profileName")
      if (profileNameEl) profileNameEl.textContent = adminProfile.name

      showAlert("personalInfoAlert", "Personal information updated successfully!", "success")
    } else {
      showAlert("personalInfoAlert", "Please fix the errors above", "danger")
    }
  })
}

function setupChangePasswordForm(form) {
  const currentPasswordInput = document.getElementById("currentPassword")
  const newPasswordInput = document.getElementById("newPassword")
  const confirmPasswordInput = document.getElementById("confirmNewPassword")

  // Password strength check
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", () => {
      checkPasswordStrength(newPasswordInput.value)
    })
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true

    if (!currentPasswordInput.value.trim()) {
      showMessage(currentPasswordInput, "Current password is required", "error")
      isValid = false
    }

    if (!validatePassword(newPasswordInput.value)) {
      showMessage(newPasswordInput, validationRules.password.message, "error")
      isValid = false
    }

    if (!validatePasswordMatch(newPasswordInput.value, confirmPasswordInput.value)) {
      showMessage(confirmPasswordInput, "Passwords do not match", "error")
      isValid = false
    }

    if (isValid) {
      showAlert("passwordAlert", "Password updated successfully!", "success")
      form.reset()
      clearMessage(currentPasswordInput)
      clearMessage(newPasswordInput)
      clearMessage(confirmPasswordInput)

      const strengthFill = document.querySelector(".strength-fill")
      if (strengthFill) strengthFill.style.width = "0%"
    } else {
      showAlert("passwordAlert", "Please fix the errors above", "danger")
    }
  })
}

function loadDashboardData() {
  const totalBinsEl = document.getElementById("totalBins")
  const fullBinsEl = document.getElementById("fullBins")
  const activeJanitorsEl = document.getElementById("activeJanitors")
  const collectionsTodayEl = document.getElementById("collectionsToday")

  if (totalBinsEl) totalBinsEl.textContent = bins.length
  if (fullBinsEl) fullBinsEl.textContent = bins.filter((b) => b.status === "full").length
  if (activeJanitorsEl) activeJanitorsEl.textContent = janitors.filter((j) => j.status === "active").length
  if (collectionsTodayEl) collectionsTodayEl.textContent = Math.floor(Math.random() * 10) + 5
}

function loadBinsTable() {
  const tbody = document.getElementById("binsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""
  if (bins.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No bins found</td></tr>'
    return
  }

  bins.forEach((bin) => {
    const statusBadge = getStatusBadge(bin.status)
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${bin.id}</td>
      <td>${bin.location}</td>
      <td>${statusBadge}</td>
      <td>${bin.lastEmptied}</td>
      <td>${bin.assignedTo}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="editBin('${bin.id}')">Edit</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function loadAllBinsTable() {
  const tbody = document.getElementById("allBinsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""
  if (bins.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No bins found</td></tr>'
    return
  }

  bins.forEach((bin) => {
    const statusBadge = getStatusBadge(bin.status)
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${bin.id}</td>
      <td>${bin.location}</td>
      <td>${bin.type}</td>
      <td>${statusBadge}</td>
      <td>${bin.capacity}</td>
      <td>${bin.assignedTo}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="editBin('${bin.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteBin('${bin.id}')">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function loadJanitorsTable() {
  const tbody = document.getElementById("janitorsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""
  if (janitors.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No janitors found</td></tr>'
    return
  }

  janitors.forEach((j) => {
    const statusBadge =
      j.status === "active"
        ? '<span class="badge badge-success">Active</span>'
        : '<span class="badge badge-danger">Inactive</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${j.name}</td>
      <td>${j.email}</td>
      <td>${j.phone}</td>
      <td>${j.bins} bins</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="editJanitor(${j.id})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteJanitor(${j.id})">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function loadNotificationsTable() {
  const tbody = document.getElementById("notificationsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""

  if (notifications.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No notifications found</td></tr>'
    return
  }

  notifications.forEach((notif) => {
    const typeBadge = getAlertTypeBadge(notif.type)
    const statusBadge = notif.read
      ? '<span class="badge badge-info">Read</span>'
      : '<span class="badge badge-danger">Unread</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${notif.time}</td>
      <td>BIN-${String(notif.id).padStart(3, "0")}</td>
      <td>Location</td>
      <td>${typeBadge}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="markNotificationRead(${notif.id})">Mark Read</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteNotification(${notif.id})">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function loadNotifications() {
  const panel = document.getElementById("notificationsPanel")
  if (!panel) return

  panel.innerHTML = ""

  if (notifications.length === 0) {
    panel.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="fas fa-inbox" style="font-size: 40px; opacity: 0.5;"></i>
        <p class="mt-2">No notifications</p>
      </div>
    `
  } else {
    notifications.forEach((notif) => {
      const notifClass =
        notif.type === "critical" ? "border-danger" : notif.type === "warning" ? "border-warning" : "border-info"
      const notifIcon =
        notif.type === "critical"
          ? "fa-exclamation-circle text-danger"
          : notif.type === "warning"
            ? "fa-exclamation-triangle text-warning"
            : "fa-info-circle text-info"

      const notifHtml = `
        <div class="notification-item border-start border-4 ${notifClass} p-3 border-bottom">
          <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex gap-2 flex-grow-1">
              <i class="fas ${notifIcon}" style="margin-top: 2px;"></i>
            <div>
                <p class="mb-1 fw-bold">${notif.message}</p>
                <small class="text-muted">${notif.time}</small>
            </div>
            </div>
            <button class="btn btn-sm btn-link" onclick="dismissNotification(${notif.id})">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `
      panel.innerHTML += notifHtml
    })
  }
}

function updateNotificationCount() {
  const unreadCount = notifications.filter((n) => !n.read).length
  const badge = document.getElementById("notificationCount")
  if (!badge) return

  if (unreadCount > 0) {
    badge.textContent = unreadCount
    badge.style.display = "block"
  } else {
    badge.style.display = "none"
  }
}

function getStatusBadge(status) {
  const badges = {
    full: '<span class="badge badge-danger">Full</span>',
    empty: '<span class="badge badge-success">Empty</span>',
    needs_attention: '<span class="badge badge-warning">Needs Attention</span>',
    active: '<span class="badge badge-success">Active</span>',
    inactive: '<span class="badge badge-danger">Inactive</span>',
  }
  return badges[status] || '<span class="badge">Unknown</span>'
}

function getAlertTypeBadge(type) {
  const badges = {
    critical: '<span class="badge badge-danger">Critical</span>',
    warning: '<span class="badge badge-warning">Warning</span>',
    info: '<span class="badge badge-info">Info</span>',
  }
  return badges[type] || '<span class="badge">Unknown</span>'
}

function filterBinsTable(searchTerm) {
  const tbody = document.getElementById("allBinsTableBody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none"
  })
}

function filterJanitorsTable(searchTerm) {
  const tbody = document.getElementById("janitorsTableBody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none"
  })
}

function filterBinsByStatus(status) {
  if (status === "all") {
    loadAllBinsTable()
  } else {
    const filtered = bins.filter((b) => b.status === status)
    const tbody = document.getElementById("allBinsTableBody")
    if (!tbody) return

    tbody.innerHTML = ""

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No bins found</td></tr>'
      return
    }

    filtered.forEach((bin) => {
      const statusBadge = getStatusBadge(bin.status)
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${bin.id}</td>
        <td>${bin.location}</td>
        <td>${bin.type}</td>
        <td>${statusBadge}</td>
        <td>${bin.capacity}</td>
        <td>${bin.assignedTo}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" onclick="editBin('${bin.id}')">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteBin('${bin.id}')">Delete</button>
        </td>
      `
      tbody.appendChild(row)
    })
  }
}

function filterJanitorsByStatus(status) {
  if (status === "all") {
    loadJanitorsTable()
  } else {
    const filtered = janitors.filter((j) => j.status === status)
    const tbody = document.getElementById("janitorsTableBody")
    if (!tbody) return

    tbody.innerHTML = ""

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No janitors found</td></tr>'
      return
    }

    filtered.forEach((j) => {
      const statusBadge =
        j.status === "active"
          ? '<span class="badge badge-success">Active</span>'
          : '<span class="badge badge-danger">Inactive</span>'
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${j.name}</td>
        <td>${j.email}</td>
        <td>${j.phone}</td>
        <td>${j.bins} bins</td>
        <td>${statusBadge}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" onclick="editJanitor(${j.id})">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteJanitor(${j.id})">Delete</button>
        </td>
      `
      tbody.appendChild(row)
    })
  }
}

function filterNotificationsByType(type) {
  const tbody = document.getElementById("notificationsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""

  let filtered = notifications
  if (type !== "all") {
    filtered = notifications.filter((n) => n.type === type)
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No notifications found</td></tr>'
    return
  }

  filtered.forEach((notif) => {
    const typeBadge = getAlertTypeBadge(notif.type)
    const statusBadge = notif.read
      ? '<span class="badge badge-info">Read</span>'
      : '<span class="badge badge-danger">Unread</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${notif.time}</td>
      <td>BIN-${String(notif.id).padStart(3, "0")}</td>
      <td>Location</td>
      <td>${typeBadge}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="markNotificationRead(${notif.id})">Mark Read</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteNotification(${notif.id})">Delete</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function openNotificationsModal() {
  const panel = document.getElementById("notificationsPanel")
  loadNotifications()

  const modal = new bootstrap.Modal(document.getElementById("notificationsModal"))
  modal.show()
}

function dismissNotification(notifId) {
  const index = notifications.findIndex((n) => n.id === notifId)
  if (index > -1) {
    notifications.splice(index, 1)
  }
  updateNotificationCount()
  openNotificationsModal()
}

function markNotificationRead(notifId) {
  const index = notifications.findIndex((n) => n.id === notifId)
  if (index > -1) {
    notifications[index].read = true
  }
  loadNotificationsTable()
  updateNotificationCount()
}

function markAllNotificationsRead() {
  notifications.forEach((n) => (n.read = true))
  loadNotificationsTable()
  updateNotificationCount()
  alert("All notifications marked as read")
}

function deleteNotification(notifId) {
  const index = notifications.findIndex((n) => n.id === notifId)
  if (index > -1) {
    notifications.splice(index, 1)
  }
  loadNotificationsTable()
  updateNotificationCount()
}

function clearAllNotifications() {
  if (confirm("Are you sure you want to clear all notifications?")) {
    notifications.length = 0
    loadNotificationsTable()
    updateNotificationCount()
    alert("All notifications cleared")
  }
}

function editBin(binId) {
  const bin = bins.find((b) => b.id === binId)
  if (!bin) {
    alert("Bin not found")
    return
  }

  document.getElementById("editBinId").value = binId
  document.getElementById("editBinIdDisplay").value = bin.id
  document.getElementById("editBinLocation").value = bin.location
  document.getElementById("editBinType").value = bin.type
  document.getElementById("editBinStatus").value = bin.status
  document.getElementById("editBinAssignedTo").value = bin.assignedTo || ""

  const modal = new bootstrap.Modal(document.getElementById("editBinModal"))
  modal.show()
}

window.saveBinEdit = () => {
  const binId = document.getElementById("editBinId").value
  const index = bins.findIndex((b) => b.id === binId)

  if (index === -1) {
    alert("Bin not found")
    return
  }

  bins[index].location = document.getElementById("editBinLocation").value
  bins[index].type = document.getElementById("editBinType").value
  bins[index].status = document.getElementById("editBinStatus").value
  bins[index].assignedTo = document.getElementById("editBinAssignedTo").value || "Unassigned"

  const modal = bootstrap.Modal.getInstance(document.getElementById("editBinModal"))
  modal.hide()

  loadAllBinsTable()
  loadBinsTable()
  loadDashboardData()

  alert("Bin information updated successfully!")
}

function deleteBin(binId) {
  if (!confirm(`Are you sure you want to delete bin ${binId}?`)) return

  const index = bins.findIndex((b) => b.id === binId)
  if (index > -1) {
    bins.splice(index, 1)
    loadAllBinsTable()
    loadBinsTable()
    loadDashboardData()
  }
}

function editJanitor(janitorId) {
  window.openEditJanitorModal(janitorId)
}

function deleteJanitor(janitorId) {
  if (!confirm(`Are you sure you want to delete this janitor?`)) return

  const index = janitors.findIndex((j) => j.id === janitorId)
  if (index > -1) {
    janitors.splice(index, 1)
    loadJanitorsTable()
    loadDashboardData()
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logging out...")
    // window.location.href = "logout.php";
  }
}

// Profile Tab Switching
function showProfileTab(tabName) {
  // Hide all tab panes
  const tabPanes = document.querySelectorAll(".tab-pane")
  tabPanes.forEach((pane) => {
    pane.classList.remove("show", "active")
  })

  // Remove active class from all menu items
  const menuItems = document.querySelectorAll(".profile-menu-item")
  menuItems.forEach((item) => {
    item.classList.remove("active")
  })

  // Show the selected tab pane
  const targetPane = document.getElementById(tabName)
  if (targetPane) {
    targetPane.classList.add("show", "active")
  }

  // Add active class to clicked menu item
  const clickedItem = document.querySelector(`[onclick*="${tabName}"]`)
  if (clickedItem) {
    clickedItem.classList.add("active")
  }
}

// Edit Janitor Functions
window.openEditJanitorModal = (janitorId) => {
  const janitor = janitors.find((j) => j.id === janitorId)
  if (!janitor) {
    alert("Janitor not found")
    return
  }

  document.getElementById("editJanitorId").value = janitor.id
  document.getElementById("editJanitorName").value = janitor.name
  document.getElementById("editJanitorEmail").value = janitor.email
  document.getElementById("editJanitorPhone").value = janitor.phone
  document.getElementById("editJanitorStatus").value = janitor.status
  document.getElementById("editJanitorBins").value = janitor.bins

  const modal = new bootstrap.Modal(document.getElementById("editJanitorModal"))
  modal.show()
}

window.saveJanitorEdit = () => {
  const janitorId = Number.parseInt(document.getElementById("editJanitorId").value)
  const index = janitors.findIndex((j) => j.id === janitorId)

  if (index === -1) {
    alert("Janitor not found")
    return
  }

  // Update janitor data
  janitors[index].name = document.getElementById("editJanitorName").value
  janitors[index].email = document.getElementById("editJanitorEmail").value
  janitors[index].phone = document.getElementById("editJanitorPhone").value
  janitors[index].status = document.getElementById("editJanitorStatus").value
  janitors[index].bins = Number.parseInt(document.getElementById("editJanitorBins").value)

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("editJanitorModal"))
  modal.hide()

  // Reload tables
  loadJanitorsTable()
  loadDashboardData()

  alert("Janitor information updated successfully!")
}

// Report Functions
window.generateReport = () => {
  const reportName = document.getElementById("reportName").value
  const reportType = document.getElementById("reportType").value
  const fromDate = document.getElementById("reportFromDate").value
  const toDate = document.getElementById("reportToDate").value
  const includeCharts = document.getElementById("includeCharts").checked
  const format = document.getElementById("reportFormat").value

  if (!reportName || !reportType || !fromDate || !toDate) {
    alert("Please fill in all required fields")
    return
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("createReportModal"))
  modal.hide()

  // Add to reports table
  const reportsTableBody = document.getElementById("reportsTableBody")
  const row = document.createElement("tr")
  const dateCreated = new Date().toISOString().split("T")[0]

  row.innerHTML = `
    <td>${reportName}</td>
    <td>${reportType}</td>
    <td>${dateCreated}</td>
    <td>Admin</td>
    <td><span class="badge badge-warning">Generating...</span></td>
    <td class="text-end">
      <button class="btn btn-sm btn-link" disabled><i class="fas fa-eye me-1"></i>View</button>
      <button class="btn btn-sm btn-link" disabled><i class="fas fa-download me-1"></i>Download</button>
    </td>
  `
  reportsTableBody.insertBefore(row, reportsTableBody.firstChild)

  // Simulate report generation
  setTimeout(() => {
    row.querySelector(".badge-warning").textContent = "Completed"
    row.querySelector(".badge-warning").className = "badge badge-success"
    const buttons = row.querySelectorAll("button")
    buttons.forEach((btn) => {
      btn.disabled = false
    })
    alert(`Report "${reportName}" generated successfully!`)
  }, 2000)

  // Reset form
  document.getElementById("createReportForm").reset()
}

window.exportReport = () => {
  const date = new Date().toISOString().split("T")[0]
  alert(`Exporting report for ${date}...`)
  // In real implementation, this would trigger actual export
}

window.viewReport = (reportId) => {
  const modal = new bootstrap.Modal(document.getElementById("viewReportDetailModal"))
  const content = document.getElementById("reportDetailContent")

  content.innerHTML = `
    <div class="mb-3">
      <label class="form-label fw-bold">Report Name</label>
      <p>${reportId}</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Report Type</label>
      <p>Collection Report</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Date Generated</label>
      <p>${new Date().toISOString().split("T")[0]}</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Status</label>
      <p><span class="badge badge-success">Completed</span></p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Summary</label>
      <p>Total Collections: 156 | Pending: 23 | Completed: 133</p>
    </div>
  `

  modal.show()
}

window.downloadReport = (reportId) => {
  // Create a simple text file with report data
  const content = `
Report: ${reportId}
Date Generated: ${new Date().toISOString().split("T")[0]}
Status: Completed
Total Collections: 156
Pending Collections: 23
Completed Collections: 133
`

  const blob = new Blob([content], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${reportId}-${new Date().toISOString().split("T")[0]}.txt`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)

  alert(`Report ${reportId} downloaded successfully!`)
}

// Add New Bin Function
window.saveNewBin = () => {
  const binId = document.getElementById("newBinId").value
  const location = document.getElementById("newBinLocation").value
  const type = document.getElementById("newBinType").value
  const capacity = document.getElementById("newBinCapacity").value
  const status = document.getElementById("newBinStatus").value
  const assignedTo = document.getElementById("newBinAssignedTo").value

  if (!binId || !location || !type || !capacity || !status) {
    alert("Please fill in all required fields")
    return
  }

  // Check if bin ID already exists
  if (bins.find((b) => b.id === binId)) {
    alert("Bin ID already exists")
    return
  }

  // Create new bin
  const newBin = {
    id: binId,
    location: location,
    type: type,
    status: status,
    lastEmptied: "Never",
    capacity: capacity + "%",
    assignedTo: assignedTo || "Unassigned",
  }

  bins.push(newBin)

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("addBinModal"))
  modal.hide()

  // Reload tables
  loadAllBinsTable()
  loadBinsTable()
  loadDashboardData()

  // Reset form
  document.getElementById("addBinForm").reset()

  alert(`Bin "${binId}" added successfully!`)
}

// Add New Janitor Function
window.saveNewJanitor = () => {
  const name = document.getElementById("newJanitorName").value
  const email = document.getElementById("newJanitorEmail").value
  const phone = document.getElementById("newJanitorPhone").value
  const status = document.getElementById("newJanitorStatus").value
  const bins = Number.parseInt(document.getElementById("newJanitorBins").value)

  if (!name || !email || !phone || !status) {
    alert("Please fill in all required fields")
    return
  }

  // Check if email already exists
  if (janitors.find((j) => j.email === email)) {
    alert("Email already exists")
    return
  }

  // Create new janitor
  const newId = janitors.length > 0 ? Math.max(...janitors.map((j) => j.id)) + 1 : 1
  const newJanitor = {
    id: newId,
    name: name,
    email: email,
    phone: phone,
    bins: bins,
    status: status,
  }

  janitors.push(newJanitor)

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("addJanitorModal"))
  modal.hide()

  // Reload tables
  loadJanitorsTable()
  loadDashboardData()

  // Reset form
  document.getElementById("addJanitorForm").reset()

  alert(`Janitor "${name}" added successfully!`)
}

// Dashboard Filter Function
window.filterDashboard = (period) => {
  const buttons = document.querySelectorAll(".btn-group .btn-outline-secondary")
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Filter dashboard data based on period
  alert(`Filtering dashboard for: ${period}`)
  // In real implementation, this would filter the data based on date range
}

// Chart Filter Function
window.filterChart = (period, chartType) => {
  const buttons = event.target.parentElement.querySelectorAll("button")
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  alert(`Filtering ${chartType} chart for: ${period}`)
  // In real implementation, this would update the chart data
}

// View Report Function
window.viewReport = (reportId) => {
  const modal = new bootstrap.Modal(document.getElementById("viewReportDetailModal"))
  const content = document.getElementById("reportDetailContent")

  content.innerHTML = `
    <div class="mb-3">
      <label class="form-label fw-bold">Report Name</label>
      <p>${reportId}</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Report Type</label>
      <p>Collection Report</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Date Generated</label>
      <p>${new Date().toISOString().split("T")[0]}</p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Status</label>
      <p><span class="badge badge-success">Completed</span></p>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold">Summary</label>
      <p>Total Collections: 156 | Pending: 23 | Completed: 133</p>
    </div>
  `

  modal.show()
}

// Expose functions globally
window.editBin = editBin
window.deleteBin = deleteBin
window.editJanitor = editJanitor
window.deleteJanitor = deleteJanitor
window.dismissNotification = dismissNotification
window.markNotificationRead = markNotificationRead
window.deleteNotification = deleteNotification
