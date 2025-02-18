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
          <Input placeholder="Путь" v-model="accountRequest.path" />

          <p class="admin-form__label">Название (RU):</p>
          <Input placeholder="Название (RU)" v-model="accountRequest.name_ru" />

          <p class="admin-form__label">Название (EN):</p>
          <Input placeholder="Название (EN)" v-model="accountRequest.name_en" />

          <p class="admin-form__label">Описание (RU):</p>
          <InputTextarea placeholder="Описание (RU)" v-model="accountRequest.description_ru" />

          <p class="admin-form__label">Описание (EN):</p>
          <InputTextarea placeholder="Описание (EN)" v-model="accountRequest.description_en" />

          <p class="admin-form__label">Полное описание (RU):</p>
          <InputTextarea placeholder="Полное описание (RU)" v-model="accountRequest.full_description_ru" />

          <p class="admin-form__label">Полное описание (EN):</p>
          <InputTextarea placeholder="Полное описание (EN)" v-model="accountRequest.full_description_en" />

          <p class="admin-form__label">Платформа:</p>
          <InputSelect :data="platformOptions" v-model="accountRequest.platform" />
        </template>
      </Wrapper>

      <Wrapper title="SEO адаптация">
        <template #content>
          <p class="admin-form__label">SEO: Заголовок (RU):</p>
          <Input placeholder="SEO: Заголовок (RU)" v-model="accountRequest.seo_title_ru" />

          <p class="admin-form__label">SEO: Заголовок (EN):</p>
          <Input placeholder="SEO: Заголовок (EN)" v-model="accountRequest.seo_title_en" />

          <p class="admin-form__label">SEO: Ключевые слова (RU):</p>
          <Input placeholder="SEO: Ключевые слова (RU)" v-model="accountRequest.seo_keywords_ru" />

          <p class="admin-form__label">SEO: Ключевые слова (EN):</p>
          <Input placeholder="SEO: Ключевые слова (EN)" v-model="accountRequest.seo_keywords_en" />

          <p class="admin-form__label">SEO: Описание (RU):</p>
          <InputTextarea placeholder="SEO: Описание (RU)" v-model="accountRequest.seo_description_ru" />

          <p class="admin-form__label">SEO: Описание (EN):</p>
          <InputTextarea placeholder="SEO: Описание (EN)" v-model="accountRequest.seo_description_en" />
        </template>
      </Wrapper>

      <Wrapper title="Медиа">
        <template #content>
          <div class="admin-form__file" @change="onChangeImage">
            <p>Выберите изображение</p>
            <input ref="imageRef" type="file" accept="images/*">
            <img v-if="imagePreview.length" :src="imagePreview" alt="">
          </div>

          <p class="admin-form__label">Видео:</p>
          <Input placeholder="Видео" v-model="accountRequest.video" />

          <Wrapper title="Изображения">
            <template #content>
              <div class="admin-form__inline">
                <p class="admin-form__label">
                  <b>Изображения:</b>
                </p>
                <div 
                  v-for="(image, index) in accountRequest.images"
                  :key="index"
                  class="admin-form__inline-item"
                >
                  <div class="admin-form__inline-item__delete">
                    <button @click="removeInline('images', index)">Удалить</button>
                  </div>
                  <div v-if="!image.preview && typeof image.image != 'string'" class="admin-form__file">
                    <p>Выберите изображение</p>
                    <input type="file" accept="images/*" multiple @change="onChangeInlineImage('images', index, $event, true)">
                  </div>
                  <img v-else style="max-width: 200px" :src="typeof image.image == 'string' ? image.image : image.preview" alt="">
                </div>
                <Button @click="addInline('images', { image: null })" tag="button" theme="dark">Добавить изображение</Button>
              </div>
            </template>
          </Wrapper>
        </template>
      </Wrapper>

    <Wrapper title="Тарифы">
      <template #content>
        <div class="admin-form__inline">
          <p class="admin-form__label">
            <b>Тарифы:</b>
          </p>
          <div 
            v-for="(rate, index) in accountRequest.rates"
            :key="index"
            class="admin-form__inline-item"
          >
            <div class="admin-form__inline-item__delete">
              <button @click="removeInline('rates', index)">Удалить</button>
            </div>

            <p class="admin-form__label">Регион:</p>
            <InputSelect :data="rateRegionsOptions" v-model="rate.region" />

            <p class="admin-form__label">Период:</p>
            <Input placeholder="Период" v-model="rate.period" type="number" />

            <p class="admin-form__label">Стоимость:</p>
            <Input placeholder="Стоимость" v-model="rate.cost" type="number" />

            <p class="admin-form__label">Скидка (%):</p>
            <Input placeholder="Скидка" v-model="rate.sale" type="number" />

            <p class="admin-form__label">Валюта:</p>
            <InputSelect :data="rateCurrencyOptions" v-model="rate.currency" />

            <p class="admin-form__label">Ссылка на оплату:</p>
            <Input placeholder="Ссылка на оплату" v-model="rate.url" />
          </div>
          <Button @click="addInline('rates', { id: null, region: '', period: 1, sale: 0, cost: 0, currency: '₽', url: '' })" tag="button" theme="dark">Добавить тариф</Button>
        </div>
    </template>
  </Wrapper>

      <div class="admin-form__checkbox">
        <InputCheckbox v-model="accountRequest.active" />
        <p>Активно</p>
      </div>

      <div v-if="!isLoading" class="admin-form__button">
        <Button v-if="game" tag="button" theme="dark" style="margin-right: 10px" @click="deleteAccount">Удалить</Button>
        <Button v-if="game" tag="button" @click="copy" style="margin-right: 10px">Дублировать</Button>
        <Button v-if="!game" tag="button" @click="create">Создать</Button>
        <Button v-else tag="button" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Config from '@/nuxt.config'
import {
  computed,
  defineComponent, ref, useContext, useRoute, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async fetch({ store, $axios }) {
    const response = await $axios.get('/api/admin/games');
    store.commit('game/SET_GAME_LIST', response.data);
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
        label: 'Товары',
        link: '/admin/accounts'
      },
      {
        label: 'Создание аккаунта',
        link: '/admin/accounts/create'
      }
    ])

    const rateRegionsOptions = [{
      label: 'Выберите регион',
      value: ''
    }, {
      label: 'CIS',
      value: 'cis'
    }, {
      label: 'Global',
      value: 'global'
    }]

    const rateCurrencyOptions = [{
      label: '₽',
      value: '₽'
    }, {
      label: '$',
      value: '$'
    }]

    const statusOptions = [{
      label: 'Updating',
      value: 0
    }, {
      label: 'Detected',
      value: 1
    }, {
      label: 'Undetected',
      value: 2
    }]

    const platformOptions = [{
      label: 'Steam',
      value: 0
    }, {
      label: 'Epic Games',
      value: 1
    }, {
      label: 'BSG Laouncher',
      value: 2
    }]

    const accountRequest = ref({
      game_id: 0,
      path: '',
      name_ru: '',
      name_en: '',
      description_ru: '',
      description_en: '',
      full_description_ru: '',
      full_description_en: '',
      instruction: '',
      video: '',
      platform: 0,
      image: null as any,
      images: [],
      rates: [],
      active: true
    } as {
      [key: string]: any
    })

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const isLoading = ref(false)
    const errors = ref([])

    const game = ref(null as any)

    if (route.value.params.account != 'create') {
      $axios.get(`/api/admin/accounts/${route.value.params.account}`).then((response: any) => {
        const accountResponse = response.data
        game.value = accountResponse
        accountRequest.value = {
          ...accountRequest.value,
          ...accountResponse
        }
        imagePreview.value = accountResponse.image
        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Товары',
            link: '/admin/accounts'
          },
          {
            label: game.value.name_ru,
            link: `/admin/accounts/${game.value.id}`
          }
        ])
      })
    }

    const addInline = (name: string, value: any) => {
      accountRequest.value[name].push(value)
    }

    const removeInline = (name: string, index: number) => {
      accountRequest.value[name] = accountRequest.value[name].filter((_: any, itemIndex: number) => itemIndex != index)
    }

    const onChangeInlineImage = (name: string, index: number, e: any, multiple: boolean = false) => {
      if (e.target.files) {
        const file = e.target.files[0]
        accountRequest.value[name][index].image = file
        accountRequest.value[name][index].preview = URL.createObjectURL(file)
        if (multiple) {
          for (let index = 1; index < e.target.files.length; ++index) {
            accountRequest.value[name].push({
              image: e.target.files[index],
              preview: URL.createObjectURL(e.target.files[index])
            })
          }
        }
      }
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const formData = new FormData()

      const exceptKeys = ['images', 'rates']
      for (const key of Object.keys(accountRequest.value)) {
        if (!exceptKeys.includes(key)) {
          let value = accountRequest.value[key]
          if (typeof value == 'boolean')
            value = Number(value)
          formData.append(key, value);
        }
      }

      for (const image of accountRequest.value.images) {
        if (image.image)
          formData.append('images[]', image.image)
      }

      accountRequest.value.rates.forEach((rate: any, index: number) => {
        if (rate.region.length && rate.period) {
          formData.append(`rates[${index}][0]`, rate.region)
          formData.append(`rates[${index}][1]`, rate.period)
          formData.append(`rates[${index}][2]`, rate.sale)
          formData.append(`rates[${index}][3]`, rate.cost)
          formData.append(`rates[${index}][4]`, rate.currency)
          formData.append(`rates[${index}][5]`, rate.url)
        }
      })

      const response = await $axios.post('/api/admin/accounts', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('При создании товара произошла ошибка!', {
            draggable: false
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Товар успешно создан!', {
          draggable: false
        })
        router.push({ name: 'admin-accounts' });
      }

      isLoading.value = false
    }

    const deleteAccount = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/accounts/${game.value.id}`)
      window.location.replace('/admin/accounts')
      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const formData = new FormData()

      const exceptKeys = ['images', 'rates']
      for (const key of Object.keys(accountRequest.value)) {
        if (!exceptKeys.includes(key)) {
          let value = accountRequest.value[key]
          if (typeof value == 'boolean')
            value = Number(value)
          formData.append(key, value);
        }
      }

      for (const image of accountRequest.value.images) {
        if (image.image)
          formData.append('images[]', image.image)
      }

      accountRequest.value.rates.forEach((rate: any, index: number) => {
        if (rate.region.length && rate.period) {
          formData.append(`rates[${index}][0]`, rate.region)
          formData.append(`rates[${index}][1]`, rate.period)
          formData.append(`rates[${index}][2]`, rate.sale)
          formData.append(`rates[${index}][3]`, rate.cost)
          formData.append(`rates[${index}][4]`, rate.currency)
          formData.append(`rates[${index}][5]`, rate.url)
          formData.append(`rates[${index}][6]`, rate.id)
        }
      })

      const response = await $axios.post(`/api/admin/accounts/${game.value.id}`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('При обновлении товара произошла ошибка!', {
            draggable: false
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Товар успешно сохранен!', {
          draggable: false,
          timeout: 2000
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
      isLoading.value = false
    }

    const copy = async () => {
      const response = await $axios.post(`/api/admin/accounts/${game.value.id}/copy`);
      if (response.status == 200) {
        window.location.replace(`/admin/accounts/${response.data.id}`)
      }
    }

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        accountRequest.value.image = file
      }
    }

    return { platformOptions, rateRegionsOptions, rateCurrencyOptions, statusOptions, accountRequest, copy, create, save, deleteAccount, onChangeImage, imageRef, imagePreview, isLoading, errors, game, addInline, removeInline, onChangeInlineImage }
  },
})
</script>
