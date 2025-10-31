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
  let strength = 0
  const strengthFill = document
    .querySelector("#newPassword")
    .parentElement.parentElement.querySelector(".strength-fill")

  if (!password) {
    strengthFill.style.width = "0%"
    return
  }

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
  alertEl.className = `alert alert-message show alert-${type}`
  alertEl.textContent = message
  alertEl.style.display = "block"

  setTimeout(() => {
    alertEl.classList.remove("show")
    alertEl.style.display = "none"
  }, 5000)
}

// Dashboard Data
const janitorProfile = {
  name: "John Doe",
  employeeId: "JAN-001",
  department: "Sanitation",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  shift: "Morning (6 AM - 2 PM)",
  tasksCompleted: 24,
}

const assignedBins = [
  {
    id: "BIN-001",
    location: "Main Street - Corner Store",
    type: "General",
    status: "full",
    lastEmptied: "2 hours ago",
    capacity: "95%",
    notes: "Needs immediate attention",
  },
  {
    id: "BIN-002",
    location: "Park Avenue - Central Park",
    type: "Recyclable",
    status: "empty",
    lastEmptied: "30 mins ago",
    capacity: "10%",
    notes: "Recently emptied",
  },
  {
    id: "BIN-003",
    location: "Downtown - Market Square",
    type: "Organic",
    status: "needs_attention",
    lastEmptied: "5 hours ago",
    capacity: "80%",
    notes: "Scheduled for emptying",
  },
]

const taskHistory = [
  {
    date: "2024-01-15 10:30",
    binId: "BIN-001",
    location: "Main Street - Corner Store",
    action: "Emptied",
    status: "completed",
    notes: "Bin was 95% full, cleaned and sanitized",
  },
  {
    date: "2024-01-15 09:15",
    binId: "BIN-002",
    location: "Park Avenue - Central Park",
    action: "Inspected",
    status: "completed",
    notes: "Bin in good condition, no issues found",
  },
  {
    date: "2024-01-14 16:45",
    binId: "BIN-003",
    location: "Downtown - Market Square",
    action: "Emptied",
    status: "completed",
    notes: "Bin was 85% full, replaced liner",
  },
  {
    date: "2024-01-14 14:20",
    binId: "BIN-001",
    location: "Main Street - Corner Store",
    action: "Maintenance",
    status: "completed",
    notes: "Fixed broken hinge on lid",
  },
  {
    date: "2024-01-14 11:00",
    binId: "BIN-002",
    location: "Park Avenue - Central Park",
    action: "Emptied",
    status: "completed",
    notes: "Regular maintenance emptying",
  },
]

const notifications = [
  {
    id: 1,
    type: "critical",
    binId: "BIN-001",
    message: "Bin is FULL - Immediate action required",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    binId: "BIN-003",
    message: "Bin capacity at 80% - Schedule emptying soon",
    time: "5 mins ago",
    read: false,
  },
  { id: 3, type: "info", binId: "BIN-002", message: "Bin emptied successfully", time: "30 mins ago", read: true },
]

const alerts = [
  { time: "10:30 AM", binId: "BIN-001", location: "Main Street", type: "critical", status: "unread" },
  { time: "09:15 AM", binId: "BIN-002", location: "Park Avenue", type: "warning", status: "read" },
  { time: "08:00 AM", binId: "BIN-003", location: "Downtown", type: "info", status: "read" },
]

const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM Content Loaded - Initializing dashboard")
  initializeSidebar()
  initializeButtons()
  loadDashboardData()
  loadAssignedBins()
  loadTaskHistory()
  loadAlerts()
  loadNotifications()
  updateNotificationCount()
  console.log("[v0] Dashboard initialization complete")
})

function initializeSidebar() {
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  console.log("[v0] Initializing sidebar with", sidebarItems.length, "items")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      sidebarItems.forEach((i) => i.classList.remove("active"))
      this.classList.add("active")

      const section = this.getAttribute("data-section")
      console.log("[v0] Sidebar clicked - showing section:", section)

      const sectionId = section.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      const sectionElement = document.getElementById(`${sectionId}Section`)

      document.querySelectorAll(".content-section").forEach((s) => {
        s.style.display = "none"
      })

      if (sectionElement) {
        sectionElement.style.display = "block"
        console.log("[v0] Section displayed:", section)

        if (section === "assigned-bins") {
          loadAssignedBins()
        } else if (section === "task-history") {
          loadTaskHistory()
        } else if (section === "alerts") {
          loadAlerts()
        }
      } else {
        console.error("[v0] Section element not found:", `${sectionId}Section`)
      }
    })
  })

  initializeProfileTabs()
}

function showSection(sectionName) {
  const sidebarItems = document.querySelectorAll(".sidebar-item")
  sidebarItems.forEach((i) => i.classList.remove("active"))

  const targetItem = document.querySelector(`[data-section="${sectionName}"]`)
  if (targetItem) {
    targetItem.classList.add("active")
  }

  document.querySelectorAll(".content-section").forEach((s) => {
    s.style.display = "none"
  })

  const sectionElement = document.getElementById(`${sectionName}Section`)
  if (sectionElement) {
    sectionElement.style.display = "block"
  }
}

function initializeButtons() {
  const profileLink = document.getElementById("profileLink")
  if (profileLink) {
    profileLink.addEventListener("click", (e) => {
      e.preventDefault()
      showSection("my-profile")
    })
  }

  const notificationsBtn = document.getElementById("notificationsBtn")
  if (notificationsBtn) {
    notificationsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      openNotificationsModal()
    })
  }

  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      handleLogout()
    })
  }

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

  const personalInfoForm = document.getElementById("personalInfoForm")
  if (personalInfoForm) {
    const firstNameInput = document.getElementById("firstName")
    const lastNameInput = document.getElementById("lastName")
    const emailInput = document.getElementById("email")
    const phoneInput = document.getElementById("phoneNumber")

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

    personalInfoForm.addEventListener("submit", (e) => {
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
        showAlert("personalInfoAlert", "Personal information updated successfully!", "success")
        console.log("Form submitted with valid data")
      } else {
        showAlert("personalInfoAlert", "Please fix the errors above", "danger")
      }
    })
  }

  const changePasswordForm = document.getElementById("changePasswordForm")
  if (changePasswordForm) {
    const currentPasswordInput = document.getElementById("currentPassword")
    const newPasswordInput = document.getElementById("newPassword")
    const confirmPasswordInput = document.getElementById("confirmNewPassword")

    newPasswordInput.addEventListener("input", () => {
      checkPasswordStrength(newPasswordInput.value)
    })

    currentPasswordInput.addEventListener("blur", () => {
      if (currentPasswordInput.value.trim()) {
        showMessage(currentPasswordInput, "Password verified", "success")
      } else {
        clearMessage(currentPasswordInput)
      }
    })

    newPasswordInput.addEventListener("blur", () => {
      if (newPasswordInput.value.trim()) {
        if (validatePassword(newPasswordInput.value)) {
          showMessage(newPasswordInput, "Strong password", "success")
        } else {
          showMessage(newPasswordInput, validationRules.password.message, "error")
        }
      } else {
        clearMessage(newPasswordInput)
      }
    })

    confirmPasswordInput.addEventListener("blur", () => {
      if (confirmPasswordInput.value.trim()) {
        if (validatePasswordMatch(newPasswordInput.value, confirmPasswordInput.value)) {
          showMessage(confirmPasswordInput, "Passwords match", "success")
        } else {
          showMessage(confirmPasswordInput, "Passwords do not match", "error")
        }
      } else {
        clearMessage(confirmPasswordInput)
      }
    })

    changePasswordForm.addEventListener("submit", (e) => {
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
        changePasswordForm.reset()
        clearMessage(currentPasswordInput)
        clearMessage(newPasswordInput)
        clearMessage(confirmPasswordInput)
        document.querySelector(".strength-fill").style.width = "0%"
      } else {
        showAlert("passwordAlert", "Please fix the errors above", "danger")
      }
    })
  }

  const changePhotoBtn = document.getElementById("changePhotoBtn")
  const photoInput = document.getElementById("photoInput")
  const photoMessage = document.getElementById("photoMessage")
  const profileImg = document.getElementById("profileImg")

  if (changePhotoBtn && photoInput) {
    changePhotoBtn.addEventListener("click", () => {
      photoInput.click()
    })

    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0]

      if (!file) return

      const allowedTypes = ["image/png", "image/jpeg"]
      const allowedExtensions = ["png", "jpg", "jpeg"]
      const fileExtension = file.name.split(".").pop().toLowerCase()

      if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension)) {
        photoMessage.textContent = "Only PNG, JPG, and JPEG files are allowed"
        photoMessage.className = "validation-message error"
        photoInput.value = ""
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        photoMessage.textContent = "File size must be less than 5MB"
        photoMessage.className = "validation-message error"
        photoInput.value = ""
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        profileImg.src = event.target.result
        photoMessage.textContent = "Photo updated successfully!"
        photoMessage.className = "validation-message success"

        setTimeout(() => {
          photoMessage.className = "validation-message"
          photoMessage.textContent = ""
        }, 3000)
      }
      reader.readAsDataURL(file)
    })
  }

  const searchBinsInput = document.getElementById("searchBinsInput")
  if (searchBinsInput) {
    searchBinsInput.addEventListener("input", function () {
      filterBinsTable(this.value)
    })
  }

  const filterBinsItems = document.querySelectorAll("#filterBinsDropdown ~ .dropdown-menu a")
  filterBinsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      filterBinsByStatus(filter)
    })
  })

  const filterHistoryBtn = document.getElementById("filterHistoryBtn")
  if (filterHistoryBtn) {
    filterHistoryBtn.addEventListener("click", () => {
      const date = document.getElementById("historyDateFilter").value
      filterTaskHistory(date)
    })
  }

  const alertSoundSwitch = document.getElementById("alertSoundSwitch")
  if (alertSoundSwitch) {
    alertSoundSwitch.addEventListener("change", function () {
      const status = this.checked ? "enabled" : "disabled"
      alert(`Alert sound ${status}`)
    })
  }

  const filterAlertsItems = document.querySelectorAll("#filterAlertsDropdown ~ .dropdown-menu a")
  filterAlertsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      filterAlertsByType(filter)
    })
  })

  const markAllReadBtn = document.getElementById("markAllReadBtn")
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      markAllAlertsRead()
    })
  }

  const clearAlertsBtn = document.getElementById("clearAlertsBtn")
  if (clearAlertsBtn) {
    clearAlertsBtn.addEventListener("click", () => {
      clearAllAlerts()
    })
  }

  const updateStatusBtn = document.getElementById("updateStatusBtn")
  if (updateStatusBtn) {
    updateStatusBtn.addEventListener("click", () => {
      updateBinStatus()
    })
  }
}

function loadDashboardData() {
  console.log("[v0] Loading dashboard data")
  document.getElementById("assignedBinsCount").textContent = assignedBins.length
  document.getElementById("pendingTasksCount").textContent = assignedBins.filter(
    (b) => b.status === "full" || b.status === "needs_attention",
  ).length
  document.getElementById("completedTodayCount").textContent = taskHistory.filter(
    (t) => t.status === "completed",
  ).length

  const recentAlertsBody = document.getElementById("recentAlertsBody")
  recentAlertsBody.innerHTML = ""
  const recentAlerts = alerts.slice(0, 3)
  if (recentAlerts.length === 0) {
    recentAlertsBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No recent alerts</td></tr>'
  } else {
    recentAlerts.forEach((alert) => {
      const typeBadge = getAlertTypeBadge(alert.type)
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${alert.time}</td>
        <td>${alert.binId}</td>
        <td>${alert.location}</td>
        <td>${typeBadge}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.binId}')">Handle</button>
        </td>
      `
      recentAlertsBody.appendChild(row)
    })
  }
}

function loadAssignedBins() {
  console.log("[v0] Loading assigned bins - Total bins:", assignedBins.length)
  const tbody = document.getElementById("assignedBinsBody")

  if (!tbody) {
    console.error("[v0] assignedBinsBody element not found!")
    return
  }

  tbody.innerHTML = ""

  if (assignedBins.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No bins assigned</td></tr>'
    return
  }

  assignedBins.forEach((bin) => {
    const statusBadge = getStatusBadge(bin.status)
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${bin.id}</td>
      <td>${bin.location}</td>
      <td>${bin.type}</td>
      <td>${statusBadge}</td>
      <td>${bin.lastEmptied}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="openStatusModal('${bin.id}')">Update</button>
      </td>
    `
    tbody.appendChild(row)
  })
  console.log("[v0] Assigned bins loaded successfully")
}

function loadTaskHistory() {
  console.log("[v0] Loading task history - Total tasks:", taskHistory.length)
  const tbody = document.getElementById("taskHistoryBody")

  if (!tbody) {
    console.error("[v0] taskHistoryBody element not found!")
    return
  }

  tbody.innerHTML = ""

  if (taskHistory.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No task history found</td></tr>'
    return
  }

  taskHistory.forEach((task) => {
    const statusBadge =
      task.status === "completed"
        ? '<span class="badge badge-success">Completed</span>'
        : '<span class="badge badge-warning">Pending</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${task.date}</td>
      <td>${task.binId}</td>
      <td>${task.location}</td>
      <td>${task.action}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-link">View</button>
      </td>
    `
    tbody.appendChild(row)
  })
  console.log("[v0] Task history loaded successfully")
}

function loadAlerts() {
  console.log("[v0] Loading alerts - Total alerts:", alerts.length)
  const tbody = document.getElementById("alertsTableBody")

  if (!tbody) {
    console.error("[v0] alertsTableBody element not found!")
    return
  }

  tbody.innerHTML = ""

  if (alerts.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No alerts found</td></tr>'
    return
  }

  alerts.forEach((alert) => {
    const typeBadge = getAlertTypeBadge(alert.type)
    const statusBadge =
      alert.status === "unread"
        ? '<span class="badge badge-danger">Unread</span>'
        : '<span class="badge badge-secondary">Read</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${alert.time}</td>
      <td>${alert.binId}</td>
      <td>${alert.location}</td>
      <td>${typeBadge}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.binId}')">Handle</button>
      </td>
    `
    tbody.appendChild(row)
  })
  console.log("[v0] Alerts loaded successfully")
}

function loadNotifications() {
  const panel = document.getElementById("notificationsPanel")
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

function getStatusBadge(status) {
  const badges = {
    full: '<span class="badge badge-danger">Full</span>',
    empty: '<span class="badge badge-success">Empty</span>',
    needs_attention: '<span class="badge badge-warning">Needs Attention</span>',
    in_progress: '<span class="badge badge-info">In Progress</span>',
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
  const tbody = document.getElementById("assignedBinsBody")
  const rows = tbody.querySelectorAll("tr")

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none"
  })
}

function filterBinsByStatus(status) {
  const tbody = document.getElementById("assignedBinsBody")
  tbody.innerHTML = ""

  let filtered = assignedBins
  if (status !== "all") {
    filtered = assignedBins.filter((b) => b.status === status)
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No bins found</td></tr>'
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
      <td>${bin.lastEmptied}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="openStatusModal('${bin.id}')">Update</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function filterAlertsByType(type) {
  const tbody = document.getElementById("alertsTableBody")
  tbody.innerHTML = ""

  let filtered = alerts
  if (type !== "all") {
    filtered = alerts.filter((a) => a.type === type)
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No alerts found</td></tr>'
    return
  }

  filtered.forEach((alert) => {
    const typeBadge = getAlertTypeBadge(alert.type)
    const statusBadge =
      alert.status === "unread"
        ? '<span class="badge badge-danger">Unread</span>'
        : '<span class="badge badge-secondary">Read</span>'
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${alert.time}</td>
      <td>${alert.binId}</td>
      <td>${alert.location}</td>
      <td>${typeBadge}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.binId}')">Handle</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function filterTaskHistory(date) {
  // Implement filterTaskHistory logic here
  console.log("Filtering task history by date:", date)
}

function updateBinStatus() {
  const binId = document.getElementById("binIdInput").value
  const status = document.getElementById("statusSelect").value
  const notes = document.getElementById("notesInput").value

  if (!status) {
    alert("Please select a status")
    return
  }

  const bin = assignedBins.find((b) => b.id === binId)
  if (bin) {
    bin.status = status
    bin.lastEmptied = "Just now"
  }

  alert("Bin status updated successfully!")
  const modal = bootstrap.Modal.getInstance(document.getElementById("statusUpdateModal"))
  modal.hide()
  loadAssignedBins()
  loadDashboardData()
}

function openStatusModal(binId) {
  document.getElementById("binIdInput").value = binId
  const modal = new bootstrap.Modal(document.getElementById("statusUpdateModal"))
  modal.show()
}

window.openStatusModal = openStatusModal

function handleAlert(binId) {
  const alert = alerts.find((a) => a.binId === binId)
  if (!alert) {
    alert("Alert not found")
    return
  }

  document.getElementById("handleAlertBinId").value = binId
  document.getElementById("handleBinId").textContent = alert.binId
  document.getElementById("handleLocation").textContent = alert.location

  const modal = new bootstrap.Modal(document.getElementById("handleAlertModal"))
  modal.show()
}

window.handleAlert = handleAlert

window.submitHandleAlert = () => {
  const binId = document.getElementById("handleAlertBinId").value
  const action = document.getElementById("handleAction").value
  const notes = document.getElementById("handleNotes").value
  const status = document.getElementById("handleStatus").value

  if (!action || !status) {
    alert("Please fill in all required fields")
    return
  }

  // Update alert status
  const alertIndex = alerts.findIndex((a) => a.binId === binId)
  if (alertIndex > -1) {
    alerts[alertIndex].status = "read"
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("handleAlertModal"))
  modal.hide()

  // Reload alerts
  loadAlerts()
  updateNotificationCount()

  alert("Alert handled successfully!")
  document.getElementById("handleAlertForm").reset()
}

window.submitBinStatusUpdate = () => {
  const binId = document.getElementById("updateBinId").value
  const newStatus = document.getElementById("updateNewStatus").value
  const actionType = document.getElementById("updateActionType").value
  const notes = document.getElementById("updateStatusNotes").value

  if (!newStatus || !actionType) {
    alert("Please fill in all required fields")
    return
  }

  // Update bin status
  const bin = assignedBins.find((b) => b.id === binId)
  if (bin) {
    bin.status = newStatus
    bin.lastEmptied = "Just now"
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("updateBinStatusModal"))
  modal.hide()

  // Reload data
  loadAssignedBins()
  loadDashboardData()

  alert("Bin status updated successfully!")
  document.getElementById("updateBinStatusForm").reset()
}

function markAllAlertsRead() {
  alerts.forEach((alert) => {
    alert.status = "read"
  })
  loadAlerts()
  alert("All alerts marked as read")
}

function clearAllAlerts() {
  if (confirm("Are you sure you want to clear all alerts?")) {
    alerts.length = 0
    loadAlerts()
    alert("All alerts cleared")
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logging out...")
  }
}

function openNotificationsModal() {
  const panel = document.getElementById("notificationsPanel")
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

function updateNotificationCount() {
  const unreadCount = notifications.filter((n) => !n.read).length
  const badge = document.getElementById("notificationCount")
  if (unreadCount > 0) {
    badge.textContent = unreadCount
    badge.style.display = "block"
  } else {
    badge.style.display = "none"
  }
}

function initializeProfileTabs() {
  const profileMenuItems = document.querySelectorAll(".profile-menu-item")

  profileMenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      console.log("[v0] Profile tab clicked - target:", targetId)

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
        console.log("[v0] Tab pane displayed:", targetId)
      }
    })
  })
}
