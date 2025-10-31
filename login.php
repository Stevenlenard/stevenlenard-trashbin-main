<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Trashbin - Login</title>
  <link rel="stylesheet" href="css/login.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<?php include 'includes/header.php'; ?>

  <div class="login-container">
    <div class="login-wrapper">
      <!-- Left Side - Branding -->
      <div class="login-branding">
        <div class="branding-content">
          <!-- Decorative circles -->
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>

          <!-- Container box for branding text -->
          <div class="branding-box">
            <div class="logo-circle">
              <i class="fas fa-trash-alt"></i>
            </div>
            <h1>Smart Trashbin</h1>
            <p>Intelligent Waste Management System</p>
          </div>

          <div class="features-list">
            <div class="feature-item">
              <i class="fas fa-chart-line"></i>
              <span>Real-time Monitoring</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-bell"></i>
              <span>Automated Alerts</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-chart-bar"></i>
              <span>Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="login-form-section">
        <div class="form-container">
          <!-- Centered header with green "Welcome Back" -->
          <div class="form-header">
            <h2><span class="header-highlight">Welcome Back</span></h2>
            <p>Sign in to your account</p>
          </div>

          <!-- Login Form -->
          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope"></i>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
              </div>
              <div class="error-message" id="emailError"></div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                <button type="button" class="toggle-password" id="togglePassword">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
              <div class="error-message" id="passwordError"></div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" name="remember">
                <span>Remember me</span>
              </label>
              <a href="forgot-password.php" class="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" class="btn-primary">Sign In</button>
          </form>

          <div class="divider"><span>or continue with</span></div>

          <div class="social-login">
            <button type="button" class="social-btn google-btn" style="grid-column: 1 / -1;">
              <i class="fab fa-google"></i>
              <span>Continue with Google</span>
            </button>
          </div>

          <div class="auth-footer">
            <p>Don't have an account? <a href="registration.php">Sign up here</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

    <?php include 'includes/footer.php'; ?>

  <script src="js/login.js"></script>
</body>
</html>
