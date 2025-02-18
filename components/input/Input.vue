<template>
  <div class="input" :class="{ error: errors && !!errors[name], 'input_focus': isFocus }">
    <div class="input-icon">
      <slot name="icon" />
    </div>
    <input 
      :name="name"
      :type="type" 
      :placeholder="placeholder" 
      :value="value" 
      :disabled="disabled"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    errors: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const isFocus = ref(false);
    return { isFocus }
  },
})
</script>
