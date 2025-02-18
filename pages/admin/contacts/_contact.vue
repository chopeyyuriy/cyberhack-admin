<template>
  <div class="admin-contacts-item">
    <div class="admin-form">
      <p class="admin-form__label">ID:</p>
      <Input :disabled="true" placeholder="ID" v-model="contact.id" />

      <p class="admin-form__label">Имя:</p>
      <Input :disabled="true" placeholder="Имя" v-model="contact.name" />

      <p class="admin-form__label">E-mail:</p>
      <Input :disabled="true" placeholder="E-mail" v-model="contact.email" />

      <p class="admin-form__label">Тема:</p>
      <Input :disabled="true" placeholder="Тема" v-model="contact.theme" />

      <p class="admin-form__label">IP:</p>
      <Input :disabled="true" placeholder="IP" v-model="contact.ip" />

      <p class="admin-form__label">User Agent:</p>
      <Input :disabled="true" placeholder="User Agent" v-model="contact.sign" />

      <p class="admin-form__label">Сообщение:</p>
      <InputTextarea :disabled="true" placeholder="Сообщение" v-model="contact.message" />

      <div v-if="!isLoading" class="admin-form__button">
        <Button tag="button" @click="destroy(contact.id)">Удалить</Button>
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
  
  async asyncData({ $axios, route }) {
    const contact = (await $axios.get('/api/admin/contacts/' + route.params.contact)).data

    return {
      contact
    }
  },

  setup() {
    const { $axios } = useContext()
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Контакты',
        link: '/admin/contacts'
      }
    ])

    const isLoading = ref(false)

    const destroy = async (id: number) => {
      isLoading.value = true

      const response = await $axios.delete('/api/admin/contacts/' + id)
      if (response.status == 200) {
        window.location.replace('/admin/contacts')
      }

      isLoading.value = false
    }

    return { destroy, isLoading }
  },
})
</script>
