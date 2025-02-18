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

      <p class="admin-form__label">Аватар:</p>
      <img :src="request.avatar" alt="" style="width: 20%; margin-top: 16px;">

      <p class="admin-form__label">Имя пользователя:</p>
      <Input placeholder="Название (ru)" v-model="request.name" />

      <p class="admin-form__label">E-mail:</p>
      <Input placeholder="Название (en)" v-model="request.email" />

      <p class="admin-form__label">Дата создания: <span style="color: white;">{{ (new Date(request.created_at)).toLocaleDateString() }} {{ (new Date(request.created_at)).toLocaleTimeString() }}</span></p>
      <p class="admin-form__label">Дата обновления: <span style="color: white;">{{ (new Date(request.updated_at)).toLocaleDateString() }} {{ (new Date(request.updated_at)).toLocaleTimeString() }}</span></p>

      <p class="admin-form__label">Права:</p>
      <InputSelect :data="permissionOptions" v-model="request.adminlvl" />

      <div class="admin-form__checkbox">
        <InputCheckbox v-model="request.is_bot" />
        <p>Является ботом</p>
      </div>

      <div v-if="!isLoading" class="admin-form__button">
        <Button tag="button" theme="dark" style="margin-right: 10px" @click="deleteEntity">Удалить</Button>
        <!-- <Button v-if="!entity" tag="button" @click="create">Создать</Button> -->
        <Button tag="button" @click="save">Сохранить</Button>
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
        link: '/admin/bot/problems'
      },
      {
        label: 'Создание проблемы',
        link: '/admin/bot/problems/create'
      }
    ])

    const permissionOptions = [{
      label: 'Пользователь',
      value: 0
    }, {
      label: 'Модератор',
      value: 1
    }, {
      label: 'Администратор',
      value: 2
    }]

    const request = ref({
      name: '',
      email: '',
    } as {
      [key: string]: any
    })
    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/user/${route.value.params.user}`).then((response: any) => {
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
            label: 'Пользователи',
            link: '/admin/users'
          }
        ])
      })
    }

    const save = async () => {
      isLoading.value = true

      let requestData = { 
        ...request.value
      }

      requestData.adminlvl = Number.parseInt(requestData.adminlvl)

      const response = await $axios.put('/api/admin/user/' + route.value.params.user, requestData) as any;
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
      await $axios.delete(`/api/admin/user/${entity.value.id}`)
      window.location.replace('/admin/users')
      isLoading.value = false
    }

    return { request, deleteEntity, isLoading, errors, entity, permissionOptions, save }
  },
})
</script>
