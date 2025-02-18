<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <p class="admin-form__label">VK:</p>
      <Input placeholder="VK" v-model="request.links.vk" />

      <p class="admin-form__label">Discord:</p>
      <Input placeholder="Discord" v-model="request.links.discord" />

      <p class="admin-form__label">Telegram:</p>
      <Input placeholder="Discord" v-model="request.links.telegram" />

      <p class="admin-form__label">YouTube:</p>
      <Input placeholder="YouTube" v-model="request.links.youtube" />

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
        label: 'Социальные сети',
        link: '/admin/socials'
      }
    ])

    const request = ref({ links: { 
        ...store.getters['config/socials'].links 
      } 
    } as any)

    const isLoading = ref(false)
    const errors = ref([])

    const save = async () => {
      isLoading.value = true
      errors.value = []

      const response = await $axios.post('/api/admin/config/socials', request.value) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/socials')
      }

      isLoading.value = false
    }


    return { request, save, isLoading, errors }
  },
})
</script>
