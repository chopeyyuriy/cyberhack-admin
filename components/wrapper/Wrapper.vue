<template>
  <div class="wrapper">
    <div 
      class="wrapper-head" 
      :class="{ active: isActive }"
      @click="isActive = !isActive"
    >
      <div class="wrapper-head__title">
        <slot name="icon" />
        <p>{{ title }}</p>
      </div>
      <IconChevron />
    </div>
    <transition name="fade">
      <div v-show="isActive" class="wrapper-content">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const isActive = ref(props.active)

    return { isActive }
  },
})
</script>
