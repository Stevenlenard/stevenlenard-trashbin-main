// ============================================
// REGISTRATION PAGE VALIDATION & FUNCTIONALITY
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Registration page loaded")

  const registrationForm = document.getElementById("registrationForm")
  const firstNameInput = document.getElementById("firstName")
  const lastNameInput = document.getElementById("lastName")
  const emailInput = document.getElementById("regEmail")
  const phoneInput = document.getElementById("phone")
  const passwordInput = document.getElementById("regPassword")
  const confirmPasswordInput = document.getElementById("confirmPassword")
  const toggleRegPassword = document.getElementById("toggleRegPassword")
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword")

  if (!registrationForm) {
    console.error("[v0] Registration form not found!")
    return
  }
  console.log("[v0] Registration form found")

  if (toggleRegPassword) {
    toggleRegPassword.addEventListener("click", (e) => {
      e.preventDefault()
      const icon = toggleRegPassword.querySelector("i")
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
  }

  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener("click", (e) => {
      e.preventDefault()
      const icon = toggleConfirmPassword.querySelector("i")
      if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        confirmPasswordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  }

  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("[v0] Registration form submitted")

    const firstName = document.getElementById("firstName").value.trim()
    const lastName = document.getElementById("lastName").value.trim()
    const email = document.getElementById("regEmail").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const password = document.getElementById("regPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const termsCheckbox = registrationForm.querySelector('input[name="terms"]')

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      alert("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }

    if (!termsCheckbox.checked) {
      alert("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    try {
      console.log("[v0] Sending registration request...")
      const submitBtn = registrationForm.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = "Creating Account..."

      const formData = new FormData(registrationForm)

      const response = await fetch("register-handler.php", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Response status:", response.status)
      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (data.success) {
        console.log("[v0] Registration successful")
        alert(data.message)
        setTimeout(() => {
          window.location.href = "login.php"
        }, 1500)
      } else {
        console.log("[v0] Registration failed:", data.message)
        submitBtn.disabled = false
        submitBtn.textContent = "Create Account"
        alert(data.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error during registration:", error)
      const submitBtn = registrationForm.querySelector('button[type="submit"]')
      submitBtn.disabled = false
      submitBtn.textContent = "Create Account"
      alert("An error occurred. Please try again.")
    }
  })

  // Validation for first name
  if (firstNameInput) {
    firstNameInput.addEventListener("blur", () => {
      const error = document.getElementById("firstNameError")
      if (firstNameInput.value.trim() === "") {
        firstNameInput.classList.add("error")
        firstNameInput.classList.remove("success")
        error.textContent = "First name is required"
        error.classList.add("show")
      } else if (!/^[a-zA-Z\s]+$/.test(firstNameInput.value)) {
        firstNameInput.classList.add("error")
        firstNameInput.classList.remove("success")
        error.textContent = "First name can only contain letters"
        error.classList.add("show")
      } else {
        firstNameInput.classList.remove("error")
        firstNameInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    firstNameInput.addEventListener("input", () => {
      document.getElementById("firstNameError").classList.remove("show")
      firstNameInput.classList.remove("error")
    })
  }

  // Validation for last name
  if (lastNameInput) {
    lastNameInput.addEventListener("blur", () => {
      const error = document.getElementById("lastNameError")
      if (lastNameInput.value.trim() === "") {
        lastNameInput.classList.add("error")
        lastNameInput.classList.remove("success")
        error.textContent = "Last name is required"
        error.classList.add("show")
      } else if (!/^[a-zA-Z\s]+$/.test(lastNameInput.value)) {
        lastNameInput.classList.add("error")
        lastNameInput.classList.remove("success")
        error.textContent = "Last name can only contain letters"
        error.classList.add("show")
      } else {
        lastNameInput.classList.remove("error")
        lastNameInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    lastNameInput.addEventListener("input", () => {
      document.getElementById("lastNameError").classList.remove("show")
      lastNameInput.classList.remove("error")
    })
  }

  // Validation for email
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      const error = document.getElementById("emailError")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (emailInput.value.trim() === "") {
        emailInput.classList.add("error")
        emailInput.classList.remove("success")
        error.textContent = "Email is required"
        error.classList.add("show")
      } else if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("error")
        emailInput.classList.remove("success")
        error.textContent = "Please enter a valid email address"
        error.classList.add("show")
      } else {
        emailInput.classList.remove("error")
        emailInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    emailInput.addEventListener("input", () => {
      document.getElementById("emailError").classList.remove("show")
      emailInput.classList.remove("error")
    })
  }

  // Validation for phone
  if (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      const error = document.getElementById("phoneError")
      const cleanPhone = phoneInput.value.replace(/\D/g, "")
      const phoneRegex = /^\d{11}$/

      if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("error")
        phoneInput.classList.remove("success")
        error.textContent = "Phone number is required"
        error.classList.add("show")
      } else if (!phoneRegex.test(cleanPhone)) {
        phoneInput.classList.add("error")
        phoneInput.classList.remove("success")
        error.textContent = "Phone number must be exactly 11 digits"
        error.classList.add("show")
      } else {
        phoneInput.classList.remove("error")
        phoneInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    phoneInput.addEventListener("input", () => {
      document.getElementById("phoneError").classList.remove("show")
      phoneInput.classList.remove("error")
    })
  }

  // Validation for password
  if (passwordInput) {
    passwordInput.addEventListener("blur", () => {
      const error = document.getElementById("passwordError")
      const password = passwordInput.value

      if (password === "") {
        passwordInput.classList.add("error")
        passwordInput.classList.remove("success")
        error.textContent = "Password is required"
        error.classList.add("show")
      } else if (password.length < 8) {
        passwordInput.classList.add("error")
        passwordInput.classList.remove("success")
        error.textContent = "Password must be at least 8 characters"
        error.classList.add("show")
      } else {
        passwordInput.classList.remove("error")
        passwordInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    passwordInput.addEventListener("input", () => {
      document.getElementById("passwordError").classList.remove("show")
      passwordInput.classList.remove("error")
    })
  }

  // Validation for confirm password
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("blur", () => {
      const error = document.getElementById("confirmPasswordError")
      const password = passwordInput.value
      const confirmPassword = confirmPasswordInput.value

      if (confirmPassword === "") {
        confirmPasswordInput.classList.add("error")
        confirmPasswordInput.classList.remove("success")
        error.textContent = "Please confirm your password"
        error.classList.add("show")
      } else if (password !== confirmPassword) {
        confirmPasswordInput.classList.add("error")
        confirmPasswordInput.classList.remove("success")
        error.textContent = "Passwords do not match"
        error.classList.add("show")
      } else {
        confirmPasswordInput.classList.remove("error")
        confirmPasswordInput.classList.add("success")
        error.classList.remove("show")
      }
    })

    confirmPasswordInput.addEventListener("input", () => {
      document.getElementById("confirmPasswordError").classList.remove("show")
      confirmPasswordInput.classList.remove("error")
    })
  }
})
