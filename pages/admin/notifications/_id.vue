<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <div class="admin-form__errors">
        <p v-for="(error, index) in errors" :key="index">
          <span
            v-for="(errorItem, errorItemIndex) in error"
            :key="errorItemIndex"
          >
            {{ errorItem }}
          </span>
        </p>
      </div>

      <p class="admin-form__label">Заголовок:</p>
      <Input placeholder="Название" v-model="request.title" />
      <p class="admin-form__label">Текст:</p>
      <InputTextarea placeholder="Текст" v-model="request.message" />

      <div v-if="!isLoading" class="admin-form__button">
        <Button
          v-if="entity"
          tag="button"
          theme="dark"
          style="margin-right: 10px"
          @click="deleteEntity"
          >Удалить</Button
        >
        <Button v-if="!entity" tag="button" @click="create">Создать</Button>
        <Button v-else tag="button" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRoute,
  useStore,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async fetch({ store, $axios }) {
    const response = await $axios.get('/api/admin/games')
    store.commit('game/SET_GAME_LIST', response.data)
  },

  setup() {
    const { $axios } = useContext()
    const store = useStore()
    const route = useRoute()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Уведомления',
        link: '/admin/notifications',
      },
      {
        label: 'Создание уведомления',
        link: '/admin/notifications/create',
      },
    ])

    const request = ref({
      title: '',
      message: '',
    } as {
      [key: string]: any
    })

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.id != 'create') {
      $axios
        .get(`/api/admin/get-notification-by-id?id=${route.value.params.id}`)
        .then((response: any) => {
          const entityResponse = response.data.notification
          entity.value = entityResponse
          request.value = {
            ...request.value,
            ...entityResponse,
          }
          imagePreview.value = entityResponse.image

          store.commit('crumbs/SET_PATH', [
            {
              label: 'Администрирование',
              link: '/admin',
            },
            {
              label: 'Уведомления',
              link: '/admin/notifications',
            },
          ])
        })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const response = (await $axios.post(
        '/api/admin/notification/save',
        null,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: request.value,
        }
      )) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/notifications')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const response = (await $axios.post(
        '/api/admin/notification/update',
        null,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            ...request.value,
            id: route.value.params.id,
          },
        }
      )) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/notifications')
      }
      isLoading.value = false
    }

    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(
        `/api/admin/notification/delete?id=${entity.value.id}`
      )
      window.location.replace('/admin/notifications')
      isLoading.value = false
    }

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        request.value.image = file
      }
    }

    const addInline = (name: string, value: any) => {
      request.value[name].push(value)
    }

    const removeInline = (name: string, index: number) => {
      request.value[name] = request.value[name].filter(
        (_: any, itemIndex: number) => itemIndex != index
      )
    }

    return {
      request,
      create,
      deleteEntity,
      isLoading,
      errors,
      entity,
      save,
      imageRef,
      imagePreview,
      onChangeImage,
      addInline,
      removeInline,
    }
  },
})
</script>
