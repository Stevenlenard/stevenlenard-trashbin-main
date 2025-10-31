// ============================================
// MERGED LOGIN FORM - VALIDATION & SUBMISSION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const togglePassword = document.getElementById("togglePassword")

  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener("click", (e) => {
      e.preventDefault()
      const icon = togglePassword.querySelector("i")
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

  // Handle form submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = emailInput.value.trim()
      const password = passwordInput.value.trim()

      // Basic validation
      if (!email || !password) {
        console.log("[v0] Validation failed: email or password empty")
        alert("Please fill in all fields")
        return
      }

      try {
        console.log("[v0] Submitting login form with email:", email)

        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        const response = await fetch("login-handler.php", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          console.log("[v0] Response not ok:", response.status, response.statusText)
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] Login response:", data)

        if (data.success) {
          console.log("[v0] Login successful, redirecting to:", data.redirect)
          window.location.href = data.redirect
        } else {
          const errorMessage = data.errors?.general || data.message || "Login failed. Please check your credentials."
          console.log("[v0] Login error:", errorMessage)

          // Display field-specific errors if available
          if (data.errors?.email) {
            document.getElementById("emailError").textContent = data.errors.email
          }
          if (data.errors?.password) {
            document.getElementById("passwordError").textContent = data.errors.password
          }

          alert(errorMessage)
        }
      } catch (error) {
        console.error("[Error during login:", error)
        alert("An error occurred. Please try again. Check console for details.")
      }
    })
  }
})
