<template>
  <div class="login-container">
    <h1>Welcome back!</h1>
    <p class="subtitle">Please enter your details</p>

    <form @submit.prevent="handleSubmit">
      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message" role="alert" aria-live="polite">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {{ errorMessage }}
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper" :class="{ 'valid': emailTouched && emailValid, 'invalid': emailTouched && !emailValid && email }">
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="you@example.com" 
            required
            autocomplete="email"
            :disabled="isLoading"
            :aria-invalid="emailTouched && !emailValid && email ? 'true' : 'false'"
            :aria-describedby="emailTouched && !emailValid && email ? 'email-error' : undefined"
            @focus="emit('field-focus', 'email'); clearError()"
            @blur="emailTouched = true; emit('field-blur')"
          >
          <span v-if="emailTouched && emailValid" class="validation-icon valid-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span v-if="emailTouched && !emailValid && email" class="validation-icon invalid-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </span>
        </div>
        <span v-if="emailTouched && !emailValid && email" id="email-error" class="field-error" role="alert">Please enter a valid email address</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input-wrapper" :class="{ 'valid': passwordTouched && passwordValid, 'invalid': passwordTouched && !passwordValid && password }">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            placeholder="••••••••" 
            required
            autocomplete="current-password"
            minlength="8"
            :disabled="isLoading"
            :aria-invalid="passwordTouched && !passwordValid && password ? 'true' : 'false'"
            :aria-describedby="getPasswordAriaDescribedBy()"
            @focus="emit('field-focus', 'password'); clearError()"
            @blur="passwordTouched = true; emit('field-blur')"
          >
          <button type="button" class="toggle-password" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" :disabled="isLoading">
            <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </button>
        </div>
        <!-- Show error message only if password is invalid -->
        <span v-if="passwordTouched && !passwordValid && password" id="password-error" class="field-error" role="alert">Password must be at least 8 characters</span>
        
        <!-- Password Strength Indicator - only show if password is valid (8+ chars) -->
        <div v-if="password && passwordValid && passwordTouched" id="password-strength" class="password-strength" aria-live="polite">
          <div class="strength-bar" role="progressbar" :aria-valuenow="passwordStrength" aria-valuemin="0" aria-valuemax="5" :aria-label="'Password strength: ' + getPasswordStrengthLabel()">
            <div 
              class="strength-fill" 
              :style="{ width: (passwordStrength / 5 * 100) + '%', backgroundColor: getPasswordStrengthColor() }"
            ></div>
          </div>
          <span class="strength-label" :style="{ color: getPasswordStrengthColor() }">
            Password strength: {{ getPasswordStrengthLabel() }}
          </span>
        </div>
      </div>

      <div class="checkbox-group">
        <label for="remember" class="checkbox-label">
          <input type="checkbox" id="remember" v-model="remember"> Remember for 30 days
        </label>
        <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">Forgot password?</a>
      </div>

      <button type="submit" class="login-btn" :disabled="isLoading || isRateLimited">
        <span v-if="!isLoading">Log in</span>
        <span v-else class="loading-spinner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Logging in...
        </span>
      </button>
    </form>

    <div class="divider">
      <span class="divider-text">or</span>
    </div>

    <button class="google-login-btn" @click="handleGoogleLogin">
      <svg class="google-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Log in with Google
    </button>

    <div class="signup-link">
      Don't have an account? <a href="#" @click.prevent="handleSignUp">Sign up</a>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { isValidEmail, isValidPassword } from '../utils/validation.js'

const emit = defineEmits(['password-visibility-changed', 'field-focus', 'field-blur', 'login-attempt'])

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const loginAttempts = ref(0)
const isRateLimited = ref(false)

// Validation states
const emailTouched = ref(false)
const passwordTouched = ref(false)
const emailValid = ref(false)
const passwordValid = ref(false)
const passwordStrength = ref(0)

const MAX_ATTEMPTS = 5
const RATE_LIMIT_DURATION = 60000 // 1 minute

watch(showPassword, (newValue) => {
  emit('password-visibility-changed', newValue)
})

watch(email, (newValue) => {
  emailValid.value = isValidEmail(newValue)
})

watch(password, (newValue) => {
  passwordValid.value = isValidPassword(newValue)
  passwordStrength.value = calculatePasswordStrength(newValue)
})

const calculatePasswordStrength = (pwd) => {
  if (!pwd) return 0
  
  let strength = 0
  
  // Length check
  if (pwd.length >= 8) strength++
  if (pwd.length >= 12) strength++
  
  // Character variety
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/\d/.test(pwd)) strength++
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++
  
  return Math.min(strength, 5)
}

const getPasswordStrengthLabel = () => {
  if (passwordStrength.value === 0) return ''
  if (passwordStrength.value <= 2) return 'Weak'
  if (passwordStrength.value <= 3) return 'Fair'
  if (passwordStrength.value <= 4) return 'Good'
  return 'Strong'
}

const getPasswordStrengthColor = () => {
  if (passwordStrength.value <= 2) return '#f44336'
  if (passwordStrength.value <= 3) return '#ff9800'
  if (passwordStrength.value <= 4) return '#4caf50'
  return '#2e7d32'
}

const clearError = () => {
  errorMessage.value = ''
}

const handleSubmit = async () => {
  // Clear previous errors
  clearError()

  // Check rate limiting
  if (isRateLimited.value) {
    errorMessage.value = 'Too many login attempts. Please try again in a minute.'
    return
  }

  // Validate inputs
  if (!isValidEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  if (!isValidPassword(password.value)) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  isLoading.value = true
  loginAttempts.value++

  try {
    // TODO: Replace with actual API call
    // Simulating API call for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Example API call structure:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'X-CSRF-Token': getCsrfToken() // Add CSRF protection
    //   },
    //   credentials: 'same-origin',
    //   body: JSON.stringify({
    //     email: email.value,
    //     password: password.value,
    //     remember: remember.value
    //   })
    // })
    
    // if (!response.ok) {
    //   const error = await response.json()
    //   throw new Error(error.message || 'Login failed')
    // }
    
    // const data = await response.json()
    
    // Success - clear sensitive data
    const success = true // Replace with actual response check
    password.value = '' // Clear password from memory
    emit('login-attempt', success)
    
    // Reset attempts on success
    loginAttempts.value = 0
    
  } catch (error) {
    // Handle different error types
    if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage.value = 'Network error. Please check your connection and try again.'
    } else if (error.message.includes('credentials')) {
      errorMessage.value = 'Invalid email or password. Please try again.'
    } else {
      errorMessage.value = error.message || 'An error occurred. Please try again.'
    }
    
    emit('login-attempt', false)
    
    // Implement rate limiting after max attempts
    if (loginAttempts.value >= MAX_ATTEMPTS) {
      isRateLimited.value = true
      errorMessage.value = 'Too many failed attempts. Please try again in a minute.'
      
      setTimeout(() => {
        isRateLimited.value = false
        loginAttempts.value = 0
      }, RATE_LIMIT_DURATION)
    }
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  clearError()
  emit('login-attempt', true)
  // TODO: Implement OAuth flow
  // window.location.href = '/api/auth/google'
}

const handleForgotPassword = () => {
  // TODO: Navigate to forgot password page
  console.log('Forgot password clicked')
}

const handleSignUp = () => {
  // TODO: Navigate to sign up page
  console.log('Sign up clicked')
}

const getPasswordAriaDescribedBy = () => {
  const ids = []
  if (passwordTouched.value && !passwordValid.value && password.value) {
    ids.push('password-error')
  }
  if (password.value && passwordTouched.value) {
    ids.push('password-strength')
  }
  return ids.length > 0 ? ids.join(' ') : undefined
}
</script>

<style scoped>
.login-container {
  /* CSS Variables */
  --color-primary: #667eea;
  --color-primary-dark: #764ba2;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666;
  --color-text-tertiary: #999;
  --color-border: #ddd;
  --color-border-light: #ccc;
  --color-background: white;
  --color-background-hover: #f9f9f9;
  --color-background-disabled: #f5f5f5;
  --color-success: #4caf50;
  --color-success-dark: #2e7d32;
  --color-error: #f44336;
  --color-error-bg: #fee;
  --color-error-border: #fcc;
  --color-error-text: #c33;
  --color-warning: #ff9800;
  --spacing-xs: 6px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 14px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  --spacing-4xl: 48px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --transition-fast: 0.2s ease-out;
  --transition-normal: 0.3s ease;
  
  /* Styles */
  background: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: var(--spacing-4xl) 40px;
  width: 100%;
  max-width: 380px;
  animation: slideUp 0.6s ease-out;
  flex: 1;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-3xl);
}

.error-message {
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  color: var(--color-error-text);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 14px;
  margin-bottom: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideDown var(--transition-normal);
}

.error-message svg {
  flex-shrink: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: var(--spacing-2xl);
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.input-wrapper {
  position: relative;
}

.input-wrapper.valid input {
  border-color: var(--color-success);
}

.input-wrapper.invalid input {
  border-color: var(--color-error);
}

.validation-icon {
  position: absolute;
  right: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.valid-icon {
  color: var(--color-success);
}

.invalid-icon {
  color: var(--color-error);
}

.field-error {
  display: block;
  color: var(--color-error);
  font-size: 12px;
  margin-top: var(--spacing-xs);
  animation: slideDown var(--transition-fast);
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: all var(--transition-normal);
  font-family: inherit;
}

/* Hide native password reveal button in Edge/IE */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

/* Hide native password reveal button in Chrome/Safari */
input[type="password"]::-webkit-credentials-auto-fill-button,
input[type="password"]::-webkit-textfield-decoration-container {
  display: none !important;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Enhanced focus styles for keyboard navigation */
input[type="email"]:focus-visible,
input[type="password"]:focus-visible,
input[type="text"]:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

input:disabled {
  background: var(--color-background-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.password-input-wrapper input {
  padding-right: 45px;
  width: 100%;
}

.password-input-wrapper.valid input {
  border-color: var(--color-success);
}

.password-input-wrapper.invalid input {
  border-color: var(--color-error);
}

.password-strength {
  margin-top: var(--spacing-sm);
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.strength-fill {
  height: 100%;
  transition: all var(--transition-normal);
  border-radius: 2px;
}

.strength-label {
  font-size: 12px;
  font-weight: 500;
  transition: color var(--transition-normal);
}

.toggle-password {
  position: absolute;
  right: var(--spacing-md);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color var(--transition-normal);
}

.toggle-password:hover {
  color: var(--color-text-primary);
}

.toggle-password:focus {
  outline: none;
  color: var(--color-primary);
}

.toggle-password:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.toggle-password:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: var(--spacing-xs);
  cursor: pointer;
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-normal);
}

.forgot-password:hover {
  color: var(--color-primary-dark);
}

.forgot-password:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.login-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-text-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-bottom: 16px;
}

.login-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.login-btn:disabled {
  background: var(--color-text-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loading-spinner svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.divider {
  text-align: center;
  margin: var(--spacing-2xl) 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.divider-text {
  position: relative;
  background: var(--color-background);
  padding: 0 var(--spacing-md);
  color: var(--color-text-tertiary);
  font-size: 13px;
}

.google-login-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all var(--transition-normal);
  color: var(--color-text-primary);
}

.google-login-btn:hover {
  background: var(--color-background-hover);
  border-color: var(--color-border-light);
  transform: translateY(-2px);
}

.google-login-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.signup-link {
  text-align: center;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: var(--spacing-2xl);
}

.signup-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-normal);
}

.signup-link a:hover {
  color: var(--color-primary-dark);
}

.signup-link a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.checkbox-label {
  margin-bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

input[type="checkbox"]:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .login-form {
    padding: 32px 24px;
  }

  h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 13px;
    margin-bottom: 24px;
  }
}

@media (max-width: 480px) {
  .login-form {
    padding: 24px 20px;
    min-width: 280px;
  }

  h1 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-size: 13px;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    padding: 10px 12px;
    font-size: 14px;
  }

  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 20px;
  }

  .login-btn,
  .google-login-btn {
    padding: 12px;
    font-size: 14px;
  }

  .divider {
    margin: 20px 0;
  }

  .signup-link {
    font-size: 13px;
    margin-top: 20px;
  }
}
</style>
