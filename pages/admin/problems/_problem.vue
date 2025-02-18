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

      <p class="admin-form__label">Заголовок (ru):</p>
      <Input placeholder="Заголовок (ru)" v-model="request.title_ru" />

      <p class="admin-form__label">Заголовок (en):</p>
      <Input placeholder="Заголовок (en)" v-model="request.title_en" />

      <p class="admin-form__label">Текст (ru):</p>
      <VueEditor placeholder="Текст (ru)" v-model="request.text_ru" style="margin-top: 16px" />

      <p class="admin-form__label">Текст (en):</p>
      <VueEditor placeholder="Текст (en)" v-model="request.text_en" style="margin-top: 16px" />

      <div class="admin-form__file" @change="onChangeIcon">
        <p>Выберите иконку</p>
        <input ref="iconRef" type="file" accept="images/*">
        <img v-if="iconPreview.length" :src="iconPreview" alt="">
      </div>

      <div class="admin-form__checkbox">
        <InputCheckbox v-model="request.is_hidden" />
        <p>Скрыть страничку</p>
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
        label: 'Популярные проблемы',
        link: '/admin/problems'
      },
      {
        label: 'Создание проблемы',
        link: '/admin/problems/create'
      }
    ])

    const request = ref({
      title_ru: '',
      title_en: '',
      text_ru: '',
      text_en: '',
      is_hidden: false
    } as {
      [key: string]: any
    })

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    const iconRef = ref({} as HTMLInputElement)
    const iconPreview = ref('')

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/problems/${route.value.params.problem}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse
        request.value = {
          ...request.value,
          ...entityResponse
        }
        iconPreview.value = entityResponse.icon

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Популярные проблемы',
            link: '/admin/problems'
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

      const response = await $axios.post('/api/admin/problems', formData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/problems')
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

      const response = await $axios.post('/api/admin/problems/' + route.value.params.problem, formData) as any;
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
      await $axios.delete(`/api/admin/problems/${entity.value.id}`)
      window.location.replace('/admin/problems')
      isLoading.value = false
    }

    const onChangeIcon = (e: any) => {
      if (iconRef.value.files?.length) {
        const file = iconRef.value.files[0]
        iconPreview.value = URL.createObjectURL(file);
        request.value.icon = file
      }
    }

    return { request, create, deleteEntity, onChangeIcon, isLoading, errors, entity, iconRef, iconPreview, save }
  },
})
</script>
