<template>
  <div class="page-ticket-modal__container">
    <div class="page-ticket-modal__overlay" @click="$emit('close')"></div>
    <div class="page-ticket-modal">
      <div class="page-ticket-modal__content">
        <div class="page-ticket-modal__title">
          <h3>{{ locale.profile.tickets.create }}</h3>
          <img @dragstart="$event.preventDefault()" src="/images/underline.svg" alt="">
        </div>
        <!-- <Input :placeholder="locale.profile.tickets.enterTheme" v-model="requestData.theme" :errors="errors" name="theme" >
          <template #icon>
            <IconTag />
          </template>
        </Input> -->
        <InputSelect :data="themesFormatedOptions" v-model="requestData.theme_id" />
        <Button v-if="!isLoading" @click="create" tag="button">{{ locale.profile.tickets.createButton }}</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useRouter, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
    }
  },

  setup(props, { emit }) {
    const store = useStore()

    const { $axios, $toast } = useContext() as any
    const router = useRouter()

    const requestData = ref({
      theme_id: ''
    })

    const locale = computed(() => store.getters['locale/locale'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    const errors = ref({} as any)
    const isLoading = ref(false)

    const themesOptions = ref([] as any)
    const themesFormatedOptions = computed(() => themesOptions.value.map((theme: any) => ({
      value: theme.value,
      label: theme.theme ? theme.theme[`name_${itemLang.value}`] : (itemLang.value === 'ru' ? 'Выберите тему' : 'Select theme')
    })))

    $axios.get('/api/ticket/theme').then((response: any) => {
      themesOptions.value = response.data.map((theme: any) => ({
        value: theme.id,
        theme: theme
      }))
      themesOptions.value = [{
        label: itemLang.value === 'ru' ? 'Выберите тему' : 'Select theme',
        theme: null
      }, ...themesOptions.value]
    })

    const create = async () => {
      errors.value = {}
      isLoading.value = true

      let response = await $axios.post('/api/ticket', requestData.value) as any
      if (response.status === 200) {
        await store.dispatch('ticket/loadTickets');

        $toast.success(locale.value.profile.tickets.created, {
          draggable: false
        })

        router.push({ name: 'profile-ticket-id', params: { id: response.data.id } })

        emit('close');
      } else {
        if (response.response.data && response.response.data.errors) {
          errors.value = response.response.data.errors

          for (const error of Object.keys(errors.value)) {
            // @ts-ignore
            let errorText = errors.value[error][0];
            if (itemLang.value === 'ru') errorText = locale.value.errors[errorText] ?? errors.value[error][0]
            $toast.error(errorText, {
              draggable: false
            })
          }
        }
      }

      isLoading.value = false
    }

    return { requestData, locale, create, isLoading, errors, themesOptions, themesFormatedOptions }
  },
})
</script>
