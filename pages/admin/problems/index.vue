<template>
  <div class="admin-problems">
    <a href="/admin/problems/create" class="admin-action">Добавить проблему</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Заголовок</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(problem, index) in problems"
          :key="index"
          @click="$router.push({ name: 'admin-problems-problem', params: { problem: problem.id } })"
        >
          <TableCol>
            #{{ problem.id }}
          </TableCol>
          <TableCol>
            {{ problem.title_ru }}
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
    const problems = (await $axios.get('/api/admin/problems')).data
    
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
        label: 'Популярные проблемы',
        link: '/admin/problems'
      }
    ])

    return { }
  },
})
</script>
