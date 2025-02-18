<template>
  <div class="input-select">
    <select 
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option 
        v-for="(option, index) in data"
        :key="index"
        :selected="value == option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      default: ''
    },
    data: {
      type: Array,
      required: true
    }
  },

  setup() {
    return { }
  },
})
</script>
