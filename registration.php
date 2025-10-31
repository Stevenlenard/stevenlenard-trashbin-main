<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Trashbin - Sign Up</title>
  <link rel="stylesheet" href="css/registration.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<?php include 'includes/header.php'; ?>

  <div class="registration-container">
    <div class="registration-wrapper">
      <!-- Left Side - Info -->
      <div class="registration-info">
        <!-- Decorative circles -->
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>

        <div class="info-content">
          <div class="logo-circle">
            <i class="fas fa-trash-alt"></i>
          </div>
          <h1>Join Smart Trashbin</h1>
          <p>Start managing waste efficiently today</p>
          <div class="benefits-list">
            <div class="benefit-item">
              <i class="fas fa-cog"></i>
              <span>Easy Setup</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-headset"></i>
              <span>24/7 Support</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-shield-alt"></i>
              <span>Secure & Reliable</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-sync-alt"></i>
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Registration Form -->
      <div class="registration-form-section">
        <div class="form-container">
          <!-- Centered header with green "Sign Up Here" and larger text -->
          <div class="signup-header">
            <h3><span class="header-highlight">Sign Up Here</span></h3>
            <p>Create your account in just a few steps</p>
          </div>

          <!-- Registration Form -->
          <form id="registrationForm" class="auth-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <div class="input-wrapper">
                  <i class="fas fa-user"></i>
                  <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required>
                </div>
                <div class="error-message" id="firstNameError"></div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <div class="input-wrapper">
                  <i class="fas fa-user"></i>
                  <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required>
                </div>
                <div class="error-message" id="lastNameError"></div>
              </div>
            </div>

            <div class="form-group">
              <label for="regEmail">Email Address</label>
              <div class="input-wrapper">
                <i class="fas fa-envelope"></i>
                <input type="email" id="regEmail" name="email" placeholder="Enter your email address" required>
              </div>
              <div class="error-message" id="emailError"></div>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <div class="input-wrapper">
                <i class="fas fa-phone"></i>
                <input type="tel" id="phone" name="phone" placeholder="Enter your 11-digit phone number" required>
              </div>
              <div class="error-message" id="phoneError"></div>
            </div>

            <div class="form-group">
              <label for="regPassword">Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input type="password" id="regPassword" name="password" placeholder="Enter your password" required>
                <!-- Fixed eye icon button -->
                <button type="button" class="toggle-password" id="toggleRegPassword">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
              <div class="error-message" id="passwordError"></div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock"></i>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
                <!-- Fixed eye icon button -->
                <button type="button" class="toggle-password" id="toggleConfirmPassword">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
              <div class="error-message" id="confirmPasswordError"></div>
            </div>

            <label class="terms-checkbox">
              <input type="checkbox" name="terms" required>
              <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
            </label>

            <button type="submit" class="btn-primary">Create Account</button>
          </form>

          <!-- Divider -->
          <div class="divider">
            <span>or sign up with</span>
          </div>

          <!-- Social Registration -->
          <div class="social-login">
            <button type="button" class="social-btn google-btn" style="grid-column: 1 / -1;">
              <i class="fab fa-google"></i>
              <span>Sign up with Google</span>
            </button>
          </div>

          <!-- Sign In Link -->
          <div class="auth-footer">
            <p>Already have an account? <a href="login.php">Sign in here</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

   <?php include 'includes/footer.php'; ?>

  <script src="js/registration.js"></script>
</body>
</html>
