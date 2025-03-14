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

      <p class="admin-form__label">Тип:</p>
      <InputSelect :data="requirementsTypesOptions" v-model="request.type_id" />

      <p class="admin-form__label">Текст (ru):</p>
      <Input placeholder="Текст (ru)" v-model="request.text_ru" />

      <p class="admin-form__label">Текст (en):</p>
      <Input placeholder="Текст (en)" v-model="request.text_en" />

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
        label: 'Системные требования',
        link: '/admin/requirements'
      },
      {
        label: 'Создание требования',
        link: '/admin/requirements/create'
      }
    ])

    const requirementCategoriesOptions = [{
      label: 'Требования к системе',
      value: 0
    }, {
      label: 'Дополнительная информация',
      value: 1
    }]

    const requirementsTypes = ref([]);
    $axios.get('/api/admin/requirements-types').then((response) => requirementsTypes.value = response.data)

    const requirementsTypesOptions = computed(() => {
      let types = requirementsTypes.value.map((item: any) => ({
        label: item.label_ru,
        value: item.id
      }))
      return [{
        label: 'Выберите тип',
        value: 0
      }, ...types]
    });

    const request = ref({
      type_id: 0,
      text: ''
    } as {
      [key: string]: any
    })

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/requirements/${route.value.params.requirement}`).then((response: any) => {
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
            label: 'Системные требования',
            link: '/admin/requirements'
          }
        ])
      })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const response = await $axios.post('/api/admin/requirements', request.value) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/requirements')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const response = await $axios.put('/api/admin/requirements/' + route.value.params.requirement, request.value) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/requirements')
      }
      isLoading.value = false
    }

    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/requirements/${entity.value.id}`)
      window.location.replace('/admin/requirements')
      isLoading.value = false
    }


    return { request, create, deleteEntity, isLoading, errors, entity, requirementCategoriesOptions, requirementsTypesOptions, save }
  },
})
</script>
