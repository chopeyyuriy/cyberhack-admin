<template>
  <div class="signin fadeInUp500ms" style="animation-delay: 250ms">
    <div class="signin-title">
      <h1>{{ locale.signin.title }}</h1>
    </div>
    <div class="signin-form">
      <Input :placeholder="locale.signin.email" name="email" :errors="errors" v-model="signinRequest.email">
        <template #icon>
          <IconSMS />
        </template>
      </Input>
      <Input type="password" :placeholder="locale.signin.password" name="password" :errors="errors" v-model="signinRequest.password">
        <template #icon>
          <IconLock />
        </template>
      </Input>
    </div>
    <ButtonLarge v-if="!isLoading" tag="button" @click="auth" style="margin-top: 32px">{{ locale.signin.action }}</ButtonLarge>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useContext, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'fullscreen',

  setup() {
    const rememberMe = ref(false)

    const store = useStore()
    const { $toast } = useContext() as any;

    const locale = computed(() => store.getters['locale/locale'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    const signinRequest = ref({
      email: '',
      password: '',
      remember_me: false
    })

    const errors = ref({})
    const isLoading = ref(false)

    const auth = async () => {
      isLoading.value = true
      errors.value = {}

      signinRequest.value = {
        ...signinRequest.value,
        remember_me: rememberMe.value
      }

      const response = await store.dispatch('auth/auth', signinRequest.value)
      if (response.status === 200) {
        window.location.replace('/admin')
      } else {
        if (response.response && response.response?.data?.errors) {
          errors.value = response.response.data.errors;

          for (const error of Object.keys(errors.value)) {
            // @ts-ignore
            let errorText = errors.value[error];
            if (itemLang.value === 'ru') {
              errorText = locale.value.errors[errorText] ?? errorText
            }
            $toast.error(errorText, {
              draggable: false
            })
          }
        }
      }

      isLoading.value = false
    }

    return { rememberMe, signinRequest, errors, isLoading, locale, auth }
  },
})
</script>
