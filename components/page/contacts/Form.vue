<template>
  <div class="page-contacts-form">
    <Input :placeholder="locale.contacts.name" name="name" :errors="errors" v-model="contactRequest.name">
      <template #icon>
        <IconProfile class="usericon" />
      </template>
    </Input>
    <Input :placeholder="locale.contacts.email" name="email" :errors="errors" v-model="contactRequest.email">
      <template #icon>
        <IconSMS />
      </template>
    </Input>
    <Input :placeholder="locale.contacts.theme" name="theme" :errors="errors" v-model="contactRequest.theme">
      <template #icon>
        <IconTag />
      </template>
    </Input>
    <InputTextarea :placeholder="locale.contacts.message" name="message" v-model="contactRequest.message"/>
    <ButtonLarge v-if="!isLoading" tag="button" @click="send">{{ locale.contacts.send }}</ButtonLarge>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])

    const errors = ref({});
    const isLoading = ref(false);

    const contactRequest = ref({
      name: '',
      email: '',
      theme: '',
      message: ''
    })

    const send = async () => {
      isLoading.value = true
      errors.value = {}

      const response = await $axios.post('/api/contacts', contactRequest.value) as any
      if (response.status == 200) {
        window.location.reload();
      } else {
        if (response.response.data && response.response.data.errors) {
          errors.value = response.response.data.errors
        }
      }

      isLoading.value = false
    }

    return { locale, isLoading, errors, send, contactRequest }
  },
})
</script>
