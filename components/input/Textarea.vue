<template>
  <div class="input-textarea">
    <textarea 
      :placeholder="placeholder" 
      :value="value" 
      :disabled="disabled"
      @input="$emit('input', $event.target.value ? $event.target.value : '')"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { }
  },
})
</script>
