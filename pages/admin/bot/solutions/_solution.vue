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

      <p class="admin-form__label">Название (ru):</p>
      <Input placeholder="Название (ru)" v-model="request.name_ru" />

      <p class="admin-form__label">Название (en):</p>
      <Input placeholder="Название (en)" v-model="request.name_en" />

      <p class="admin-form__label">Ссылка:</p>
      <Input placeholder="Ссылка" v-model="request.link" />

      <p class="admin-form__label">Проблема:</p>
      <InputSelect 
        :data="problemsOptions" 
        v-model="request.bot_problem_id"
      />

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
        label: 'Бот: Проблемы',
        link: '/admin/bot/problem/solutions'
      },
      {
        label: 'Создание проблемы',
        link: '/admin/bot/problem/solutions/create'
      }
    ])

    let d = new Date()
    const request = ref({
      name_ru: '',
      name_en: '',
      link: '',
      bot_problem_id: 0
    } as {
      [key: string]: any
    })
// ('YYYY-MM-DDThh:mm')
    const isLoading = ref(false)
    const errors = ref([])

    const problems = ref([])
    const problemsOptions = computed(() => [{
        label: 'Выберите проблему',
        value: 0
      },
      ...problems.value.map((problem: any) => {
        return {
          label: `${problem.name_ru}`,
          value: problem.id
        }
      })
    ])

    $axios.get('/api/admin/bot/problems').then((response) => problems.value = response.data);

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/bot/problem/solutions/${route.value.params.solution}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse

        request.value = {
          ...request.value,
          ...entityResponse,
        }

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Бот: Решения',
            link: '/admin/bot/solutions'
          }
        ])
      })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      let requestData = { 
        ...request.value,
      }

      const response = await $axios.post('/api/admin/bot/problem/solutions', requestData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/bot/solutions')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      let requestData = { 
        ...request.value
      }

      const response = await $axios.put('/api/admin/bot/problem/solutions/' + route.value.params.solution, requestData) as any;
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
      await $axios.delete(`/api/admin/bot/problem/solutions/${entity.value.id}`)
      window.location.replace('/admin/bot/solutions')
      isLoading.value = false
    }

    return { request, create, deleteEntity, isLoading, errors, entity, save, problemsOptions }
  },
})
</script>
