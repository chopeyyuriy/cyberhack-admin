<template>
  <div class="admin-promos">
    <a href="/admin/bot/solutions/create" class="admin-action">Создать решение</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(solution, index) in solutions"
          :key="index"
          @click="$router.push({ name: 'admin-bot-solutions-solution', params: { solution: solution.id } })"
        >
          <TableCol>
            #{{ solution.id }}
          </TableCol>
          <TableCol>
            {{ solution.name_ru }}
          </TableCol>
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const solutions = (await $axios.get('/api/admin/bot/problem/solutions')).data
    
    return {
      solutions
    }
  },

  setup() {
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Бот: решения',
        link: '/admin/bot/solutions'
      }
    ])

    return { }
  },
})
</script>
