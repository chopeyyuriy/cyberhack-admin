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

      <p class="admin-form__label">Промокод:</p>
      <Input placeholder="Промокод" v-model="request.text" />

      <p class="admin-form__label">Скидка:</p>
      <Input placeholder="Скидка" v-model="request.sale" type="number" />

      <p class="admin-form__label">Дата начала:</p>
      <Input placeholder="Дата начала" v-model="request.start_ts" type="datetime-local" />

      <p class="admin-form__label">Дата конца:</p>
      <Input placeholder="Дата конца" v-model="request.end_ts" type="datetime-local" />

      <p class="admin-form__label">Количество использований (-1, если без ограничений):</p>
      <Input placeholder="Количество использований" v-model="request.uses" type="number" />

      <div class="admin-promo-codes__products">
        <InputSelect 
          v-for="(product, index) in request.product_ids"
          :key="index"
          :data="productsOptions" 
          v-model="request.product_ids[index]"
          @input="addNewProduct"
        />
      </div>

      <div class="admin-form__checkbox">
        <InputCheckbox v-model="request.active" />
        <p>Активно</p>
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
        label: 'Промокоды',
        link: '/admin/promos'
      },
      {
        label: 'Создание промокода',
        link: '/admin/promos/create'
      }
    ])

    const products = ref([])
    const productsOptions = computed(() => [{
        label: 'Выберите продукт',
        value: 0
      },
      ...products.value.map((product: any) => {
        return {
          label: `${product.game.name_ru}: ${product.name_ru}`,
          value: product.id
        }
      })
    ])

    $axios.get('/api/admin/products').then((response) => products.value = response.data);

    let d = new Date()
    let start_ts = (new Date())
    start_ts.setHours(0);
    start_ts.setUTCHours(0);
    start_ts.setMinutes(0);
    start_ts.setUTCMinutes(0);
    let end_ts = (new Date())
    end_ts.setHours(0);
    end_ts.setUTCHours(0);
    end_ts.setMinutes(0);
    end_ts.setUTCMinutes(0);
    end_ts.setFullYear(end_ts.getFullYear() + 1);
    const request = ref({
      text: '',
      sale: 0,
      active: true,
      uses: -1,
      start_ts: start_ts.toISOString().slice(0, -5),
      end_ts: end_ts.toISOString().slice(0, -5),
      product_ids: []
    } as {
      [key: string]: any
    })
// ('YYYY-MM-DDThh:mm')
    const isLoading = ref(false)
    const errors = ref([])

    const entity = ref(null as any)

    const addNewProduct = () => {
      let lastProductID = request.value.product_ids[request.value.product_ids.length - 1]
      if (lastProductID !== 0)
        request.value.product_ids.push(0);
    }

    if (route.value.params.slide != 'create') {
      $axios.get(`/api/admin/promos/${route.value.params.promo}`).then((response: any) => {
        const entityResponse = response.data
        entity.value = entityResponse

        let product_ids = [];
        try {
          product_ids = JSON.parse(entityResponse.product_ids);
        } catch {
          product_ids = [];
        }

        request.value = {
          ...request.value,
          ...entityResponse,
          product_ids,
        }

        addNewProduct();

        store.commit('crumbs/SET_PATH', [
          {
            label: 'Администрирование',
            link: '/admin'
          },
          {
            label: 'Промокоды',
            link: '/admin/promos'
          }
        ])
      })
    }

    addNewProduct();

    const create = async () => {
      isLoading.value = true
      errors.value = []

      let requestData = { 
        ...request.value,
        product_ids: JSON.stringify(Array.from(new Set(request.value.product_ids.filter((item: number) => item > 0))))
      }

      const response = await $axios.post('/api/admin/promos', requestData) as any;
      if (response.status !== 200) {
        try {
          errors.value = response.response.data.errors
        } catch {
          errors.value = []
        }
      } else {
        window.location.replace('/admin/promos')
      }

      isLoading.value = false
    }

    const save = async () => {
      isLoading.value = true

      let requestData = { 
        ...request.value,
        product_ids: JSON.stringify(Array.from(new Set(request.value.product_ids.filter((item: number) => item > 0)))),
      }

      const response = await $axios.put('/api/admin/promos/' + route.value.params.promo, requestData) as any;
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
      await $axios.delete(`/api/admin/promos/${entity.value.id}`)
      window.location.replace('/admin/promos')
      isLoading.value = false
    }

    return { request, create, deleteEntity, isLoading, errors, entity, save, productsOptions, addNewProduct }
  },
})
</script>
