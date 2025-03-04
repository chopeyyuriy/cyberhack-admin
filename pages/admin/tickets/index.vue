<template>
  <div class="admin-promos">
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Вопрос</TableCol>
        <TableCol>Cтатус</TableCol>
      </template>
      <template #content>
        <TableRow v-for="(ticket, index) in allTickets" :key="index">
          <TableCol> #{{ ticket.id }} </TableCol>
          <TableCol
            ><a
              :href="'/admin/tickets/' + ticket?.id"
              style="color: #20ada3; text-decoration: none"
            >
              {{ ticket.theme.name_ru }}
            </a>
          </TableCol>
          <TableCol>
            <button
              :class="'btn small' + (ticket.status === 0 ? ' btn_light' : '')"
              style="width: 140px"
              @click.prevent="toggleStatus(ticket.id, ticket.status)"
            >
              {{ statuses?.[ticket.status] }}
            </button></TableCol
          >
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'

function debounce<T extends (...args: any[]) => any>(
  callback: T,
  timeoutMs: number
): (...args: Parameters<T>) => void {
  return function perform(this: any, ...args: Parameters<T>) {
    let previousCall = this.lastCall as number | undefined

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer as NodeJS.Timeout)
    }

    this.lastCallTimer = setTimeout(
      () => callback(...args),
      timeoutMs
    ) as unknown as NodeJS.Timeout
  }
}

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  setup() {
    const store = useStore()
    const search = ref('')

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Тикеты',
        link: '/admin/tickets',
      },
    ])

    const allTickets = ref([] as any)
    const lastResult = ref(null)
    const tmt = ref(null)
    const statuses = ['Открыт', 'В процессе', 'Закрытый']
    return {
      permissions,
      allTickets,
      search,
      debounce,
      lastResult,
      tmt,
      statuses,
    }
  },

  async asyncData({ $axios }) {
    const tickets = await $axios.get('/api/admin/tickets')

    return {
      tickets: tickets?.data,
    }
  },

  created() {
    // @ts-ignore
    this.allTickets = this.tickets
  },

  methods: {
    updateTicketStatus(id: number, status: number) {
      this.allTickets = this.allTickets.map((r: any) =>
        r.id === id ? { ...r, status } : r
      )
    },
    async toggleStatus(id: number, status: number) {
      const updatedStatus =
        status === 0 ? 1 : status === 1 ? 2 : status === 2 ? 0 : 0
      await this.$axios.post('/api/admin/ticket/update-status', null, {
        params: {
          id,
          status: updatedStatus,
        },
      })
      this.updateTicketStatus(id, updatedStatus)
    },
  },
})
</script>
