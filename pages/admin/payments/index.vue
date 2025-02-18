<template>
  <div class="admin-promos admin-payments">
    <div class="admin-promos__search">
      <Input placeholder="Поиск..." v-model="search">
        <template #icon>
          <IconSearch />
        </template>
      </Input>
      <Button tag="button" @click="updatePayments">
        <IconSearch />
      </Button>
    </div>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>E-mail</TableCol>
        <TableCol>Товар</TableCol>
        <TableCol>Количество</TableCol>
        <TableCol>Статус</TableCol>
        <TableCol>Цена</TableCol>
        <TableCol>Система</TableCol>
        <TableCol>Дата</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(payment, index) in allPayments"
          :key="index"
          @click="$router.push({ name: 'admin-payments-payment', params: { payment: payment.id } })"
        >
          <TableCol>
            #{{ payment.id }}
          </TableCol>
          <TableCol>
            {{ payment.email }}
          </TableCol>
          <TableCol>
            {{ getProduct(payment.product_id).game.name_ru + ': ' + getProduct(payment.product_id).name_ru + ' - ' + getPeriod(payment.rate_id) }}
          </TableCol>
          <TableCol>
            {{ payment.count }}
          </TableCol>
          <TableCol>
            {{ getStatus(payment) }}
          </TableCol>
          <TableCol>
            <p v-html="getPrice(payment.rate_id)"></p>
          </TableCol>
          <TableCol>
            {{ payment.system }}
          </TableCol>
          <TableCol>
            {{ (new Date(payment.created_at)).toLocaleString() }}
          </TableCol>
          <!-- <TableCol>
            {{ user.name }}
          </TableCol>
          <TableCol>
            {{ user.email }}
          </TableCol>
          <TableCol>
            {{ permissions[user.adminlvl] }}
          </TableCol> -->
        </TableRow>
      </template>
    </Table>
    <div class="admin-users__pagination">
      <Button v-if="payments.next_page_url" tag="button" @click="loadPayments" theme="dark">Загрузить еще</Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const payments = (await $axios.get('/api/admin/payment/list')).data
    const products = (await $axios.get('/api/admin/products')).data
    const rates = (await $axios.get('/api/admin/product/rates')).data
    
    return {
      payments,
      products,
      rates
    }
  },

  setup() {
    const store = useStore()

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

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

    const search = ref('');

    const allPayments = ref([] as any)

    return { permissions, allPayments, search }
  },

  created() {
    // @ts-ignore
    this.allPayments = this.payments.data;
  },

  methods: {
    async loadPayments() {
      // @ts-ignore
      let nextPage = this.payments.next_page_url.indexOf('search') > -1 ? this.payments.next_page_url + `&q=${this.search}` : this.payments.next_page_url;

      let payments = await this.$axios.get(nextPage.split('http://').join('https://'));
      this.allPayments = [
        // @ts-ignore
        ...this.allPayments,
        ...payments.data.data
      ]
      this.payments = payments.data;
    },

    async updatePayments() {
      let payments = (await this.$axios.get(`/api/admin/payment/search?q=${this.search}`)).data;
      this.payments = payments;
      this.allPayments = payments.data;
    },

    getProduct(id: number) {
      // @ts-ignore
      return this.products.find((product: any) => product.id === id);
    },

    getPeriod(id: number) {
      // @ts-ignore
      let rate = this.rates.find((rate: any) => rate.id === id);
      if (!rate) return '';
      return (rate?.period) + ' дн.'
    },

    getPrice(id: number) {
      // @ts-ignore
      let rate = this.rates.find((rate: any) => rate.id === id);
      if (!rate) return '-';
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

<style lang="scss">
.admin-payments {
  .table-row {
    grid-template-columns: 0.5fr 1.5fr 1.5fr 0.7fr 1fr 0.7fr 1fr 1fr;
  }
}
</style>