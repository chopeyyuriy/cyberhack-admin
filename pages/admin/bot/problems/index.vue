<template>
  <div class="admin-promos">
    <a href="/admin/bot/problems/create" class="admin-action">Создать проблему</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(problem, index) in problems"
          :key="index"
          @click="$router.push({ name: 'admin-bot-problems-problem', params: { problem: problem.id } })"
        >
          <TableCol>
            #{{ problem.id }}
          </TableCol>
          <TableCol>
            {{ problem.name_ru }}
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
    const problems = (await $axios.get('/api/admin/bot/problems')).data
    
    return {
      problems
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
        label: 'Бот: проблемы',
        link: '/admin/bot/problems'
      }
    ])

    return { }
  },
})
</script>
