<template>
  <div class="admin-requirements">
    <a href="/admin/requirements-types/create" class="admin-action">Создать тип</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(requirement, index) in requirements"
          :key="index"
          @click="$router.push({ name: 'admin-requirements-types-type', params: { type: requirement.id } })"
        >
          <TableCol>
            #{{ requirement.id }}
          </TableCol>
          <TableCol>
            {{ requirement.label_ru }}
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
    const requirements = (await $axios.get('/api/admin/requirements-types')).data
    
    return {
      requirements
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
        label: 'Типы системных требований',
        link: '/admin/requirements-types'
      }
    ])

    const requirementCategoriesOptions = [
      'Требования к системе',
      'Дополнительная информация'
    ]

    return { requirementCategoriesOptions }
  },
})
</script>
