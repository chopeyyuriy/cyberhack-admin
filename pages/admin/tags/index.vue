<template>
  <div class="admin-tags">
    <a href="/admin/tags/create" class="admin-action">Создать тег</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
        <TableCol>Выделенный</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(tag, index) in tags"
          :key="index"
          @click="$router.push({ name: 'admin-tags-tag', params: { tag: tag.id } })"
        >
          <TableCol>
            #{{ tag.id }}
          </TableCol>
          <TableCol>
            {{ tag.label_ru }}
          </TableCol>
          <TableCol>
            {{ tag.is_selected ? 'Да' : 'Нет' }}
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
    const tags = (await $axios.get('/api/admin/tag')).data
    
    return {
      tags
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
        label: 'Слайды',
        link: '/admin/slides'
      }
    ])

    return { }
  },
})
</script>
