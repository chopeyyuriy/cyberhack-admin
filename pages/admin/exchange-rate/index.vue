<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <p class="admin-form__label">Курс $:</p>
      <Input placeholder="Курс $" v-model="request['$']" />

      <div v-if="!isLoading" class="admin-form__button">
        <Button tag="button" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, useContext, useRoute, useStore, watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  setup() {
    const { $axios } = useContext()
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Курс обмена',
        link: '/admin/exchange-rate'
      }
    ])

    const request = ref({
      ...store.getters['config/exchange'] 
    } as any)

    const isLoading = ref(false)
    const errors = ref([])

    const save = async () => {
      isLoading.value = true
      errors.value = []

      const response = await $axios.post('/api/admin/config/exchange', request.value) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/exchange-rate')
      }

      isLoading.value = false
    }


    return { request, save, isLoading, errors }
  },
})
</script>
