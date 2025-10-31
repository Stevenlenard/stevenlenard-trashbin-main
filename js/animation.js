document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Button hover animations
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all cards and items
  document
    .querySelectorAll(".overview-card, .bin-card, .feature-item, .value-card, .process-step, .benefit-card, .tech-item")
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })

  // Animated counter for statistics (if needed)
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      element.textContent = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  // Logo animation enhancement
  const logo = document.querySelector(".animated-logo")
  if (logo) {
    logo.addEventListener("mouseenter", function () {
      this.style.animation = "float 1s ease-in-out infinite"
    })
    logo.addEventListener("mouseleave", function () {
      this.style.animation = "float 3s ease-in-out infinite"
    })
  }

  // Bin fill animation on scroll
  const binCards = document.querySelectorAll(".bin-card")
  binCards.forEach((card) => {
    const binFill = card.querySelector(".bin-fill")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binFill.style.animation = "fillAnimation 1.5s ease-out forwards"
        }
      })
    })
    observer.observe(card)
  })

  // Add CSS animation for bin fill
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fillAnimation {
            from {
                opacity: 0;
                transform: scaleY(0);
                transform-origin: bottom;
            }
            to {
                opacity: 1;
                transform: scaleY(1);
            }
        }
    `
  document.head.appendChild(style)
})
