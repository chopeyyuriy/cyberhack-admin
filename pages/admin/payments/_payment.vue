<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <p class="admin-form__label">ID:</p>
      <Input placeholder="ID" v-model="request.id" :disabled="true" />

      <p class="admin-form__label">E-mail:</p>
      <Input placeholder="E-mail" v-model="request.email" :disabled="true" />

      <p class="admin-form__label">Товар:</p>
      <Input placeholder="Товар" :value="getProduct(request.product_id)" :disabled="true" />

      <p class="admin-form__label">Количество:</p>
      <Input placeholder="Количество" :value="request.count" :disabled="true" />

      <p class="admin-form__label">Платежная система:</p>
      <Input placeholder="Платежная система" :value="request.system" :disabled="true" />

      <p class="admin-form__label">Цена:</p>
      <Input placeholder="Цена" :value="getPrice(request.rate_id)" :disabled="true" />

      <p class="admin-form__label">Промокод:</p>
      <Input placeholder="Промокод" :value="request.promo ? request.promo.text : 'Нет'" :disabled="true" />

      <p class="admin-form__label">Ключи:</p>
      <InputTextarea placeholder="Ключи" :value="request.key" :disabled="true" />

      <p class="admin-form__label">Статус:</p>
      <Input placeholder="Статус" :value="getStatus(request)" :disabled="true" />

      <p class="admin-form__label">Дата:</p>
      <Input placeholder="Дата" :value="(new Date(request.created_at)).toLocaleString()" :disabled="true" />
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
  
  async asyncData({ $axios }) {
    const products = (await $axios.get('/api/admin/products')).data
    const rates = (await $axios.get('/api/admin/product/rates')).data
    
    return {
      products,
      rates
    }
  },

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
        label: 'Платежи',
        link: '/admin/payments'
      }
    ])

    const request = ref({
      title_ru: '',
      title_en: '',
      text_ru: '',
      text_en: '',
    } as {
      [key: string]: any
    })

    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    const iconRef = ref({} as HTMLInputElement)
    const iconPreview = ref('')

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/payment/${route.value.params.payment}`).then((response: any) => {
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
            label: 'Платежи',
            link: '/admin/payments'
          }
        ])
      })
    }

    return { request, isLoading, errors, entity, iconRef, iconPreview }
  },

  methods: {
    getProduct(id: number) {
      // @ts-ignore
      return this.products.find((product: any) => product.id === id)?.name_ru;
    },

    getPrice(id: number) {
      // @ts-ignore
      let rate = this.rates.find((rate: any) => rate.id === id);
      if (!rate) return '';
      return `${rate.cost - rate.cost * (rate.sale / 100)}${rate.currency}`;
    },

    getStatus(payment: any) {
      let now = new Date();
      let createdAt = new Date(payment.created_at);
      let timeOffset = (now.getTime() - createdAt.getTime()) / 1000 / 60; 
      if (payment.key === '' && timeOffset <= 60) return 'В обработке';
      else if (payment.key === '' && timeOffset > 60) return 'Отклонено';
      return 'Оплачено';
    }
  }
})
</script>
