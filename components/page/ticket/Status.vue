<template>
  <div class="ticket-status" :class="`ticket-status_${STATUSES[value].class}`">
    {{ STATUSES[value][`label_${itemLang}`] }}
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
  
  export default defineComponent({
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
  
    setup() {
      const STATUSES = [
        {
          label_ru: 'В процессе',
          label_en: 'In progress',
          class: 'in-progress'
        },
        {
          label_ru: 'Решенный',
          label_en: 'Solved',
          class: 'solved'
        }
      ]

      const store = useStore()
      const itemLang = computed(() => store.getters['locale/itemLang'])

      return { STATUSES, itemLang }
    },
  })
  </script>