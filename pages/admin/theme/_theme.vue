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
      <Input placeholder="Название (RU)" v-model="request.name_ru" />

      <p class="admin-form__label">Название (EN):</p>
      <Input placeholder="Название (EN)" v-model="request.name_en" />

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
        label: 'Тикеты: Темы',
        link: '/admin/theme'
      },
      {
        label: 'Создание темы',
        link: '/admin/theme/create'
      }
    ])


    const request = ref({
      name_ru: '',
      name_en: ''
    } as {
      [key: string]: any
    })
// ('YYYY-MM-DDThh:mm')
    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/ticket/theme/${route.value.params.theme}`).then((response: any) => {
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
            label: 'Тикеты: Темы',
            link: '/admin/theme'
          }
        ])
      })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      let requestData = { 
        ...request.value
      }

      const response = await $axios.post('/api/admin/ticket/theme', requestData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/theme')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      let requestData = { 
        ...request.value,
      }

      const response = await $axios.put('/api/admin/ticket/theme/' + route.value.params.theme, requestData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.reload()
      }
      isLoading.value = false
    }

    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/ticket/theme/${entity.value.id}`)
      window.location.replace('/admin/theme')
      isLoading.value = false
    }

    return { request, create, deleteEntity, isLoading, errors, entity, save }
  },
})
</script>
