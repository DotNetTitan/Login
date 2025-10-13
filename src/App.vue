<template>
  <div class="container">
    <Characters 
      :isPasswordVisible="isPasswordVisible" 
      :activeField="activeField"
      :loginState="loginState"
    />
    <LoginForm 
      @password-visibility-changed="isPasswordVisible = $event"
      @field-focus="activeField = $event"
      @field-blur="activeField = null"
      @login-attempt="handleLoginAttempt"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Characters from './components/Characters.vue'
import LoginForm from './components/LoginForm.vue'

const isPasswordVisible = ref(false)
const activeField = ref(null)
const loginState = ref(null) // null, 'success', 'error'

const handleLoginAttempt = (success) => {
  loginState.value = success ? 'success' : 'error'
  
  // Reset state after animation
  setTimeout(() => {
    loginState.value = null
  }, 2000)
}
</script>
