<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bins - Admin | Trashbin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="admin-dashboard.css">
</head>
<body style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
  <nav class="navbar navbar-expand-lg navbar-dark bg-navy fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="admin-dashboard.php">
        <span class="brand-circle me-2"><i class="fa-solid fa-trash-can"></i></span>
        <span>Trashbin Admin</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="topNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item me-2">
            <a class="nav-link position-relative" href="notifications.php">
              <i class="fa-solid fa-bell"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i class="fa-solid fa-user-circle me-1"></i><span>Admin User</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="profile.php"><i class="fa-solid fa-user me-2"></i>Profile</a></li>
              <li><a class="dropdown-item" href="settings.php"><i class="fa-solid fa-gear me-2"></i>Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="login.php"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="dashboard d-flex">
    <aside class="sidebar" id="sidebar">
      <a href="admin-dashboard.php" class="sidebar-item"><i class="fa-solid fa-chart-pie"></i><span>Dashboard</span></a>
      <a href="bins.php" class="sidebar-item active"><i class="fa-solid fa-trash-can"></i><span>Bins</span></a>
      <a href="janitors.php" class="sidebar-item"><i class="fa-solid fa-users"></i><span>Janitors</span></a>
      <a href="reports.php" class="sidebar-item"><i class="fa-solid fa-chart-line"></i><span>Reports</span></a>
      <a href="notifications.php" class="sidebar-item"><i class="fa-solid fa-bell"></i><span>Notifications</span></a>
      <a href="settings.php" class="sidebar-item"><i class="fa-solid fa-gear"></i><span>Settings</span></a>
    </aside>

    <main class="content">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h4 mb-0">Bin Management</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBinModal"><i class="fa-solid fa-plus me-1"></i>Add New Bin</button>
      </div>

      <div class="dashboard-card mb-3">
        <div class="card-header"><h5 class="card-title mb-0">Bins Overview</h5></div>
        <div class="row g-3 p-3" id="binGrid"></div>
      </div>

      <div class="dashboard-card">
        <div class="table-responsive">
          <table class="table table-dark">
            <thead><tr><th>Bin ID</th><th>Location</th><th>Status</th><th>Last Collection</th><th>Janitor</th><th>Actions</th></tr></thead>
            <tbody id="binsTableBody"></tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <!-- Modal reuse -->
  <div class="modal fade" id="addBinModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Bin</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="addBinForm">
            <div class="mb-3">
              <label for="binId" class="form-label">Bin ID</label>
              <input type="text" class="form-control" id="binId" required>
            </div>
            <div class="mb-3">
              <label for="binLocation" class="form-label">Location</label>
              <input type="text" class="form-control" id="binLocation" required>
            </div>
            <div class="mb-3">
              <label for="binType" class="form-label">Bin Type</label>
              <select class="form-control" id="binType" required>
                <option value="general">General Waste</option>
                <option value="recyclable">Recyclable</option>
                <option value="organic">Organic</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="saveBin">Save Bin</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="dashboard.js"></script>
</body>
</html>
