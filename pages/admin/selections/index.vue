<template>
  <div class="admin-selections">
    <a href="/admin/selections/create" class="admin-action">Создать подборку</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(selection, index) in selections"
          :key="index"
          @click="$router.push({ name: 'admin-selections-selection', params: { selection: selection.id } })"
        >
          <TableCol>
            #{{ selection.id }}
          </TableCol>
          <TableCol>
            {{ selection.name_ru }}
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
    const selections = (await $axios.get('/api/admin/selection')).data
    
    return {
      selections
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
        label: 'Подборки',
        link: '/admin/slides'
      }
    ])

    return { }
  },
})
</script>
