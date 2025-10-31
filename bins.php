<?php
require_once 'includes/config.php';

if (!isLoggedIn() || !isAdmin()) {
    header('Location: login.php');
    exit;
}

$janitors_query = "SELECT user_id, CONCAT(first_name, ' ', last_name) as full_name FROM users WHERE role = 'janitor' AND status = 'active' ORDER BY first_name";
$janitors_result = $conn->query($janitors_query);
$janitors = [];
if ($janitors_result) {
    while ($row = $janitors_result->fetch_assoc()) {
        $janitors[] = $row;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bins Management - Trashbin Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/admin-dashboard.css">
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="admin-dashboard.php">
        <span class="brand-circle me-2"><i class="fa-solid fa-trash-can"></i></span>
        <span class="d-none d-sm-inline">Trashbin Admin</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="topNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item me-2">
            <a class="nav-link position-relative" href="notifications.php" title="Notifications">
              <i class="fa-solid fa-bell"></i>
              <span class="badge rounded-pill bg-danger position-absolute translate-middle" id="notificationCount" style="top:8px; left:18px; display:none;">0</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="profile.php" title="My Profile">
              <i class="fa-solid fa-user me-1"></i><span class="d-none d-sm-inline">Profile</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="logout.php">
              <i class="fa-solid fa-right-from-bracket me-1"></i><span class="d-none d-sm-inline">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header d-none d-md-block">
        <h6 class="sidebar-title">Menu</h6>
      </div>
      <a href="admin-dashboard.php" class="sidebar-item">
        <i class="fa-solid fa-chart-pie"></i><span>Dashboard</span>
      </a>
      <a href="bins.php" class="sidebar-item active">
        <i class="fa-solid fa-trash-alt"></i><span>Bins</span>
      </a>
      <a href="janitors.php" class="sidebar-item">
        <i class="fa-solid fa-users"></i><span>Janitors</span>
      </a>
      <a href="reports.php" class="sidebar-item">
        <i class="fa-solid fa-chart-line"></i><span>Reports</span>
      </a>
      <a href="notifications.php" class="sidebar-item">
        <i class="fa-solid fa-bell"></i><span>Notifications</span>
      </a>
      <a href="profile.php" class="sidebar-item">
        <i class="fa-solid fa-user"></i><span>My Profile</span>
      </a>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <div class="section-header flex-column flex-md-row">
        <div>
          <h1 class="page-title">Bin Management</h1>
          <p class="page-subtitle">Manage all trashbins in the system</p>
        </div>
        <div class="d-flex gap-2 flex-column flex-md-row mt-3 mt-md-0">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0"><i class="fas fa-search text-muted"></i></span>
            <input type="text" class="form-control border-start-0 ps-0" id="searchBinsInput" placeholder="Search bins...">
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="filterBinsDropdown" data-bs-toggle="dropdown">
              <i class="fas fa-filter me-1"></i>Filter
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="filterBinsDropdown">
              <li><a class="dropdown-item" href="#" data-filter="all">All Bins</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" data-filter="full">Full</a></li>
              <li><a class="dropdown-item" href="#" data-filter="empty">Empty</a></li>
              <li><a class="dropdown-item" href="#" data-filter="needs_attention">Needs Attention</a></li>
            </ul>
          </div>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBinModal">
            <i class="fas fa-plus me-1"></i>Add New Bin
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th>Bin ID</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th class="d-none d-lg-table-cell">Capacity</th>
                  <th class="d-none d-md-table-cell">Assigned To</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody id="allBinsTableBody">
                <tr>
                  <td colspan="7" class="text-center py-4 text-muted">No bins found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Add Bin Modal -->
  <div class="modal fade" id="addBinModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="fas fa-trash-can me-2"></i>Add New Bin</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form id="addBinForm">
            <!-- Removed binId field - bin_id auto-generates in database -->
            <div class="mb-3">
              <label for="binCode" class="form-label">Bin Code</label>
              <input type="text" class="form-control" id="binCode" required>
            </div>
            <div class="mb-3">
              <label for="binLocation" class="form-label">Location</label>
              <input type="text" class="form-control" id="binLocation" required>
            </div>
            <div class="mb-3">
              <label for="binType" class="form-label">Bin Type</label>
              <select class="form-select" id="binType" required>
                <option value="">Select type</option>
                <option value="General">General Waste</option>
                <option value="Recyclable">Recyclable</option>
                <option value="Organic">Organic</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="binCapacity" class="form-label">Capacity (%)</label>
              <input type="number" class="form-control" id="binCapacity" min="0" max="100" value="0" required>
            </div>
            <div class="mb-3">
              <label for="binStatus" class="form-label">Status</label>
              <select class="form-select" id="binStatus" required>
                <option value="">Select status</option>
                <option value="empty">Empty</option>
                <option value="full">Full</option>
                <option value="needs_attention">Needs Attention</option>
              </select>
            </div>
            <!-- Added Assign Janitor field to the form -->
            <div class="mb-3">
              <label for="binAssignedJanitor" class="form-label">Assign Janitor</label>
              <select class="form-select" id="binAssignedJanitor">
                <option value="">Select janitor (optional)</option>
                <?php foreach ($janitors as $janitor): ?>
                  <option value="<?php echo $janitor['user_id']; ?>"><?php echo htmlspecialchars($janitor['full_name']); ?></option>
                <?php endforeach; ?>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveNewBin()">Save Bin</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/database.js"></script>
  <script src="js/dashboard.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      loadAllBins();
      
      const addBinModal = document.getElementById('addBinModal');
      if (addBinModal) {
        addBinModal.addEventListener('show.bs.modal', function() {
          loadJanitorsForBinForm();
        });
      }
      
      // Search functionality
      document.getElementById('searchBinsInput').addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('#allBinsTableBody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
      });

      // Filter functionality
      document.querySelectorAll('#filterBinsDropdown + .dropdown-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const filter = this.getAttribute('data-filter');
          loadAllBins(filter);
        });
      });
    });
  </script>
</body>
</html>
