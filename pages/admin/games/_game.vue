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

      <Wrapper title="Основные характеристики" :active="true">
        <template #content>
          <p class="admin-form__label">Путь:</p>
          <Input placeholder="Путь" v-model="gameRequest.path" />
          <p class="admin-form__label">Название (RU):</p>
          <Input placeholder="Название (RU)" v-model="gameRequest.name_ru" />
          <p class="admin-form__label">Название (EN):</p>
          <Input placeholder="Название (EN)" v-model="gameRequest.name_en" />
          <p class="admin-form__label">Описание (RU):</p>
          <InputTextarea placeholder="Описание (RU)" v-model="gameRequest.description_ru" />
          <p class="admin-form__label">Описание (EN):</p>
          <InputTextarea placeholder="Описание (EN)" v-model="gameRequest.description_en" />

          <p class="admin-form__label">Родитель:</p>
          <InputSelect :data="gamesOptions" v-model="gameRequest.parent_id" />

          <p class="admin-form__label">Категория:</p>
          <InputSelect :data="categoryOptions" v-model="gameRequest.category" />

          <p class="admin-form__label">Платформа:</p>
          <div class="admin-form__checkbox">
            <InputCheckbox v-model="gameRequest.is_windows" />
            <p>Windows</p>
          </div>
          <div class="admin-form__checkbox">
            <InputCheckbox v-model="gameRequest.is_android" />
            <p>Android</p>
          </div>
          <div class="admin-form__checkbox">
            <InputCheckbox v-model="gameRequest.is_ios" />
            <p>IOS</p>
          </div>
          <!-- <p class="admin-form__label">Скидка:</p>
          <Input placeholder="Скидка" type="number" v-model="gameRequest.sale" /> -->
        </template>
      </Wrapper>

      <Wrapper title="SEO адаптация">
        <template #content>
          <p class="admin-form__label">SEO: Заголовок (RU):</p>
          <Input placeholder="SEO: Заголовок (RU)" v-model="gameRequest.seo_title_ru" />

          <p class="admin-form__label">SEO: Заголовок (EN):</p>
          <Input placeholder="SEO: Заголовок (EN)" v-model="gameRequest.seo_title_en" />

          <p class="admin-form__label">SEO: Ключевые слова (RU):</p>
          <Input placeholder="SEO: Ключевые слова (RU)" v-model="gameRequest.seo_keywords_ru" />

          <p class="admin-form__label">SEO: Ключевые слова (EN):</p>
          <Input placeholder="SEO: Ключевые слова (EN)" v-model="gameRequest.seo_keywords_en" />

          <p class="admin-form__label">SEO: Описание (RU):</p>
          <InputTextarea placeholder="SEO: Описание (RU)" v-model="gameRequest.seo_description_ru" />

          <p class="admin-form__label">SEO: Описание (EN):</p>
          <InputTextarea placeholder="SEO: Описание (EN)" v-model="gameRequest.seo_description_en" />
        </template>
      </Wrapper>

      <Wrapper title="Медиа">
        <template #content>
          <div class="admin-form__file" @change="onChangeIcon">
            <p>Выберите иконку</p>
            <input ref="iconRef" type="file" accept="images/*">
            <img v-if="iconPreview.length" :src="iconPreview" alt="">
          </div>
          <div class="admin-form__file" @change="onChangeImage">
            <p>Выберите изображение</p>
            <input ref="imageRef" type="file" accept="images/*">
            <img v-if="imagePreview.length" :src="imagePreview" alt="">
          </div>
          <div class="admin-form__file" @change="onChangeLogo">
            <p>Выберите лого</p>
            <input ref="logoRef" type="file" accept="images/*">
            <img v-if="logoPreview.length" :src="logoPreview" alt="">
          </div>
          <div class="admin-form__file" @change="onChangeBackground">
            <p>Выберите фон</p>
            <input ref="backgroundRef" type="file" accept="images/*">
            <img v-if="backgroundPreview.length" :src="backgroundPreview" alt="">
          </div>
        </template>
      </Wrapper>
      <div class="admin-form__checkbox">
        <InputCheckbox v-model="gameRequest.is_popular" />
        <p>Популярное</p>
      </div>
      <div class="admin-form__checkbox">
        <InputCheckbox v-model="gameRequest.active" />
        <p>Активно</p>
      </div>
      <div class="admin-form__checkbox">
        <InputCheckbox v-model="gameRequest.is_favourite" />
        <p>Любимые разделы</p>
      </div>
      <p class="admin-form__label">Сортировка продуктов:</p>
      <div class="admin-form__sortable">
        <Draggable 
          v-model="products" 
          draggable=".admin-form__sortable-item" 
          @change="onSortProducts"
        >
          <div 
            v-for="(product, index) in products"
            :key="index"
            class="admin-form__sortable-item"
          >
            {{ product.name_ru }}
          </div>
        </Draggable>
      </div>
      <div v-if="!isLoading" class="admin-form__button">
        <Button v-if="game" tag="button" theme="dark" style="margin-right: 10px" @click="deleteGame">Удалить</Button>
        <Button v-if="!game" tag="button" @click="create">Создать</Button>
        <Button v-else tag="button" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Draggable from 'vuedraggable'

import {
  computed,
  defineComponent, ref, useContext, useRoute, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  components: {
    Draggable
  },

  async fetch({ store, $axios }) {
    const response = await $axios.get('/api/admin/games');
    store.commit('game/SET_GAME_LIST', response.data);
  },

  async asyncData({ $axios, route }) {
    let products = (await $axios.get('/api/admin/games/' + route.params.game + '/products')).data

    return {
      products
    }
  },

  setup() {
    const { $axios, $toast } = useContext() as any
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Игры',
        link: '/admin/games'
      },
      {
        label: 'Создание игры',
        link: '/admin/games/create'
      }
    ])

    const games = computed(() => store.getters['game/list'])

    const gamesOptions = [{
        label: 'Выберите родителя',
        value: 0
      },
      ...games.value.map((game: any) => {
        return {
          label: game.name_ru,
          value: game.id
        }
      })
    ]

    const categoryOptions = [
      {
        label: 'PMT Игры',
        value: 0
      },
      {
        label: 'Шутеры',
        value: 1
      },
      {
        label: 'MOBA',
        value: 2
      },
      {
        label: 'Оффлайн',
        value: 3
      }
    ]

    const gameRequest = ref({
      path: '',
      name_ru: '',
      name_en: '',
      description_ru: '',
      description_en: '',
      seo_title_ru: '',
      seo_title_en: '',
      seo_keywords_ru: '',
      seo_keywords_en: '',
      seo_description_ru: '',
      seo_description_en: '',
      image: null as any,
      icon: null as any,
      logo: null as any,
      background: null as any,
      sale: 0,
      is_popular: false,
      is_favourite: false,
      active: true,
      is_windows: false,
      is_android: false,
      is_ios: false,
      category: 0,
      parent_id: 0
    } as {
      [key: string]: any
    })

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const iconRef = ref({} as HTMLInputElement)
    const iconPreview = ref('')

    const logoRef = ref({} as HTMLInputElement)
    const logoPreview = ref('')

    const backgroundRef = ref({} as HTMLInputElement)
    const backgroundPreview = ref('')

    const isLoading = ref(false)
    const errors = ref([])

    const game = ref(null as any)

    if (route.value.params.game != 'create') {
      $axios.get(`/api/admin/games/${route.value.params.game}`).then((response: any) => {
        const gameResponse = response.data
        game.value = gameResponse
        gameRequest.value = {
          ...gameRequest.value,
          ...gameResponse
        }
        imagePreview.value = gameResponse.image
        iconPreview.value = gameResponse.icon
        logoPreview.value = gameResponse.logo
        backgroundPreview.value = gameResponse.background

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Игры',
            link: '/admin/games'
          },
          {
            label: game.value.name_ru,
            link: `/admin/games/${game.value.id}`
          }
        ])
      })
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const formData = new FormData()

      if (!gameRequest.value.parent_id) {
        delete gameRequest.value.parent_id;
      }

      for (const key of Object.keys(gameRequest.value)) {
        let value = gameRequest.value[key]
        if (typeof value == 'boolean')
          value = Number(value)
        formData.append(key, value);
      }

      const response = await $axios.post('/api/admin/games', formData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('Произошла ошибка про создании игры!', {
            draggable: false
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Игра успешно создана!', {
          draggable: false
        })
        router.push({ name: 'admin-games' });
      }

      isLoading.value = false
    }

    const deleteGame = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/games/${game.value.id}`)
      window.location.replace('/admin/games')
      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const formData = new FormData()

      if (!gameRequest.value.parent_id) {
        delete gameRequest.value.parent_id;
      }

      for (const key of Object.keys(gameRequest.value)) {
        let value = gameRequest.value[key]
        if (typeof value == 'boolean')
          value = Number(value)
        formData.append(key, value);
      }

      const response = await $axios.post(`/api/admin/games/${game.value.id}`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('При обновлении игры произошла ошибка!', {
            draggable: false
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Игра успешно сохранена!', {
          draggable: false,
          timeout: 2000
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
      isLoading.value = false
    }

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        gameRequest.value.image = file
      }
    }

    const onChangeIcon = (e: any) => {
      if (iconRef.value.files?.length) {
        const file = iconRef.value.files[0]
        iconPreview.value = URL.createObjectURL(file);
        gameRequest.value.icon = file
      }
    }

    const onChangeLogo = (e: any) => {
      if (logoRef.value.files?.length) {
        const file = logoRef.value.files[0]
        logoPreview.value = URL.createObjectURL(file);
        gameRequest.value.logo = file
      }
    }

    const onChangeBackground = (e: any) => {
      if (backgroundRef.value.files?.length) {
        const file = backgroundRef.value.files[0]
        backgroundPreview.value = URL.createObjectURL(file);
        gameRequest.value.background = file
      }
    }

    return { gamesOptions, games, gameRequest, create, save, deleteGame, onChangeImage, onChangeIcon, onChangeLogo, onChangeBackground, backgroundRef, backgroundPreview, categoryOptions, imageRef, imagePreview, iconRef, iconPreview, isLoading, errors, game, logoRef, logoPreview }
  },

  methods: {
    async update() {
      this.products = (await this.$axios.get('/api/admin/games/' + this.$route.params.game + '/products')).data
    },

    async onSortProducts() {
      const products = this.products as any

      let sortedProducts = products.map((product: any, index: number) => {
        return {
          id: product.id,
          position: index
        }
      })

      await this.$axios.post('/api/admin/games/' + this.$route.params.game + '/products/position', {
        products: sortedProducts
      });
      await this.update();
    }
  }
})
</script>
