<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in, redirect to login if not
if (!isset($_SESSION['user_id'])) {
    // Allow access to login and registration pages
    $allowed_pages = ['login.php', 'registration.php', 'forgot-password.php'];
    $current_page = basename($_SERVER['PHP_SELF']);
    
    if (!in_array($current_page, $allowed_pages)) {
        header('Location: login.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Trashbin - Management System</title>
    <!-- Added both admin and login CSS -->
    <link rel="stylesheet" href="css/admin-dashboard.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Added actual navigation header content -->
<link rel="stylesheet" href="css/header.css">

<header class="header">
  <div class="header-container">

    <!-- Logo + Title Section -->
    <a href="admin-dashboard.php" class="logo-section">
      <div class="logo-wrapper">
        <!-- SVG Animated Trash Logo -->
        <svg class="animated-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="35" width="40" height="50" rx="6" fill="#16a34a"/>
          <rect x="25" y="30" width="50" height="5" fill="#15803d"/>
          <rect x="40" y="20" width="20" height="8" rx="2" fill="#22c55e"/>
          <line x1="40" y1="45" x2="40" y2="80" stroke="#f0fdf4" stroke-width="3" />
          <line x1="50" y1="45" x2="50" y2="80" stroke="#f0fdf4" stroke-width="3" />
          <line x1="60" y1="45" x2="60" y2="80" stroke="#f0fdf4" stroke-width="3" />
        </svg>
      </div>

      <div class="logo-text">
        <h1>Smart Trashbin</h1>
        <p>Intelligent Waste Management System</p>
      </div>
    </a>

    <!-- Navigation -->
    <nav class="nav-links">
      <a href="admin-dashboard.php">Dashboard</a>
      <a href="bins.php">Bins</a>
      <a href="janitors.php">Janitors</a>
      <a href="reports.php">Reports</a>
      <a href="notifications.php">Notifications</a>
    </nav>

  </div>
</header>
