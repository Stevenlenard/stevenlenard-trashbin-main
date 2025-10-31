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
      console.log("[v0] Login form submitted")

      const email = emailInput.value.trim()
      const password = passwordInput.value.trim()

      // Basic validation
      if (!email || !password) {
        alert("Please fill in all fields")
        return
      }

      try {
        console.log("[v0] Sending login request to login-handler.php")
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        const response = await fetch("login-handler.php", {
          method: "POST",
          body: formData,
        })

        console.log("[v0] Response received, status:", response.status)
        const data = await response.json()
        console.log("[v0] Response data:", data)

        if (data.success) {
          console.log("[v0] Login successful, redirecting to:", data.redirect)
          window.location.href = data.redirect
        } else {
          console.log("[v0] Login failed:", data.message)
          alert(data.message || "Login failed. Please check your credentials.")
        }
      } catch (error) {
        console.error("[v0] Error during login:", error)
        alert("An error occurred. Please try again.")
      }
    })
  }
})
