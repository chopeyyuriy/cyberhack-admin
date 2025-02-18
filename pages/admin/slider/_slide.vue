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
      <InputSelect :data="gamesOptions" v-model="request.game_id" @input="onChangeGame" />

      <template v-if="request.game_id && request.game_id != 0">
        <p class="admin-form__label">Продукты:</p>
        <InputSelect :data="productsOptions" v-model="request.product_id" />
      </template>

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
        label: 'Товары',
        link: '/admin/products'
      },
      {
        label: 'Создание слайда',
        link: '/admin/slider/create'
      }
    ])

    const games = computed(() => store.getters['game/list'])
    const gamesOptions = [{
        label: 'Выберите игру',
        value: 0
      },
      ...games.value.map((game: any) => {
        return {
          label: game.name_ru,
          value: game.id
        }
      })
    ]

    const products = ref([])
    const productsOptions = computed(() => [{
        label: 'Выберите продукт',
        value: 0
      },
      ...products.value.map((product: any) => {
        return {
          label: product.name_ru,
          value: product.id
        }
      })
    ])

    const request = ref({
      game_id: 0,
      product_id: 0,
      image: null as any,
    } as {
      [key: string]: any
    })

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/slides/${route.value.params.slide}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse
        request.value = {
          ...request.value,
          ...entityResponse
        }
        imagePreview.value = entityResponse.image
        onChangeGame(entityResponse.game_id)

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Товары',
            link: '/admin/products'
          },
          {
            label: `Слайд ${entity.value.id}`,
            link: `/admin/slider/${entity.value.id}`
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
        if (typeof value == 'boolean')
          value = Number(value)
        formData.append(key, value);
      }

      const response = await $axios.post('/api/admin/slides', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/slider')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const formData = new FormData()

      for (const key of Object.keys(request.value)) {
        let value = request.value[key]
        if (typeof value == 'boolean')
          value = Number(value)
        formData.append(key, value);
      }

      const response = await $axios.post('/api/admin/slides/' + route.value.params.slide, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/slider')
      }
      isLoading.value = false
    }


    const deleteEntity = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/slides/${entity.value.id}`)
      window.location.replace('/admin/slider')
      isLoading.value = false
    }

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        request.value.image = file
      }
    }

    const onChangeGame = async (value: any) => {
      const response = await $axios.get(`/api/products/${value}`)
      products.value = response.data
    }

    return { games, gamesOptions, request, create, deleteEntity, onChangeImage, imageRef, imagePreview, isLoading, errors, entity, products, productsOptions, onChangeGame, save }
  },
})
</script>
