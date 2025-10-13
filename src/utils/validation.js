/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Password validation - at least 8 characters
 */
export const isValidPassword = (password) => {
  return password && password.length >= 8
}

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}
