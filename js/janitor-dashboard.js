const JANITOR_API = {
  dashboardStats: "api/janitor/get-dashboard-stats.php",
  assignedBins: "api/janitor/get-assigned-bins.php",
  taskHistory: "api/janitor/get-task-history.php",
  alerts: "api/janitor/get-alerts.php",
  notifications: "api/janitor/get-notifications.php",
  updateBinStatus: "api/janitor/update-bin-status.php",
  updateProfile: "api/janitor/update-profile.php",
  changePassword: "api/janitor/change-password.php",
}

let assignedBins = []
let taskHistory = []
let notifications = []
let alerts = []
const janitorProfile = {}

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
    ?.parentElement?.parentElement?.querySelector(".strength-fill")

  if (!password || !strengthFill) {
    if (strengthFill) strengthFill.style.width = "0%"
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

function showAlert(containerId, message, type) {
  const alertEl = document.getElementById(containerId)
  if (alertEl) {
    alertEl.className = `alert alert-message show alert-${type}`
    alertEl.textContent = message
    alertEl.style.display = "block"

    setTimeout(() => {
      alertEl.classList.remove("show")
      alertEl.style.display = "none"
    }, 5000)
  }
}

async function fetchAPI(endpoint, method = "GET", data = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (data && method !== "GET") {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (!result.success) {
      console.error("[v0] API Error:", result.message)
      showAlert("personalInfoAlert", result.message || "An error occurred", "danger")
    }

    return result
  } catch (error) {
    console.error("[v0] Fetch Error:", error)
    showAlert("personalInfoAlert", "Failed to connect to server", "danger")
    return { success: false, message: error.message }
  }
}

function getAlertTypeBadge(type) {
  const badges = {
    critical: '<span class="badge badge-danger">Critical</span>',
    warning: '<span class="badge badge-warning">Warning</span>',
    info: '<span class="badge badge-info">Info</span>',
  }
  return badges[type] || '<span class="badge">Unknown</span>'
}

function getStatusBadge(status) {
  const badges = {
    full: '<span class="badge badge-danger">Full</span>',
    empty: '<span class="badge badge-success">Empty</span>',
    needs_attention: '<span class="badge badge-warning">Needs Attention</span>',
    in_progress: '<span class="badge badge-info">In Progress</span>',
    active: '<span class="badge badge-success">Active</span>',
    inactive: '<span class="badge badge-secondary">Inactive</span>',
  }
  return badges[status] || '<span class="badge">Unknown</span>'
}

const bootstrap = window.bootstrap || {
  Modal: {
    getInstance: (element) => {
      return {
        hide: () => {
          console.log("Modal hidden")
        },
      }
    },
  },
}

async function loadDashboardData() {
  console.log("[v0] Loading dashboard data from database")
  const result = await fetchAPI(JANITOR_API.dashboardStats)

  if (result.success) {
    document.getElementById("assignedBinsCount").textContent = result.assigned_bins_count || 0
    document.getElementById("pendingTasksCount").textContent = result.pending_tasks_count || 0
    document.getElementById("completedTodayCount").textContent = result.completed_today_count || 0

    const recentAlertsBody = document.getElementById("recentAlertsBody")
    if (!recentAlertsBody) return

    recentAlertsBody.innerHTML = ""

    if (!result.recent_alerts || result.recent_alerts.length === 0) {
      recentAlertsBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No recent alerts</td></tr>'
    } else {
      result.recent_alerts.forEach((alert) => {
        const typeBadge = getAlertTypeBadge(alert.notification_type || alert.type)
        const row = document.createElement("tr")
        const timeAgo = alert.time || new Date(alert.created_at).toLocaleString()
        row.innerHTML = `
          <td>${timeAgo}</td>
          <td>${alert.bin_code || alert.binId}</td>
          <td>${alert.location}</td>
          <td>${typeBadge}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.bin_code || alert.binId}')">Handle</button>
          </td>
        `
        recentAlertsBody.appendChild(row)
      })
    }
    console.log("[v0] Dashboard data loaded successfully")
  }
}

async function loadAssignedBins() {
  console.log("[v0] Loading assigned bins from database")
  const result = await fetchAPI(JANITOR_API.assignedBins)

  if (result.success) {
    assignedBins = result.bins || []
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
      const lastEmptied = bin.last_emptied ? new Date(bin.last_emptied).toLocaleString() : "Never"
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${bin.bin_code || bin.id}</td>
        <td>${bin.location}</td>
        <td>${bin.type}</td>
        <td>${statusBadge}</td>
        <td>${lastEmptied}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" onclick="openStatusModal('${bin.bin_id || bin.id}')">Update</button>
        </td>
      `
      tbody.appendChild(row)
    })
    console.log("[v0] Assigned bins loaded successfully")
  }
}

async function loadTaskHistory() {
  console.log("[v0] Loading task history from database")
  const result = await fetchAPI(JANITOR_API.taskHistory)

  if (result.success) {
    taskHistory = result.tasks || []
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
      const completedAt = task.completed_at ? new Date(task.completed_at).toLocaleString() : task.date || "N/A"
      row.innerHTML = `
        <td>${completedAt}</td>
        <td>${task.bin_code || task.binId}</td>
        <td>${task.location}</td>
        <td>${task.task_type || task.action}</td>
        <td>${statusBadge}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-link" onclick="showTaskDetails('${task.task_id || task.id}')">View</button>
        </td>
      `
      tbody.appendChild(row)
    })
    console.log("[v0] Task history loaded successfully")
  }
}

async function loadAlerts() {
  console.log("[v0] Loading alerts from database")
  const result = await fetchAPI(JANITOR_API.alerts)

  if (result.success) {
    alerts = result.alerts || []
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
      const typeBadge = getAlertTypeBadge(alert.notification_type || alert.type)
      const statusBadge =
        alert.is_read || alert.status === "read"
          ? '<span class="badge badge-secondary">Read</span>'
          : '<span class="badge badge-danger">Unread</span>'
      const row = document.createElement("tr")
      const createdAt = alert.time || new Date(alert.created_at).toLocaleString()
      row.innerHTML = `
        <td>${createdAt}</td>
        <td>${alert.bin_code || alert.binId}</td>
        <td>${alert.location}</td>
        <td>${typeBadge}</td>
        <td>${statusBadge}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.bin_code || alert.binId}')">Handle</button>
        </td>
      `
      tbody.appendChild(row)
    })
    console.log("[v0] Alerts loaded successfully")
  }
}

async function loadNotifications() {
  console.log("[v0] Loading notifications from database")
  const result = await fetchAPI(JANITOR_API.notifications)

  if (result.success) {
    notifications = result.notifications || []
    updateNotificationCount()
    const panel = document.getElementById("notificationsPanel")
    if (panel) {
      displayNotifications(panel)
    }
  }
}

function displayNotifications(panel) {
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
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount
      badge.style.display = "block"
    } else {
      badge.style.display = "none"
    }
  }
}

function dismissNotification(notifId) {
  const index = notifications.findIndex((n) => n.id === notifId)
  if (index > -1) {
    notifications.splice(index, 1)
  }
  updateNotificationCount()
  openNotificationsModal()
}

function filterBinsTable(searchTerm) {
  const tbody = document.getElementById("assignedBinsBody")
  if (!tbody) return

  const rows = tbody.querySelectorAll("tr")
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    row.style.display = text.includes(searchTerm.toLowerCase()) ? "" : "none"
  })
}

function filterBinsByStatus(status) {
  const tbody = document.getElementById("assignedBinsBody")
  if (!tbody) return

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
    const lastEmptied = bin.last_emptied ? new Date(bin.last_emptied).toLocaleString() : "Never"
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${bin.bin_code || bin.id}</td>
      <td>${bin.location}</td>
      <td>${bin.type}</td>
      <td>${statusBadge}</td>
      <td>${lastEmptied}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="openStatusModal('${bin.bin_id || bin.id}')">Update</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function filterAlertsByType(type) {
  const tbody = document.getElementById("alertsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""

  let filtered = alerts
  if (type !== "all") {
    filtered = alerts.filter((a) => a.notification_type === type || a.type === type)
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No alerts found</td></tr>'
    return
  }

  filtered.forEach((alert) => {
    const typeBadge = getAlertTypeBadge(alert.notification_type || alert.type)
    const statusBadge =
      alert.is_read || alert.status === "read"
        ? '<span class="badge badge-secondary">Read</span>'
        : '<span class="badge badge-danger">Unread</span>'
    const row = document.createElement("tr")
    const createdAt = alert.time || new Date(alert.created_at).toLocaleString()
    row.innerHTML = `
      <td>${createdAt}</td>
      <td>${alert.bin_code || alert.binId}</td>
      <td>${alert.location}</td>
      <td>${typeBadge}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" onclick="handleAlert('${alert.bin_code || alert.binId}')">Handle</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function filterTaskHistory(date) {
  console.log("[v0] Filtering task history by date:", date)
  const tbody = document.getElementById("taskHistoryBody")
  if (!tbody || !date) return

  tbody.innerHTML = ""

  const filtered = taskHistory.filter((task) => {
    const taskDate = new Date(task.completed_at || task.date).toISOString().split("T")[0]
    return taskDate === date
  })

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No tasks found for this date</td></tr>'
    return
  }

  filtered.forEach((task) => {
    const statusBadge =
      task.status === "completed"
        ? '<span class="badge badge-success">Completed</span>'
        : '<span class="badge badge-warning">Pending</span>'
    const row = document.createElement("tr")
    const completedAt = task.completed_at ? new Date(task.completed_at).toLocaleString() : task.date || "N/A"
    row.innerHTML = `
      <td>${completedAt}</td>
      <td>${task.bin_code || task.binId}</td>
      <td>${task.location}</td>
      <td>${task.task_type || task.action}</td>
      <td>${statusBadge}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-link" onclick="showTaskDetails('${task.task_id || task.id}')">View</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

function markAllAlertsRead() {
  alerts.forEach((alert) => {
    alert.is_read = true
  })
  loadAlerts()
  showAlert("alertsAlert", "All alerts marked as read", "success")
}

function clearAllAlerts() {
  if (confirm("Are you sure you want to clear all alerts?")) {
    alerts.length = 0
    loadAlerts()
    showAlert("alertsAlert", "All alerts cleared", "success")
  }
}

async function updateBinStatus() {
  const binId = document.getElementById("binIdInput")?.value
  const status = document.getElementById("statusSelect")?.value
  const notes = document.getElementById("notesInput")?.value
  const actionType = document.getElementById("actionTypeSelect")?.value || "maintenance"

  if (!binId || !status) {
    showAlert("personalInfoAlert", "Please fill in all required fields", "danger")
    return
  }

  const result = await fetchAPI(JANITOR_API.updateBinStatus, "POST", {
    bin_id: binId,
    status: status,
    action_type: actionType,
    notes: notes,
  })

  if (result.success) {
    showAlert("personalInfoAlert", "Bin status updated successfully!", "success")
    if (bootstrap?.Modal?.getInstance) {
      const modal = bootstrap.Modal.getInstance(document.getElementById("statusUpdateModal"))
      if (modal) modal.hide()
    }
    loadAssignedBins()
    loadDashboardData()
  }
}

function openStatusModal(binId) {
  const binIdInput = document.getElementById("binIdInput")
  if (binIdInput) {
    binIdInput.value = binId
  }
  const modal = new (window.bootstrap?.Modal || bootstrap.Modal)(document.getElementById("statusUpdateModal"))
  modal.show()
}

window.openStatusModal = openStatusModal

function handleAlert(binId) {
  const alert = alerts.find((a) => a.bin_code === binId || a.binId === binId)
  if (!alert) {
    showAlert("personalInfoAlert", "Alert not found", "danger")
    return
  }

  document.getElementById("handleAlertBinId").value = binId
  document.getElementById("handleBinId").textContent = binId
  document.getElementById("handleLocation").textContent = alert.location

  const modal = new (window.bootstrap?.Modal || bootstrap.Modal)(document.getElementById("handleAlertModal"))
  modal.show()
}

window.handleAlert = handleAlert

window.submitHandleAlert = async () => {
  const binId = document.getElementById("handleAlertBinId").value
  const action = document.getElementById("handleAction").value
  const notes = document.getElementById("handleNotes").value
  const status = document.getElementById("handleStatus").value

  if (!action || !status) {
    showAlert("personalInfoAlert", "Please fill in all required fields", "danger")
    return
  }

  const result = await fetchAPI(JANITOR_API.updateBinStatus, "POST", {
    bin_id: binId,
    status: status,
    action_type: action,
    notes: notes,
  })

  if (result.success) {
    const alertIndex = alerts.findIndex((a) => a.bin_code === binId || a.binId === binId)
    if (alertIndex > -1) {
      alerts[alertIndex].is_read = true
    }

    if (bootstrap?.Modal?.getInstance) {
      const modal = bootstrap.Modal.getInstance(document.getElementById("handleAlertModal"))
      if (modal) modal.hide()
    }

    loadAlerts()
    updateNotificationCount()
    showAlert("personalInfoAlert", "Alert handled successfully!", "success")
    document.getElementById("handleAlertForm").reset()
  }
}

window.submitBinStatusUpdate = async () => {
  const binId = document.getElementById("updateBinId")?.value
  const newStatus = document.getElementById("updateNewStatus")?.value
  const actionType = document.getElementById("updateActionType")?.value
  const notes = document.getElementById("updateStatusNotes")?.value

  if (!binId || !newStatus || !actionType) {
    showAlert("personalInfoAlert", "Please fill in all required fields", "danger")
    return
  }

  const result = await fetchAPI(JANITOR_API.updateBinStatus, "POST", {
    bin_id: binId,
    status: newStatus,
    action_type: actionType,
    notes: notes,
  })

  if (result.success) {
    if (bootstrap?.Modal?.getInstance) {
      const modal = bootstrap.Modal.getInstance(document.getElementById("updateBinStatusModal"))
      if (modal) modal.hide()
    }

    loadAssignedBins()
    loadDashboardData()
    showAlert("personalInfoAlert", "Bin status updated successfully!", "success")
    document.getElementById("updateBinStatusForm").reset()
  }
}

function openNotificationsModal() {
  const panel = document.getElementById("notificationsPanel")
  if (panel) {
    displayNotifications(panel)
  }

  const modal = new (window.bootstrap?.Modal || bootstrap.Modal)(document.getElementById("notificationsModal"))
  modal.show()
}

function showTaskDetails(taskId) {
  const task = taskHistory.find((t) => t.task_id === taskId || t.id === taskId)
  if (!task) {
    showAlert("personalInfoAlert", "Task not found", "danger")
    return
  }

  console.log("[v0] Task details:", task)
  alert(
    `Task ID: ${task.task_id || task.id}\nBin: ${task.bin_code}\nAction: ${task.task_type}\nNotes: ${task.notes || "N/A"}`,
  )
}

window.showTaskDetails = showTaskDetails

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

      if (!passwordInput) return

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

    firstNameInput?.addEventListener("blur", () => {
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

    lastNameInput?.addEventListener("blur", () => {
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

    emailInput?.addEventListener("blur", () => {
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

    phoneInput?.addEventListener("blur", () => {
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

    personalInfoForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      let isValid = true

      if (firstNameInput && !validateName(firstNameInput.value)) {
        showMessage(firstNameInput, validationRules.name.message, "error")
        isValid = false
      }

      if (lastNameInput && !validateName(lastNameInput.value)) {
        showMessage(lastNameInput, validationRules.name.message, "error")
        isValid = false
      }

      if (emailInput && !validateEmail(emailInput.value)) {
        showMessage(emailInput, validationRules.email.message, "error")
        isValid = false
      }

      if (phoneInput?.value?.trim() && !validatePhoneNumber(phoneInput.value)) {
        showMessage(phoneInput, validationRules.phoneNumber.message, "error")
        isValid = false
      }

      if (isValid) {
        const result = await fetchAPI(JANITOR_API.updateProfile, "POST", {
          first_name: firstNameInput?.value || "",
          last_name: lastNameInput?.value || "",
          email: emailInput?.value || "",
          phone: phoneInput?.value || "",
        })

        if (result.success) {
          showAlert("personalInfoAlert", "Personal information updated successfully!", "success")
        }
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

    newPasswordInput?.addEventListener("input", () => {
      checkPasswordStrength(newPasswordInput.value)
    })

    currentPasswordInput?.addEventListener("blur", () => {
      if (currentPasswordInput.value.trim()) {
        showMessage(currentPasswordInput, "Password verified", "success")
      } else {
        clearMessage(currentPasswordInput)
      }
    })

    newPasswordInput?.addEventListener("blur", () => {
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

    confirmPasswordInput?.addEventListener("blur", () => {
      if (confirmPasswordInput.value.trim()) {
        if (validatePasswordMatch(newPasswordInput?.value || "", confirmPasswordInput.value)) {
          showMessage(confirmPasswordInput, "Passwords match", "success")
        } else {
          showMessage(confirmPasswordInput, "Passwords do not match", "error")
        }
      } else {
        clearMessage(confirmPasswordInput)
      }
    })

    changePasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      let isValid = true

      if (!currentPasswordInput?.value?.trim()) {
        showMessage(currentPasswordInput, "Current password is required", "error")
        isValid = false
      }

      if (!validatePassword(newPasswordInput?.value || "")) {
        showMessage(newPasswordInput, validationRules.password.message, "error")
        isValid = false
      }

      if (!validatePasswordMatch(newPasswordInput?.value || "", confirmPasswordInput?.value || "")) {
        showMessage(confirmPasswordInput, "Passwords do not match", "error")
        isValid = false
      }

      if (isValid) {
        const result = await fetchAPI(JANITOR_API.changePassword, "POST", {
          current_password: currentPasswordInput?.value || "",
          new_password: newPasswordInput?.value || "",
        })

        if (result.success) {
          showAlert("passwordAlert", "Password updated successfully!", "success")
          changePasswordForm.reset()
          clearMessage(currentPasswordInput)
          clearMessage(newPasswordInput)
          clearMessage(confirmPasswordInput)
          const strengthFill = document.querySelector(".strength-fill")
          if (strengthFill) strengthFill.style.width = "0%"
        }
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
      const file = e.target.files?.[0]

      if (!file) return

      const allowedTypes = ["image/png", "image/jpeg"]
      const allowedExtensions = ["png", "jpg", "jpeg"]
      const fileExtension = file.name.split(".").pop()?.toLowerCase()

      if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension || "")) {
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
        if (profileImg && event.target?.result) {
          profileImg.src = event.target.result
        }
        if (photoMessage) {
          photoMessage.textContent = "Photo updated successfully!"
          photoMessage.className = "validation-message success"

          setTimeout(() => {
            photoMessage.className = "validation-message"
            photoMessage.textContent = ""
          }, 3000)
        }
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
      if (filter) filterBinsByStatus(filter)
    })
  })

  const filterHistoryBtn = document.getElementById("filterHistoryBtn")
  if (filterHistoryBtn) {
    filterHistoryBtn.addEventListener("click", () => {
      const dateInput = document.getElementById("historyDateFilter")
      const date = dateInput ? dateInput.value : ""
      if (date) filterTaskHistory(date)
    })
  }

  const alertSoundSwitch = document.getElementById("alertSoundSwitch")
  if (alertSoundSwitch) {
    alertSoundSwitch.addEventListener("change", function () {
      const status = this.checked ? "enabled" : "disabled"
      console.log(`[v0] Alert sound ${status}`)
    })
  }

  const filterAlertsItems = document.querySelectorAll("#filterAlertsDropdown ~ .dropdown-menu a")
  filterAlertsItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const filter = this.getAttribute("data-filter")
      if (filter) filterAlertsByType(filter)
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

function initializeProfileTabs() {
  const profileMenuItems = document.querySelectorAll(".profile-menu-item")

  profileMenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      console.log("[v0] Profile tab clicked - target:", targetId)

      profileMenuItems.forEach((menuItem) => {
        menuItem.classList.remove("active")
      })

      this.classList.add("active")

      const tabPanes = document.querySelectorAll(".tab-pane")
      tabPanes.forEach((pane) => {
        pane.classList.remove("show", "active")
      })

      const targetPane = document.querySelector(targetId)
      if (targetPane) {
        targetPane.classList.add("show", "active")
        console.log("[v0] Tab pane displayed:", targetId)
      }
    })
  })
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.php"
  }
}

window.handleLogout = handleLogout

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM Content Loaded - Initializing janitor dashboard")
  initializeSidebar()
  initializeButtons()
  loadDashboardData()
  loadAssignedBins()
  loadTaskHistory()
  loadAlerts()
  loadNotifications()
  updateNotificationCount()
  console.log("[v0] Janitor dashboard initialization complete")
})
