<template>
  <div class="login-container">
    <h1>Welcome back!</h1>
    <p class="subtitle">Please enter your details</p>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="you@example.com" 
          required
          autocomplete="email"
          @focus="emit('field-focus', 'email')"
          @blur="emit('field-blur')"
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input-wrapper">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            placeholder="••••••••" 
            required
            autocomplete="current-password"
            minlength="8"
            @focus="emit('field-focus', 'password')"
            @blur="emit('field-blur')"
          >
          <button type="button" class="toggle-password" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
            <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="checkbox-group">
        <label style="margin-bottom: 0;">
          <input type="checkbox" id="remember" v-model="remember"> Remember for 30 days
        </label>
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>

      <button type="submit" class="login-btn">Log in</button>
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
      Don't have an account? <a href="#">Sign up</a>
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

watch(showPassword, (newValue) => {
  emit('password-visibility-changed', newValue)
})

const handleSubmit = async () => {
  // Validate inputs
  if (!isValidEmail(email.value) || !isValidPassword(password.value)) {
    emit('login-attempt', false)
    return
  }

  const success = isValidEmail(email.value) && isValidPassword(password.value)
  emit('login-attempt', success)
  
  // TODO: Replace with actual API call
  // try {
  //   const response = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       email: email.value,
  //       password: password.value,
  //       remember: remember.value
  //     })
  //   })
  //   const data = await response.json()
  //   if (data.success) {
  //     // Handle successful login (redirect, store token, etc.)
  //   }
  // } catch (error) {
  //   console.error('Login error:', error)
  //   emit('login-attempt', false)
  // }
}

const handleGoogleLogin = () => {
  emit('login-attempt', true)
  // TODO: Implement OAuth flow
  // window.location.href = '/api/auth/google'
}
</script>

<style scoped>
.login-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 48px 40px;
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
  color: #1a1a1a;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper input {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #333;
}

.toggle-password:focus {
  outline: none;
  color: #667eea;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: 6px;
  cursor: pointer;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #764ba2;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.login-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.login-btn:active {
  transform: translateY(0);
}

.divider {
  text-align: center;
  margin: 24px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider-text {
  position: relative;
  background: white;
  padding: 0 12px;
  color: #999;
  font-size: 13px;
}

.google-login-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  color: #333;
}

.google-login-btn:hover {
  background: #f9f9f9;
  border-color: #ccc;
  transform: translateY(-2px);
}

.google-icon {
  width: 18px;
  height: 18px;
}

.signup-link {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 24px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #764ba2;
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
