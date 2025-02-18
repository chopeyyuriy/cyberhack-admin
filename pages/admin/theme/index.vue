<template>
  <div class="admin-promos">
    <a href="/admin/theme/create" class="admin-action">Создать тему</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название (RU)</TableCol>
        <TableCol>Название (EN)</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(theme, index) in themes"
          :key="index"
          @click="$router.push({ name: 'admin-theme-theme', params: { theme: theme.id } })"
        >
          <TableCol>
            #{{ theme.id }}
          </TableCol>
          <TableCol>
            {{ theme.name_ru }}
          </TableCol>
          <TableCol>
            {{ theme.name_en }}
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
    const themes = (await $axios.get('/api/admin/ticket/theme')).data
    
    return {
      themes
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
        label: 'Тикеты: Темы',
        link: '/admin/theme'
      }
    ])

    return { }
  },
})
</script>
