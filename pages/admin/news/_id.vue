<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <div class="admin-form__errors">
        <p
          v-for="(error, index) in errors"
          :key="index"
        >
          <span
            v-for="(errorItem, errorItemIndex) in error"
            :key="errorItemIndex"
          >
            {{ errorItem }} 
          </span>
        </p>
      </div>

      <p class="admin-form__label">Игра:</p>
      <InputSelect :data="gameOptions" v-model="request.game_id" />

      <p class="admin-form__label">Название (ru):</p>
      <Input placeholder="Название (ru)" v-model="request.title_ru" />

      <p class="admin-form__label">Название (en):</p>
      <Input placeholder="Название (en)" v-model="request.title_en" />

      <p class="admin-form__label">Текст (ru):</p>
      <InputTextarea placeholder="Текст (ru)" v-model="request.text_ru" />

      <p class="admin-form__label">Текст (en):</p>
      <InputTextarea placeholder="Текст (en)" v-model="request.text_en" />

      <div class="admin-form__file" @change="onChangeImage">
        <p>Выберите изображение</p>
        <input ref="imageRef" type="file" accept="images/*">
        <img v-if="imagePreview.length" :src="imagePreview" alt="">
      </div>

      <div v-if="!isLoading" class="admin-form__button">
        <Button v-if="entity" tag="button" theme="dark" style="margin-right: 10px" @click="deleteEntity">Удалить</Button>
        <Button v-if="!entity" tag="button" @click="create">Создать</Button>
        <Button v-else tag="button" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useContext, useRoute, useStore, watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async fetch({ store, $axios }) {
    const response = await $axios.get('/api/admin/games');
    store.commit('game/SET_GAME_LIST', response.data);
  },

  setup() {
    const { $axios } = useContext()
    const store = useStore()
    const route = useRoute()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Теги',
        link: '/admin/news'
      },
      {
        label: 'Создание новости',
        link: '/admin/news/create'
      }
    ])

    const request = ref({
      title_ru: '',
      title_en: '',
      text_ru: '',
      text_en: '',
      game_id: 0
    } as {
      [key: string]: any
    })

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    let gameOptions = ref([] as any);
    $axios.get('/api/admin/games').then((response: any) => {
      gameOptions.value = [
        {
          label: 'Выберите игру',
          value: 0,
        }, 
        ...response.data.map((game: any) => ({
          label: game.name_ru,
          value: game.id
        }))
      ]
    });

    if (route.value.params.id != 'create') {
      $axios.get(`/api/admin/news/${route.value.params.id}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse
        request.value = {
          ...request.value,
          ...entityResponse
        }
        imagePreview.value = entityResponse.image

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Новости',
            link: '/admin/news'
          }
        ])
      })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const formData = new FormData()

      for (const key of Object.keys(request.value)) {
        let value = request.value[key]
        formData.append(key, value);
      }

      const response = await $axios.post('/api/admin/news', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/news')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const formData = new FormData()

      for (const key of Object.keys(request.value)) {
        let value = request.value[key]
        formData.append(key, value);
      }

      const response = await $axios.post('/api/admin/news/' + route.value.params.id, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/news')
      }
      isLoading.value = false
    }

    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/news/${entity.value.id}`)
      window.location.replace('/admin/news')
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
      request.value[name] = request.value[name].filter((_: any, itemIndex: number) => itemIndex != index)
    }

    return { request, create, deleteEntity, isLoading, errors, entity, save, imageRef, imagePreview, onChangeImage, addInline, removeInline, gameOptions }
  },
})
</script>
