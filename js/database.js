// Import Bootstrap
import bootstrap from "bootstrap"

// Dashboard Functions
async function loadDashboardData() {
  try {
    const response = await fetch("api/get-dashboard-data.php")
    const data = await response.json()

    if (data.success) {
      document.getElementById("totalBins").textContent = data.totalBins
      document.getElementById("fullBins").textContent = data.fullBins
      document.getElementById("activeJanitors").textContent = data.activeJanitors
      document.getElementById("collectionsToday").textContent = data.collectionsToday

      loadBinsTable(data.bins)
    }
  } catch (error) {
    console.error("Error loading dashboard data:", error)
  }
}

function loadBinsTable(bins) {
  const tbody = document.getElementById("binsTableBody")
  tbody.innerHTML = ""

  if (bins.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No bins found</td></tr>'
    return
  }

  bins.forEach((bin) => {
    const row = `
            <tr>
                <td><span class="badge bg-primary">${bin.bin_code}</span></td>
                <td>${bin.location}</td>
                <td><span class="badge bg-${getStatusColor(bin.status)}">${bin.status}</span></td>
                <td class="d-none d-md-table-cell">${bin.last_emptied ? new Date(bin.last_emptied).toLocaleDateString() : "Never"}</td>
                <td class="d-none d-lg-table-cell">${bin.assigned_to || "Unassigned"}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="editBin(${bin.bin_id})">Edit</button>
                </td>
            </tr>
        `
    tbody.innerHTML += row
  })
}

// Bins Functions
async function loadAllBins(filter = "all") {
  try {
    const response = await fetch(`api/get-bins.php?filter=${filter}`)
    const data = await response.json()

    if (data.success) {
      const tbody = document.getElementById("allBinsTableBody")
      tbody.innerHTML = ""

      if (data.bins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">No bins found</td></tr>'
        return
      }

      data.bins.forEach((bin) => {
        const row = `
                    <tr>
                        <td><span class="badge bg-primary">${bin.bin_code}</span></td>
                        <td>${bin.location}</td>
                        <td><span class="badge bg-info">${bin.type}</span></td>
                        <td><span class="badge bg-${getStatusColor(bin.status)}">${bin.status}</span></td>
                        <td class="d-none d-lg-table-cell">${bin.capacity}%</td>
                        <td class="d-none d-md-table-cell">${bin.assigned_to || "Unassigned"}</td>
                        <td class="text-end">
                            <div class="btn-group btn-group-sm" role="group">
                                <button class="btn btn-outline-primary" onclick="editBin(${bin.bin_id})">Edit</button>
                                <button class="btn btn-outline-danger" onclick="deleteBin(${bin.bin_id})">Delete</button>
                            </div>
                        </td>
                    </tr>
                `
        tbody.innerHTML += row
      })
    }
  } catch (error) {
    console.error("Error loading bins:", error)
  }
}

async function saveNewBin() {
  const binCode = document.getElementById("binId").value
  const location = document.getElementById("binLocation").value
  const type = document.getElementById("binType").value
  const capacity = document.getElementById("binCapacity").value

  try {
    const response = await fetch("api/add-bin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bin_code: binCode, location, type, capacity }),
    })
    const data = await response.json()

    if (data.success) {
      alert("Bin added successfully!")
      bootstrap.Modal.getInstance(document.getElementById("addBinModal")).hide()
      loadAllBins()
    } else {
      alert("Error: " + data.message)
    }
  } catch (error) {
    console.error("Error saving bin:", error)
    alert("Error saving bin")
  }
}

// Janitors Functions
async function loadAllJanitors(filter = "all") {
  try {
    const response = await fetch(`api/get-janitors.php?filter=${filter}`)
    const data = await response.json()

    if (data.success) {
      const tbody = document.getElementById("janitorsTableBody")
      tbody.innerHTML = ""

      if (data.janitors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No janitors found</td></tr>'
        return
      }

      data.janitors.forEach((janitor) => {
        const row = `
                    <tr>
                        <td>${janitor.first_name} ${janitor.last_name}</td>
                        <td>${janitor.email}</td>
                        <td class="d-none d-md-table-cell">${janitor.phone}</td>
                        <td class="d-none d-lg-table-cell">${janitor.assigned_bins}</td>
                        <td><span class="badge bg-${janitor.status === "active" ? "success" : "secondary"}">${janitor.status}</span></td>
                        <td class="text-end">
                            <div class="btn-group btn-group-sm" role="group">
                                <button class="btn btn-outline-primary" onclick="editJanitor(${janitor.user_id})">Edit</button>
                                <button class="btn btn-outline-danger" onclick="deleteJanitor(${janitor.user_id})">Delete</button>
                            </div>
                        </td>
                    </tr>
                `
        tbody.innerHTML += row
      })
    }
  } catch (error) {
    console.error("Error loading janitors:", error)
  }
}

async function saveNewJanitor() {
  const firstName = document.getElementById("janitorName").value.split(" ")[0]
  const lastName = document.getElementById("janitorName").value.split(" ").slice(1).join(" ")
  const email = document.getElementById("janitorEmail").value
  const phone = document.getElementById("janitorPhone").value
  const status = document.getElementById("janitorStatus").value

  try {
    const response = await fetch("api/add-janitor.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, phone, status }),
    })
    const data = await response.json()

    if (data.success) {
      alert("Janitor added successfully!")
      bootstrap.Modal.getInstance(document.getElementById("addJanitorModal")).hide()
      loadAllJanitors()
    } else {
      alert("Error: " + data.message)
    }
  } catch (error) {
    console.error("Error saving janitor:", error)
    alert("Error saving janitor")
  }
}

// Notifications Functions
async function loadNotifications(filter = "all") {
  try {
    const response = await fetch(`api/get-notifications.php?filter=${filter}`)
    const data = await response.json()

    if (data.success) {
      const tbody = document.getElementById("notificationsTableBody")
      tbody.innerHTML = ""

      if (data.notifications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No notifications found</td></tr>'
        return
      }

      data.notifications.forEach((notif) => {
        const row = `
                    <tr>
                        <td>${new Date(notif.created_at).toLocaleString()}</td>
                        <td>${notif.bin_code || "N/A"}</td>
                        <td class="d-none d-md-table-cell">${notif.location || "N/A"}</td>
                        <td><span class="badge bg-${getNotificationColor(notif.notification_type)}">${notif.notification_type}</span></td>
                        <td class="d-none d-lg-table-cell"><span class="badge bg-${notif.is_read ? "secondary" : "warning"}">
                            ${notif.is_read ? "Read" : "Unread"}
                        </span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-primary" onclick="viewNotification(${notif.notification_id})">View</button>
                        </td>
                    </tr>
                `
        tbody.innerHTML += row
      })

      if (data.unread_count > 0) {
        const notifBadge = document.getElementById("notificationCount")
        notifBadge.textContent = data.unread_count
        notifBadge.style.display = "block"
      }
    }
  } catch (error) {
    console.error("Error loading notifications:", error)
  }
}

// Reports Functions
async function loadReports() {
  try {
    const response = await fetch("api/get-reports.php")
    const data = await response.json()

    if (data.success) {
      const tbody = document.getElementById("reportsTableBody")
      tbody.innerHTML = ""

      if (data.reports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No reports found</td></tr>'
        return
      }

      data.reports.forEach((report) => {
        const row = `
                    <tr>
                        <td>${report.report_name}</td>
                        <td class="d-none d-md-table-cell"><span class="badge bg-info">${report.report_type}</span></td>
                        <td class="d-none d-lg-table-cell">${new Date(report.created_at).toLocaleDateString()}</td>
                        <td><span class="badge bg-${report.status === "completed" ? "success" : "warning"}">${report.status}</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-primary" onclick="downloadReport(${report.report_id})">Download</button>
                        </td>
                    </tr>
                `
        tbody.innerHTML += row
      })
    }
  } catch (error) {
    console.error("Error loading reports:", error)
  }
}

// Profile Functions
async function loadProfile() {
  try {
    const response = await fetch("api/get-profile.php")
    const data = await response.json()

    if (data.success) {
      const user = data.user
      document.getElementById("profileName").textContent = `${user.first_name} ${user.last_name}`
      document.getElementById("firstName").value = user.first_name
      document.getElementById("lastName").value = user.last_name
      document.getElementById("email").value = user.email
      document.getElementById("phoneNumber").value = user.phone
    }
  } catch (error) {
    console.error("Error loading profile:", error)
  }
}

async function updateProfile(e) {
  e.preventDefault()
  const data = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phoneNumber").value,
  }

  try {
    const response = await fetch("api/update-profile.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const result = await response.json()

    if (result.success) {
      alert("Profile updated successfully!")
      loadProfile()
    } else {
      alert("Error: " + result.message)
    }
  } catch (error) {
    console.error("Error updating profile:", error)
    alert("Error updating profile")
  }
}

// Helper Functions
function getStatusColor(status) {
  const colors = {
    empty: "success",
    needs_attention: "warning",
    full: "danger",
    in_progress: "info",
    out_of_service: "secondary",
  }
  return colors[status] || "secondary"
}

function getNotificationColor(type) {
  const colors = {
    critical: "danger",
    warning: "warning",
    info: "info",
    success: "success",
  }
  return colors[type] || "secondary"
}

function editBin(binId) {
  console.log("Edit bin:", binId)
}

function deleteBin(binId) {
  if (confirm("Are you sure you want to delete this bin?")) {
    console.log("Delete bin:", binId)
  }
}

function editJanitor(janitorId) {
  console.log("Edit janitor:", janitorId)
}

function deleteJanitor(janitorId) {
  if (confirm("Are you sure you want to delete this janitor?")) {
    console.log("Delete janitor:", janitorId)
  }
}

function viewNotification(notifId) {
  console.log("View notification:", notifId)
}

function downloadReport(reportId) {
  console.log("Download report:", reportId)
}

function showProfileTab(tab) {
  document.querySelectorAll(".tab-pane").forEach((el) => el.classList.remove("show", "active"))
  document.getElementById(tab).classList.add("show", "active")
}
