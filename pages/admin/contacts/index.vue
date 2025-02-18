<template>
  <div class="admin-contacts">
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Имя</TableCol>
        <TableCol>E-mail</TableCol>
        <TableCol>Тема</TableCol>
        <TableCol>Дата</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(contact, index) in contacts"
          :key="index"
          @click="$router.push({ name: 'admin-contacts-contact', params: { contact: contact.id } })"
        >
          <TableCol>
            #{{ contact.id }}
          </TableCol>
          <TableCol>
            {{ contact.name }}
          </TableCol>
          <TableCol>
            {{ contact.email }}
          </TableCol>
          <TableCol>
            {{ contact.theme }}
          </TableCol>
          <TableCol>
            {{ (new Date(contact.created_at )).toLocaleDateString() }} {{ (new Date(contact.created_at )).toLocaleTimeString() }}
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
    const contacts = (await $axios.get('/api/admin/contacts')).data

    return {
      contacts
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
        label: 'Контакты',
        link: '/admin/contacts'
      }
    ])

    return { }
  },
})
</script>
