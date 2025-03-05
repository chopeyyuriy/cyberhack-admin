<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <div class="admin-form__errors">
        <p v-for="(error, index) in errors" :key="index">
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
          <Input placeholder="Путь" v-model="productRequest.path" />

          <p class="admin-form__label">Название (RU):</p>
          <Input placeholder="Название (RU)" v-model="productRequest.name_ru" />

          <p class="admin-form__label">Название (EN):</p>
          <Input placeholder="Название (EN)" v-model="productRequest.name_en" />

          <p class="admin-form__label">Описание (RU):</p>
          <InputTextarea
            placeholder="Описание (RU)"
            v-model="productRequest.description_ru"
          />

          <p class="admin-form__label">Описание (EN):</p>
          <InputTextarea
            placeholder="Описание (EN)"
            v-model="productRequest.description_en"
          />

          <p class="admin-form__label">Описание Extra (RU):</p>
          <InputTextarea
            placeholder="Описание Extra (RU)"
            v-model="productRequest.description_extra_ru"
          />

          <p class="admin-form__label">Описание Extra (EN):</p>
          <InputTextarea
            placeholder="Описание Extra (EN)"
            v-model="productRequest.description_extra_en"
          />

          <p class="admin-form__label">Игра:</p>
          <InputSelect :data="gamesOptions" v-model="productRequest.game_id" />

          <p class="admin-form__label">Статус:</p>
          <InputSelect :data="statusOptions" v-model="productRequest.status" />

          <p class="admin-form__label">Подсказка региональной цены (RU):</p>
          <Input
            placeholder="Подсказка региональной цены (RU)"
            v-model="productRequest.price_hint_ru"
          />

          <p class="admin-form__label">Подсказка региональной цены (EN):</p>
          <Input
            placeholder="Подсказка региональной цены (EN)"
            v-model="productRequest.price_hint_en"
          />

          <!-- <p class="admin-form__label">Инструкция:</p>
          <Input placeholder="Инструкция" v-model="productRequest.instruction" /> -->
        </template>
      </Wrapper>

      <Wrapper title="SEO адаптация">
        <template #content>
          <p class="admin-form__label">SEO: Заголовок (RU):</p>
          <Input
            placeholder="SEO: Заголовок (RU)"
            v-model="productRequest.seo_title_ru"
          />

          <p class="admin-form__label">SEO: Заголовок (EN):</p>
          <Input
            placeholder="SEO: Заголовок (EN)"
            v-model="productRequest.seo_title_en"
          />

          <p class="admin-form__label">SEO: Ключевые слова (RU):</p>
          <Input
            placeholder="SEO: Ключевые слова (RU)"
            v-model="productRequest.seo_keywords_ru"
          />

          <p class="admin-form__label">SEO: Ключевые слова (EN):</p>
          <Input
            placeholder="SEO: Ключевые слова (EN)"
            v-model="productRequest.seo_keywords_en"
          />

          <p class="admin-form__label">SEO: Описание (RU):</p>
          <InputTextarea
            placeholder="SEO: Описание (RU)"
            v-model="productRequest.seo_description_ru"
          />

          <p class="admin-form__label">SEO: Описание (EN):</p>
          <InputTextarea
            placeholder="SEO: Описание (EN)"
            v-model="productRequest.seo_description_en"
          />
        </template>
      </Wrapper>

      <Wrapper title="Теги">
        <template #content>
          <div class="admin-form__inline">
            <p class="admin-form__label">
              <b>Теги:</b>
            </p>
            <div
              v-for="(tag, index) in productRequest.tags"
              :key="index"
              class="admin-form__inline-item"
            >
              <div class="admin-form__inline-item__delete">
                <button @click="removeInline('tags', index)">Удалить</button>
              </div>

              <p class="admin-form__label">Тег:</p>
              <InputSelect :data="tagOptions" v-model="tag.tag_id" />
            </div>
            <Button
              @click="addInline('tags', { tag_id: 0 })"
              tag="button"
              theme="dark"
              >Добавить тег</Button
            >
          </div>
        </template>
      </Wrapper>

      <Wrapper title="Медиа">
        <template #content>
          <div class="admin-form__file" @change="onChangeImage">
            <p>Выберите изображение</p>
            <input ref="imageRef" type="file" accept="images/*" />
            <img v-if="imagePreview.length" :src="imagePreview" alt="" />
          </div>

          <p class="admin-form__label">Видео:</p>
          <Input placeholder="Видео" v-model="productRequest.video" />

          <Wrapper title="Изображения">
            <template #content>
              <div class="admin-form__inline">
                <p class="admin-form__label">
                  <b>Изображения:</b>
                </p>
                <div
                  v-for="(image, index) in productRequest.images"
                  :key="index"
                  class="admin-form__inline-item"
                >
                  <div class="admin-form__inline-item__delete">
                    <button @click="removeInline('images', index)">
                      Удалить
                    </button>
                  </div>
                  <div
                    v-if="!image.preview && typeof image.image != 'string'"
                    class="admin-form__file"
                  >
                    <p>Выберите изображение</p>
                    <input
                      type="file"
                      accept="images/*"
                      multiple
                      @change="
                        onChangeInlineImage('images', index, $event, true)
                      "
                    />
                  </div>
                  <img
                    v-else
                    style="max-width: 200px"
                    :src="
                      typeof image.image == 'string'
                        ? image.image
                        : image.preview
                    "
                    alt=""
                  />
                </div>
                <Button
                  @click="addInline('images', { image: null })"
                  tag="button"
                  theme="dark"
                  >Добавить изображение</Button
                >
              </div>
            </template>
          </Wrapper>
        </template>
      </Wrapper>

      <Wrapper title="Функционал">
        <template #content>
          <div class="admin-form__inline">
            <p class="admin-form__label">
              <b>Функционал:</b>
            </p>
            <div
              v-for="(func, index) in productRequest.functions"
              :key="index"
              class="admin-form__inline-item"
            >
              <div class="admin-form__inline-item__delete">
                <button @click="removeInline('functions', index)">
                  Удалить
                </button>
              </div>

              <p class="admin-form__label">Тип:</p>
              <InputSelect :data="functionTypeOptions" v-model="func.type" />

              <p class="admin-form__label">Описание (RU):</p>
              <InputTextarea
                placeholder="Список функций через запятую (RU)"
                v-model="func.content_ru"
              />

              <p class="admin-form__label">Описание (EN):</p>
              <InputTextarea
                placeholder="Список функций через запятую (EN)"
                v-model="func.content_en"
              />

              <div class="admin-form__checkbox">
                <InputCheckbox v-model="func.is_extra" />
                <p>Экстра</p>
              </div>
            </div>
            <Button
              @click="
                addInline('functions', {
                  content_ru: '',
                  content_en: '',
                  type: 0,
                  is_extra: false,
                })
              "
              tag="button"
              theme="dark"
              >Добавить функционал</Button
            >
          </div>
        </template>
      </Wrapper>

      <Wrapper title="Системные требования">
        <template #content>
          <div class="admin-form__inline">
            <p class="admin-form__label">
              <b>Системные требования:</b>
            </p>
            <div
              v-for="(requirement, index) in productRequest.requirements"
              :key="index"
              class="admin-form__inline-item"
            >
              <div class="admin-form__inline-item__delete">
                <button @click="removeInline('requirements', index)">
                  Удалить
                </button>
              </div>

              <p class="admin-form__label">Системное требование:</p>
              <InputSelect
                :data="requirementsOptions"
                v-model="requirement.requirement_id"
              />
            </div>
            <Button
              @click="addInline('requirements', { requirement_id: 0 })"
              tag="button"
              theme="dark"
              >Добавить системное требование</Button
            >
          </div>
        </template>
      </Wrapper>

      <Wrapper title="Обновления">
        <template #content>
          <div class="admin-form__inline">
            <p class="admin-form__label">
              <b>Обновления:</b>
            </p>
            <div
              v-for="(update, index) in productRequest.updates"
              :key="index"
              class="admin-form__inline-item"
            >
              <div class="admin-form__inline-item__delete">
                <button @click="removeInline('updates', index)">Удалить</button>
              </div>

              <p class="admin-form__label">Дата:</p>
              <Input placeholder="Дата" v-model="update.date" />

              <p class="admin-form__label">Текст (RU):</p>
              <InputTextarea
                placeholder="Текст (RU)"
                v-model="update.text_ru"
                style="margin-top: 16px"
              />

              <p class="admin-form__label">Текст (EN):</p>
              <InputTextarea
                placeholder="Текст (EN)"
                v-model="update.text_en"
                style="margin-top: 16px"
              />
            </div>
            <Button
              @click="
                addInline('updates', { date: '', text_ru: '', text_en: '' })
              "
              tag="button"
              theme="dark"
              >Добавить обновление</Button
            >
          </div>
        </template>
      </Wrapper>

      <Wrapper title="Тарифы">
        <template #content>
          <div class="admin-form__inline">
            <p class="admin-form__label">Название LITE:</p>
            <Input
              placeholder="Название LITE"
              v-model="productRequest.extra_lite_name"
            />

            <p class="admin-form__label">Название FULL:</p>
            <Input
              placeholder="Название FULL"
              v-model="productRequest.extra_full_name"
            />

            <p class="admin-form__label">
              <b>Тарифы:</b>
            </p>
            <div
              v-for="(rate, index) in productRequest.rates"
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
              <Input
                placeholder="Стоимость"
                v-model="rate.cost"
                type="number"
              />

              <p class="admin-form__label">Скидка (%):</p>
              <Input placeholder="Скидка" v-model="rate.sale" type="number" />

              <p class="admin-form__label">Валюта:</p>
              <InputSelect
                :data="rateCurrencyOptions"
                v-model="rate.currency"
              />

              <p class="admin-form__label">Ссылка на оплату:</p>
              <Input placeholder="Ссылка на оплату" v-model="rate.url" />

              <p class="admin-form__label">Статус:</p>
              <InputSelect :data="extraOptions" v-model="rate.extra_value" />
            </div>
            <Button
              @click="
                addInline('rates', {
                  id: null,
                  region: '',
                  period: 1,
                  sale: 0,
                  cost: 0,
                  currency: '₽',
                  url: '',
                  keys: '',
                  is_digiseller_available: true,
                  is_freekassa_available: true,
                  is_webmoney_available: true,
                  extra_value: 0,
                })
              "
              tag="button"
              theme="dark"
              >Добавить тариф</Button
            >
          </div>
        </template>
      </Wrapper>
      <Wrapper title="Характеристики">
        <template #content>
          <p class="admin-form__label">OS:</p>
          <InputSelect :data="osOptions" v-model="productRequest.os" />

          <p class="admin-form__label">Processor:</p>
          <InputSelect :data="cpuOptions" v-model="productRequest.processor" />

          <div class="admin-form__checkbox">
            <InputCheckbox v-model="productRequest.is_favorable_price" />
            <p>Выгодная цена</p>
          </div>
          <div class="admin-form__checkbox">
            <InputCheckbox v-model="productRequest.is_new" />
            <p>New</p>
          </div>
          <div class="admin-form__checkbox">
            <InputCheckbox v-model="productRequest.is_popular" />
            <p>Популярный</p>
          </div>
        </template>
      </Wrapper>

      <div class="admin-form__checkbox">
        <InputCheckbox v-model="productRequest.active" />
        <p>Активно</p>
      </div>

      <div v-if="!isLoading" class="admin-form__button">
        <Button
          v-if="game"
          tag="button"
          theme="dark"
          style="margin-right: 10px"
          @click="deleteProduct"
          >Удалить</Button
        >
        <Button
          v-if="game"
          tag="button"
          @click="copy"
          style="margin-right: 10px"
          >Дублировать</Button
        >
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
  defineComponent,
  ref,
  useContext,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async fetch({ store, $axios }) {
    const response = await $axios.get('/api/admin/games')
    store.commit('game/SET_GAME_LIST', response.data)
  },

  setup() {
    const { $axios, $toast } = useContext() as any
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Товары',
        link: '/admin/products',
      },
      {
        label: 'Создание продукта',
        link: '/admin/products/create',
      },
    ])

    const functionTypeOptions = [
      {
        label: 'Aimbot',
        value: 0,
      },
      {
        label: 'Weapon',
        value: 1,
      },
      {
        label: 'Player visuals',
        value: 2,
      },
      {
        label: 'World Visuals',
        value: 3,
      },
      {
        label: 'Collectables',
        value: 4,
      },
      {
        label: 'Misc',
        value: 5,
      },
    ]

    const games = computed(() => store.getters['game/list'])
    const gamesOptions = [
      {
        label: 'Выберите игру',
        value: 0,
      },
      ...games.value.map((game: any) => {
        return {
          label: game.name_ru,
          value: game.id,
        }
      }),
    ]

    const extraOptions = [
      {
        label: 'Не задано',
        value: 0,
      },
      {
        label: 'FULL',
        value: 1,
      },
      {
        label: 'LITE',
        value: 2,
      },
    ]

    let requirementsOptions = ref([] as any)
    $axios.get('/api/admin/requirements').then((response: any) => {
      requirementsOptions.value = [
        {
          label: 'Выберите системное требование',
          value: 0,
        },
        ...response.data.map((requirement: any) => ({
          label: requirement.type.label_ru + ': ' + requirement.text_ru,
          value: requirement.id,
        })),
      ]
    })

    let tagOptions = ref([] as any)
    $axios.get('/api/admin/tag').then((response: any) => {
      tagOptions.value = [
        {
          label: 'Выберите тег',
          value: 0,
        },
        ...response.data.map((tag: any) => ({
          label: tag.label_ru,
          value: tag.id,
        })),
      ]
    })

    const rateRegionsOptions = [
      {
        label: 'Выберите регион',
        value: '',
      },
      {
        label: 'CIS',
        value: 'cis',
      },
      {
        label: 'Global',
        value: 'global',
      },
    ]

    const rateCurrencyOptions = [
      {
        label: '₽',
        value: '₽',
      },
      {
        label: '$',
        value: '$',
      },
    ]

    const statusOptions = [
      {
        label: 'Updating',
        value: 0,
      },
      {
        label: 'Detected',
        value: 1,
      },
      {
        label: 'Undetected',
        value: 2,
      },
      {
        label: 'Testing',
        value: 3,
      },
      {
        label: 'At own risk',
        value: 4,
      },
    ]

    const osOptions = [
      {
        label: 'Windows 10',
        value: 1,
      },
      {
        label: 'Windows 11',
        value: 2,
      },
    ]

    const cpuOptions = [
      {
        label: 'AMD',
        value: 1,
      },
      {
        label: 'Intel',
        value: 2,
      },
    ]

    const productRequest = ref({
      game_id: 0,
      path: '',
      name_ru: '',
      name_en: '',
      description_ru: '',
      description_en: '',
      description_extra_ru: '',
      description_extra_en: '',
      instruction: '',
      video: '',
      keys: '',
      status: 0,
      image: null as any,
      images: [],
      functions: [],
      requirements: [],
      tags: [],
      updates: [],
      rates: [],
      active: true,
      price_hint_ru: '',
      price_hint_en: '',
      extra_lite_name: 'LITE',
      extra_full_name: 'FULL',
      os: '',
      processor: '',
      is_favorable_price: false,
      is_new: false,
      is_popular: false,
    } as {
      [key: string]: any
    })

    const imageRef = ref({} as HTMLInputElement)
    const imagePreview = ref('')

    const isLoading = ref(false)
    const errors = ref([])

    const game = ref(null as any)

    if (route.value.params.product != 'create') {
      $axios
        .get(`/api/admin/products/${route.value.params.product}`)
        .then((response: any) => {
          const productResponse = response.data
          game.value = productResponse
          productRequest.value = {
            ...productRequest.value,
            ...productResponse,
            // ...(productResponse?.specification ?? {}),
            video: productResponse?.video ?? '',
            requirements: productResponse.requirements.filter(
              (requirement: any) => !!requirement
            ),
          }
          if (productResponse?.specification) {
            const { os, processor, is_favorable_price, is_new, is_popular } =
              productResponse?.specification
            productRequest.value = {
              ...productRequest.value,
              os,
              processor,
              is_favorable_price,
              is_new,
              is_popular,
            }
          }
          imagePreview.value = productResponse.image
          store.commit('crumbs/SET_PATH', [
            {
              label: 'Администрирование',
              link: '/admin',
            },
            {
              label: 'Товары',
              link: '/admin/products',
            },
            {
              label: game.value.name_ru,
              link: `/admin/products/${game.value.id}`,
            },
          ])
        })
    }

    const addInline = (name: string, value: any) => {
      productRequest.value[name].push(value)
    }

    const removeInline = (name: string, index: number) => {
      productRequest.value[name] = productRequest.value[name].filter(
        (_: any, itemIndex: number) => itemIndex != index
      )
    }

    const onChangeInlineImage = (
      name: string,
      index: number,
      e: any,
      multiple: boolean = false
    ) => {
      if (e.target.files) {
        const file = e.target.files[0]
        productRequest.value[name][index].image = file
        productRequest.value[name][index].preview = URL.createObjectURL(file)
        if (multiple) {
          for (let index = 1; index < e.target.files.length; ++index) {
            productRequest.value[name].push({
              image: e.target.files[index],
              preview: URL.createObjectURL(e.target.files[index]),
            })
          }
        }
      }
    }

    const create = async () => {
      isLoading.value = true
      errors.value = []

      const formData = new FormData()

      const exceptKeys = [
        'functions',
        'images',
        'requirements',
        'rates',
        'tags',
      ]
      for (const key of Object.keys(productRequest.value)) {
        if (!exceptKeys.includes(key)) {
          let value = productRequest.value[key]
          if (typeof value == 'boolean') value = Number(value)
          formData.append(key, value)
        }
      }

      for (const image of productRequest.value.images) {
        if (image.image) formData.append('images[]', image.image)
      }

      productRequest.value.functions.forEach((func: any, index: number) => {
        formData.append(`functions[${index}][0]`, func.content_ru)
        formData.append(`functions[${index}][1]`, func.content_en)
        formData.append(`functions[${index}][2]`, func.type)
        formData.append(`functions[${index}][3]`, func.is_extra)
      })

      productRequest.value.requirements.forEach(
        (requirement: any, index: number) => {
          formData.append(
            `requirements[${index}][0]`,
            requirement.requirement_id
          )
        }
      )

      productRequest.value.tags.forEach((tag: any, index: number) => {
        formData.append(`tags[${index}][0]`, tag.tag_id)
      })

      productRequest.value.updates.forEach((update: any, index: number) => {
        formData.append(`updates[${index}][0]`, update.date)
        formData.append(`updates[${index}][1]`, update.text_ru)
        formData.append(`updates[${index}][2]`, update.text_en)
      })

      productRequest.value.rates.forEach((rate: any, index: number) => {
        if (rate.region.length && rate.period) {
          formData.append(`rates[${index}][0]`, rate.region)
          formData.append(`rates[${index}][1]`, rate.period)
          formData.append(`rates[${index}][2]`, rate.sale)
          formData.append(`rates[${index}][3]`, rate.cost)
          formData.append(`rates[${index}][4]`, rate.currency)
          formData.append(`rates[${index}][5]`, rate.url)
          formData.append(`rates[${index}][6]`, rate.keys)
          formData.append(`rates[${index}][7]`, rate.is_digiseller_available)
          formData.append(`rates[${index}][8]`, rate.is_freekassa_available)
          formData.append(`rates[${index}][9]`, rate.is_webmoney_available)
          formData.append(`rates[${index}][10]`, rate.extra_value)
        }
      })

      const response = (await $axios.post('/api/admin/products', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('При создании товара произошла ошибка!', {
            draggable: false,
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Товар успешно создан!', {
          draggable: false,
        })
        router.push({ name: 'admin-products' })
      }

      isLoading.value = false
    }

    const deleteProduct = async () => {
      isLoading.value = true
      await $axios.delete(`/api/admin/products/${game.value.id}`)
      window.location.replace('/admin/products')
      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      const formData = new FormData()

      const exceptKeys = [
        'functions',
        'images',
        'requirements',
        'rates',
        'tags',
      ]

      for (const key of Object.keys(productRequest.value)) {
        if (!exceptKeys.includes(key)) {
          let value = productRequest.value[key]
          console.log(key)
          if (typeof value == 'boolean') value = Number(value)
          formData.append(key, value)
        }
      }

      for (const image of productRequest.value.images) {
        if (image.image) formData.append('images[]', image.image)
      }

      productRequest.value.functions.forEach((func: any, index: number) => {
        formData.append(`functions[${index}][0]`, func.content_ru)
        formData.append(`functions[${index}][1]`, func.content_en)
        formData.append(`functions[${index}][2]`, func.type)
        formData.append(`functions[${index}][3]`, func.is_extra)
      })

      productRequest.value.requirements.forEach(
        (requirement: any, index: number) => {
          formData.append(
            `requirements[${index}][0]`,
            requirement.requirement_id
          )
        }
      )

      productRequest.value.tags.forEach((tag: any, index: number) => {
        formData.append(`tags[${index}][0]`, tag.tag_id)
      })

      productRequest.value.updates.forEach((update: any, index: number) => {
        formData.append(`updates[${index}][0]`, update.date)
        formData.append(`updates[${index}][1]`, update.text_ru)
        formData.append(`updates[${index}][2]`, update.text_en)
      })

      productRequest.value.rates.forEach((rate: any, index: number) => {
        if (rate.region.length && rate.period) {
          formData.append(`rates[${index}][0]`, rate.region)
          formData.append(`rates[${index}][1]`, rate.period)
          formData.append(`rates[${index}][2]`, rate.sale)
          formData.append(`rates[${index}][3]`, rate.cost)
          formData.append(`rates[${index}][4]`, rate.currency)
          formData.append(`rates[${index}][5]`, rate.url)
          formData.append(`rates[${index}][6]`, rate.keys)
          formData.append(`rates[${index}][7]`, rate.id)
          formData.append(`rates[${index}][8]`, rate.is_digiseller_available)
          formData.append(`rates[${index}][9]`, rate.is_freekassa_available)
          formData.append(`rates[${index}][10]`, rate.is_webmoney_available)
          formData.append(`rates[${index}][11]`, rate.extra_value)
        }
      })

      const response = (await $axios.post(
        `/api/admin/products/${game.value.id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      )) as any
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors

          $toast.error('При обновлении товара произошла ошибка!', {
            draggable: false,
          })
        } catch {
          errors.value = []
        }
      } else {
        $toast.success('Товар успешно сохранен!', {
          draggable: false,
          timeout: 2000,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
      isLoading.value = false
    }

    const copy = async () => {
      const response = await $axios.post(
        `/api/admin/products/${game.value.id}/copy`
      )
      if (response.status == 200) {
        window.location.replace(`/admin/products/${response.data.id}`)
      }
    }

    const onChangeImage = (e: any) => {
      if (imageRef.value.files?.length) {
        const file = imageRef.value.files[0]
        imagePreview.value = URL.createObjectURL(file)
        productRequest.value.image = file
      }
    }

    return {
      functionTypeOptions,
      games,
      tagOptions,
      gamesOptions,
      extraOptions,
      rateRegionsOptions,
      rateCurrencyOptions,
      statusOptions,
      productRequest,
      copy,
      create,
      save,
      deleteProduct,
      onChangeImage,
      imageRef,
      imagePreview,
      isLoading,
      errors,
      game,
      addInline,
      removeInline,
      onChangeInlineImage,
      requirementsOptions,
      osOptions,
      cpuOptions,
    }
  },
})
</script>
