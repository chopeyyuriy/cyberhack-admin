<template>
  <div class="admin-requirements">
    <a href="/admin/bans/create" class="admin-action">Добавить</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>IP адрес</TableCol>
        <TableCol>E-mail</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(ban, index) in bans"
          :key="index"
          @click="$router.push({ name: 'admin-bans-ban', params: { ban: ban.id } })"
        >
          <TableCol>
            #{{ ban.id }}
          </TableCol>
          <TableCol>
            {{ ban.ip ? ban.ip : '-' }}
          </TableCol>
          <TableCol>
            {{ ban.email ? ban.email : '-' }}
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
    const bans = (await $axios.get('/api/admin/bans')).data
    
    return {
      bans
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
        label: 'Список банов',
        link: '/admin/bans'
      }
    ])

    return { }
  },
})
</script>
