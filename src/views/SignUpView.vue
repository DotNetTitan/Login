<template>
  <div class="container">
    <Characters 
      :isPasswordVisible="isPasswordVisible" 
      :activeField="activeField"
      :loginState="loginState"
    />
    <SignUpForm 
      @password-visibility-changed="isPasswordVisible = $event"
      @field-focus="activeField = $event"
      @field-blur="activeField = null"
      @signup-attempt="handleSignUpAttempt"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Characters from '../components/Characters.vue'
import SignUpForm from '../components/SignUpForm.vue'

const isPasswordVisible = ref(false)
const activeField = ref(null)
const loginState = ref(null)

const handleSignUpAttempt = (success) => {
  loginState.value = success ? 'success' : 'error'
  
  setTimeout(() => {
    loginState.value = null
  }, 2000)
}
</script>
