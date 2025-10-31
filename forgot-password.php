<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Trashbin - Forgot Password</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="css/forgot-password.css">
</head>
<body>

<?php include 'includes/header.php'; ?>
  <!-- Header -->
  <div id="header-container"></div>

  <div class="forgot-container">
    <div class="forgot-wrapper">
      <div class="forgot-header">
        <div class="forgot-icon">
          <i class="fas fa-lock"></i>
        </div>
        <h1>Forgot Password?</h1>
        <p>No worries! We'll help you reset it.</p>
      </div>

      <div class="forgot-content">
        <form id="forgotForm">
          <div class="form-group">
            <label for="resetEmail">Email Address</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input type="email" id="resetEmail" name="email" placeholder="Enter your registered email" required>
            </div>
            <div class="error-message" id="emailError"></div>
          </div>

          <button type="submit" class="btn-primary">
            <i class="fas fa-paper-plane me-2"></i> Send Reset Link
          </button>
          <button type="button" class="btn-secondary" onclick="window.history.back()">
            <i class="fas fa-arrow-left me-2"></i> Back to Login
          </button>
        </form>
      </div>
    </div>
  </div>

  
  <?php include 'includes/footer.php'; ?>

  <!-- Footer -->
  <div id="footer-container"></div>
  
</body>
</html>
