<template>
  <div class="admin-stats">
    <div class="admin-stats__period">
      <p>Период:</p>
      <div class="admin-stats__period-content">
        <Input placeholder="Дата начала" v-model="startTs" type="date" />
        <Input placeholder="Дата окончания" v-model="endTs" type="date" />
        <Button tag="button" @click="select">Выбрать</Button>
      </div>
    </div>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>Платежная система</TableCol>
        <TableCol>Количество товаров</TableCol>
        <TableCol>Общая сумма</TableCol>
        <TableCol>Средний чек</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(value, system, index) in stats"
          :key="index"
        >
          <TableCol>
            {{ system }}
          </TableCol>
          <TableCol>
            {{ value.count }} шт.
          </TableCol>
          <TableCol>
            {{ value.sum }} руб.
          </TableCol>
          <TableCol>
            {{ value.price }} руб.
          </TableCol>
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useContext, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  setup() {
    const store = useStore()
    const { $axios } = useContext()

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Статистика',
        link: '/admin/payments/stats'
      }
    ])

    const date = new Date();
    const startDt = new Date(date.setDate(date.getDate() - 1));
    const endDt = new Date(date.setDate(date.getDate() + 2));

    const startTs = ref(startDt.toISOString().split('T')[0])
    const endTs = ref(endDt.toISOString().split('T')[0])

    const stats = ref({});
    
    const loadStats = async (periodStart: string, periodEnd: string) => {
      let result = await $axios.get(`/api/admin/payments/stats?start_ts=${periodStart}&end_ts=${periodEnd}`);
      stats.value = result.data;
    }

    const select = async () => {
      await loadStats(startTs.value, endTs.value);
    }

    select();

    return { permissions, stats, startTs, endTs, select }
  },

  created() {
  },

  methods: {
   
  }
})
</script>

<style lang="scss">
.admin-stats__period {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &-content {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    .input {
      margin: 0;
    }
  }
}
</style>