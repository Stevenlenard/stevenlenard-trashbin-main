<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Trashbin - Intelligent Waste Management System</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Header -->
    <header class="header">
        <div class="header-container">
            <div class="logo-section">
                <div class="logo-wrapper">
        <!-- 🗑️ SVG Animated Trash Logo -->
        <svg class="animated-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="35" width="40" height="50" rx="6" fill="#16a34a"/>
          <rect x="25" y="30" width="50" height="5" fill="#15803d"/>
          <rect x="40" y="20" width="20" height="8" rx="2" fill="#22c55e"/>
          <line x1="40" y1="45" x2="40" y2="80" stroke="#f0fdf4" stroke-width="3" />
          <line x1="50" y1="45" x2="50" y2="80" stroke="#f0fdf4" stroke-width="3" />
          <line x1="60" y1="45" x2="60" y2="80" stroke="#f0fdf4" stroke-width="3" />
        </svg>
      </div>
                <h1 class="brand-name">Smart Trashbin</h1>
            </div>
            <nav class="nav-buttons">
    <a href="login.php" class="btn btn-login">
        <i class="fas fa-sign-in-alt"></i> Login
    </a>
    <a href="registration.php" class="btn btn-signup">
        <i class="fas fa-user-plus"></i> Sign Up
    </a>
</nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h2 class="hero-title">Intelligent Waste Management System</h2>
            <p class="hero-subtitle">Real-time monitoring, automated alerts, and comprehensive reporting for efficient waste collection</p>
            <div class="hero-buttons">
    <a href="login.php" class="btn btn-primary">
        <i class="fas fa-rocket"></i> Get Started
    </a>
    <a href="about.php" class="btn btn-secondary">
        <i class="fas fa-info-circle"></i> Learn More
    </a>
</div>
        </div>
        <div class="hero-background">
            <div class="floating-shape shape-1"></div>
            <div class="floating-shape shape-2"></div>
            <div class="floating-shape shape-3"></div>
        </div>
    </section>

    <!-- Overview Section -->
    <section class="overview">
        <div class="container">
            <h2 class="section-title">System Overview</h2>
            <p class="section-subtitle">Comprehensive waste management at your fingertips</p>
            
            <div class="overview-grid">
                <div class="overview-card">
                    <div class="card-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Real-Time Monitoring</h3>
                    <p>Track all assigned waste bins with live status updates. Know exactly when bins are empty, half-full, or need immediate attention.</p>
                </div>
                <div class="overview-card">
                    <div class="card-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <h3>Smart Notifications</h3>
                    <p>Receive instant alerts when bins reach capacity. Never miss a collection opportunity with our intelligent notification system.</p>
                </div>
                <div class="overview-card">
                    <div class="card-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h3>Environmental Impact</h3>
                    <p>Reduce carbon footprint by optimizing collection routes. Prevent overflowing bins and promote a cleaner, healthier environment.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Bin Status Display -->
    <section class="bin-showcase">
        <div class="container">
            <h2 class="section-title">Bin Status Indicators</h2>
            <p class="section-subtitle">Visual representation of waste bin capacity levels</p>
            
            <div class="bins-grid">
                <!-- Empty Bin -->
                <div class="bin-card bin-empty">
                    <div class="bin-container">
                        <div class="bin-visual">
                            <div class="bin-fill" style="height: 10%;"></div>
                        </div>
                        <div class="bin-percentage">10%</div>
                    </div>
                    <div class="bin-status-badge">
                        <i class="fas fa-check-circle"></i> Empty
                    </div>
                    <p class="bin-location">Building A - Floor 1</p>
                </div>

                <!-- Half-Full Bin -->
                <div class="bin-card bin-half">
                    <div class="bin-container">
                        <div class="bin-visual">
                            <div class="bin-fill" style="height: 50%;"></div>
                        </div>
                        <div class="bin-percentage">50%</div>
                    </div>
                    <div class="bin-status-badge">
                        <i class="fas fa-exclamation-circle"></i> Half-Full
                    </div>
                    <p class="bin-location">Building A - Floor 2</p>
                </div>

                <!-- Full Bin -->
                <div class="bin-card bin-full">
                    <div class="bin-container">
                        <div class="bin-visual">
                            <div class="bin-fill" style="height: 100%;"></div>
                        </div>
                        <div class="bin-percentage">100%</div>
                    </div>
                    <div class="bin-status-badge">
                        <i class="fas fa-times-circle"></i> Full
                    </div>
                    <p class="bin-location">Building B - Floor 1</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <h2 class="section-title">Why Choose Smart Trashbin?</h2>
            <p class="section-subtitle">Industry-leading features for modern waste management</p>
            
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <h3>Instant Alerts</h3>
                    <p>Get real-time notifications when bins reach capacity, ensuring timely collection and maintenance.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>User-Friendly Interface</h3>
                    <p>Intuitive dashboard designed for both facility managers and janitors to manage waste efficiently.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <h3>Detailed Reporting</h3>
                    <p>Access comprehensive analytics to understand waste patterns and optimize collection strategies.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Secure & Reliable</h3>
                    <p>Enterprise-grade security ensures your data is protected with 24/7 system availability.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-expand"></i>
                    </div>
                    <h3>Scalable Solution</h3>
                    <p>Seamlessly scale from small facilities to large enterprises with hundreds of bins.</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-cog"></i>
                    </div>
                    <h3>Easy Integration</h3>
                    <p>Simple setup and integration with existing systems. Get up and running in minutes.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="footer">
  <div class="footer-content">
    <div class="footer-links">
      <a href="#privacy">Privacy Policy</a>
      <span class="separator">•</span>
      <a href="#terms">Terms of Service</a>
      <span class="separator">•</span>
      <a href="#support">Support</a>
    </div>

    <p class="footer-text" id="footerText"></p>
    <p class="footer-copyright">
      &copy; 2025 Smart Trashbin. All rights reserved.
    </p>
  </div>
</div>

    <script src="js/animation.js"></script>
</body>
</html>
