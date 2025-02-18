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

      <p class="admin-form__label">Название (RU):</p>
      <Input placeholder="Название (RU)" v-model="request.label_ru" />

      <p class="admin-form__label">Название (EN):</p>
      <Input placeholder="Название (EN)" v-model="request.label_en" />

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
        label: 'Типы системных требований',
        link: '/admin/requirements-types'
      },
      {
        label: 'Создание типа требования',
        link: '/admin/requirements-types/create'
      }
    ])

    const requirementCategoriesOptions = [{
      label: 'Требования к системе',
      value: 0
    }, {
      label: 'Дополнительная информация',
      value: 1
    }]

    const request = ref({
      category: 0,
      label_ru: '',
      label_en: '',
      icon: null as any
    } as {
      [key: string]: any
    })

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/requirements-types/${route.value.params.type}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse
        request.value = {
          ...request.value,
          ...entityResponse
        }
        
        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Типы системных требований',
            link: '/admin/requirements-types'
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

      const response = await $axios.post('/api/admin/requirements-types', formData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/requirements-types')
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

      const response = await $axios.post('/api/admin/requirements-types/' + route.value.params.type, formData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/requirements-types')
      }
      isLoading.value = false
    }

    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/requirements-types/${entity.value.id}`)
      window.location.replace('/admin/requirements-types')
      isLoading.value = false
    }

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        request.value.icon = file
      }
    }

    return { request, create, deleteEntity, isLoading, errors, entity, requirementCategoriesOptions, save, imageRef, imagePreview, onChangeImage }
  },
})
</script>
