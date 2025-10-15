<template>
  <div class="characters-section">
    <div 
      class="character" 
      v-for="(char, index) in characters" 
      :key="index" 
      :style="{ animationDelay: `${index * 0.5}s` }"
      :class="{
        'celebrating': loginState === 'success',
        'shaking': loginState === 'error'
      }"
    >
      <div class="char-body" :class="[
        char.color, 
        char.personality, 
        { 'shy': isPasswordVisible },
        { 'happy-jump': loginState === 'success' }
      ]">
        <div class="eyebrows" :class="[
          char.personality, 
          { 'raised': isPasswordVisible },
          { 'excited': loginState === 'success' }
        ]">
          <div class="eyebrow left" :class="{ small: char.smallEyes }"></div>
          <div class="eyebrow right" :class="{ small: char.smallEyes }"></div>
        </div>
        <div class="eyes" :class="{ 'wide': isPasswordVisible }">
          <div class="eye" :class="[{ small: char.smallEyes }, `blink-${index}`]">
            <div class="pupil" :class="{ small: char.smallEyes }" ref="pupils"></div>
          </div>
          <div class="eye" :class="[{ small: char.smallEyes }, `blink-${index}`]">
            <div class="pupil" :class="{ small: char.smallEyes }" ref="pupils"></div>
          </div>
        </div>
        <div class="mouth" :class="[
          { small: char.smallMouth }, 
          isPasswordVisible ? `surprised-${char.personality}` : char.personality,
          { 'big-smile': loginState === 'success' }
        ]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isPasswordVisible: Boolean,
  activeField: String,
  loginState: String
})

const pupils = ref([])

const characters = [
  { color: 'orange', smallEyes: true, smallMouth: true, personality: 'worried' },
  { color: 'black', smallEyes: false, smallMouth: false, personality: 'cool' },
  { color: 'yellow', smallEyes: false, smallMouth: false, personality: 'happy' }
]

const lookAtField = (fieldName) => {
  if (!fieldName) return null
  
  // Find the input field element
  const field = document.getElementById(fieldName)
  if (!field) return null
  
  const fieldRect = field.getBoundingClientRect()
  return {
    x: fieldRect.left + fieldRect.width / 2,
    y: fieldRect.top + fieldRect.height / 2
  }
}

const updatePupilPositions = () => {
  if (props.isPasswordVisible) {
    // Look away when password is visible
    pupils.value.forEach(pupil => {
      if (!pupil) return
      pupil.style.transform = 'translate(-6px, 0px)'
    })
    return
  }

  if (props.activeField) {
    // Look at the active input field
    const fieldPosition = lookAtField(props.activeField)
    if (!fieldPosition) return
    
    pupils.value.forEach(pupil => {
      if (!pupil) return
      const eye = pupil.parentElement
      const eyeRect = eye.getBoundingClientRect()
      const eyeCenterX = eyeRect.left + eyeRect.width / 2
      const eyeCenterY = eyeRect.top + eyeRect.height / 2

      const angle = Math.atan2(fieldPosition.y - eyeCenterY, fieldPosition.x - eyeCenterX)
      const distance = 6

      const pupilX = Math.cos(angle) * distance
      const pupilY = Math.sin(angle) * distance

      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
    })
  }
}

const handleMouseMove = (e) => {
  if (props.isPasswordVisible || props.activeField) return
  
  pupils.value.forEach(pupil => {
    if (!pupil) return
    const eye = pupil.parentElement
    const eyeRect = eye.getBoundingClientRect()
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
    const distance = 6

    const pupilX = Math.cos(angle) * distance
    const pupilY = Math.sin(angle) * distance

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
  })
}

watch(() => props.isPasswordVisible, () => {
  updatePupilPositions()
})

watch(() => props.activeField, () => {
  updatePupilPositions()
})

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.characters-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  min-height: 400px;
}

.character {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.char-body {
  position: relative;
  width: 80px;
  height: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.char-body.orange {
  background: linear-gradient(135deg, #ffaa70 0%, #ff8844 50%, #ff7733 100%);
  width: 100px;
  height: 65px;
  border-radius: 50% 50% 45% 45%;
  box-shadow: 0 10px 25px rgba(255, 120, 60, 0.4), inset 0 -5px 15px rgba(255, 140, 80, 0.3);
}

.char-body.orange::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 100, 100, 0.6) 0%, rgba(255, 150, 150, 0.3) 50%, transparent 70%);
  border-radius: 50%;
  bottom: 25%;
  left: 8%;
  filter: blur(4px);
  z-index: 1;
}

.char-body.orange::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 100, 100, 0.6) 0%, rgba(255, 150, 150, 0.3) 50%, transparent 70%);
  border-radius: 50%;
  bottom: 25%;
  right: 8%;
  filter: blur(4px);
  z-index: 1;
}

.char-body.black {
  background: linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%);
  width: 75px;
  height: 95px;
  border-radius: 45% 45% 50% 50%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.char-body.yellow {
  background: linear-gradient(135deg, #ffe44d 0%, #ffd700 100%);
  width: 85px;
  height: 85px;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(255, 221, 0, 0.3);
}

.eyes {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  top: 35%;
  z-index: 2;
}

.eye {
  position: relative;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.eye.small {
  width: 18px;
  height: 18px;
}

.eye::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  top: 25%;
  left: 30%;
  opacity: 0.6;
  pointer-events: none;
}

.eye.small::after {
  width: 3.5px;
  height: 3.5px;
  top: 22%;
  left: 28%;
}

.pupil {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle at 30% 30%, #333 0%, #000 70%);
  border-radius: 50%;
  transition: transform 0.1s ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.pupil.small {
  width: 9px;
  height: 9px;
}

.mouth {
  position: absolute;
  bottom: 20%;
  width: 20px;
  height: 12px;
  background: #2a2a2a;
  border-radius: 0 0 10px 10px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  z-index: 1;
}

.mouth.small {
  width: 15px;
  height: 8px;
  bottom: 15%;
}

.mouth.surprised {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 18%;
  background: #2a2a2a;
}

.mouth.small.surprised {
  width: 12px;
  height: 12px;
  bottom: 12%;
}

/* Worried mouth - slightly downturned */
.mouth.worried {
  border-radius: 0 0 8px 8px;
  width: 18px;
  height: 10px;
}

.mouth.small.worried {
  width: 17px;
  height: 10px;
}

.mouth.surprised-worried {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 15%;
  background: #2a2a2a;
}

.mouth.small.surprised-worried {
  width: 14px;
  height: 14px;
  bottom: 12%;
}

/* Cool mouth - straight line (neutral) */
.mouth.cool {
  border-radius: 2px;
  height: 3px;
  bottom: 22%;
  background: #2a2a2a;
}

.mouth.surprised-cool {
  width: 12px;
  height: 18px;
  border-radius: 50%;
  bottom: 18%;
  background: #2a2a2a;
}

/* Happy mouth - bigger smile */
.mouth.happy {
  width: 22px;
  height: 13px;
  border-radius: 0 0 11px 11px;
  bottom: 18%;
}

.mouth.surprised-happy {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 18%;
  background: #2a2a2a;
}

.mouth.small.surprised-happy {
  width: 13px;
  height: 13px;
  bottom: 12%;
}

.eyebrows {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  top: 20%;
  transition: top 0.3s ease;
}

.eyebrows.raised {
  top: 15%;
}

.eyebrow {
  width: 20px;
  height: 3px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
  border-radius: 2px;
  position: relative;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.eyebrow.small {
  width: 14px;
  height: 2.5px;
}

/* Worried character - eyebrows angled up (concerned) */
.eyebrows.worried .eyebrow.left {
  transform: rotate(15deg);
}

.eyebrows.worried .eyebrow.right {
  transform: rotate(-15deg);
}

.eyebrows.worried.raised .eyebrow.left {
  transform: rotate(25deg);
}

.eyebrows.worried.raised .eyebrow.right {
  transform: rotate(-25deg);
}

/* Cool character - straight eyebrows, slightly lower */
.eyebrows.cool {
  top: 25%;
}

.eyebrows.cool .eyebrow {
  transform: rotate(0deg);
}

.eyebrows.cool.raised .eyebrow.left {
  transform: rotate(-20deg);
}

.eyebrows.cool.raised .eyebrow.right {
  transform: rotate(20deg);
}

/* Happy character - eyebrows curved up (friendly) */
.eyebrows.happy .eyebrow.left {
  transform: rotate(-10deg);
  border-radius: 50% 50% 0 0;
}

.eyebrows.happy .eyebrow.right {
  transform: rotate(10deg);
  border-radius: 50% 50% 0 0;
}

.eyebrows.happy.raised .eyebrow.left {
  transform: rotate(-25deg);
}

.eyebrows.happy.raised .eyebrow.right {
  transform: rotate(25deg);
}

.char-body.shy {
  animation: blush 0.5s ease-out forwards;
  filter: brightness(1.15) saturate(1.2);
}

.eyes.wide .eye {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Celebration animation */
.character.celebrating {
  animation: celebrate 0.6s ease-in-out 3;
}

@keyframes celebrate {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) rotate(-5deg);
  }
  75% {
    transform: translateY(-30px) rotate(5deg);
  }
}

.char-body.happy-jump {
  animation: none;
}

.mouth.big-smile {
  width: 26px !important;
  height: 16px !important;
  border-radius: 0 0 13px 13px !important;
  bottom: 15% !important;
  background: #2a2a2a !important;
  z-index: 1 !important;
}

.eyebrows.excited .eyebrow {
  transform: rotate(0deg) translateY(-5px) !important;
}

/* Shake animation for error */
.character.shaking {
  animation: shake 0.5s ease-in-out 2;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-10px) rotate(-3deg);
  }
  75% {
    transform: translateX(10px) rotate(3deg);
  }
}

/* Blinking animation - different timing for each character */
.eye.blink-0 {
  animation: blink 4s infinite;
  animation-delay: 0s;
}

.eye.blink-1 {
  animation: blink 5s infinite;
  animation-delay: 1s;
}

.eye.blink-2 {
  animation: blink 4.5s infinite;
  animation-delay: 2s;
}

@keyframes blink {
  0%, 96%, 100% {
    transform: scaleY(1);
  }
  98% {
    transform: scaleY(0.1);
  }
}



@media (max-width: 768px) {
  .characters-section {
    min-height: 200px;
    gap: 15px;
  }

  .character {
    transform: scale(0.9);
  }
}

@media (max-width: 480px) {
  .characters-section {
    min-height: 150px;
    gap: 10px;
  }

  .character {
    transform: scale(0.75);
  }

  .char-body.orange {
    width: 85px;
    height: 55px;
  }

  .char-body.black {
    width: 65px;
    height: 80px;
  }

  .char-body.yellow {
    width: 72px;
    height: 72px;
  }

  /* Reduce mouth sizes on mobile */
  .mouth.happy {
    width: 18px !important;
    height: 11px !important;
    bottom: 20% !important;
  }

  .mouth.big-smile {
    width: 22px !important;
    height: 14px !important;
    bottom: 18% !important;
  }

  .mouth.small {
    width: 13px !important;
    height: 7px !important;
  }

  .mouth.small.worried {
    width: 14px !important;
    height: 8px !important;
  }
}
</style>
