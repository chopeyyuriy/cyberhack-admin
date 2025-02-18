<template>
  <div class="admin-news">
    <a href="/admin/notifications/create" class="admin-action"
      >Создать уведомление</a
    >

    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(item, index) in news"
          :key="index"
          @click="
            $router.push({
              name: 'admin-notifications-id',
              params: { id: item.id },
            })
          "
        >
          <TableCol> #{{ item.id }} </TableCol>
          <TableCol>
            {{ item.title }}
          </TableCol>
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async asyncData({ $axios }) {
    const news = (
      await $axios.get('/api/admin/get-notifications', {
        params: { perPage: 1000 },
      })
    ).data.notifications.data

    return {
      news,
    }
  },

  setup() {
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Уведомления',
        link: '/admin/notifications',
      },
    ])

    return {}
  },
})
</script>
