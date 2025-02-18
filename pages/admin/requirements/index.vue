<template>
  <div class="admin-requirements">
    <a href="/admin/requirements/create" class="admin-action">Создать требование</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Тип</TableCol>
        <TableCol>Текст</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(requirement, index) in requirements"
          :key="index"
          @click="$router.push({ name: 'admin-requirements-requirement', params: { requirement: requirement.id } })"
        >
          <TableCol>
            #{{ requirement.id }}
          </TableCol>
          <TableCol>
            {{ requirement.type ? requirement.type.label_ru : '-' }}
          </TableCol>
          <TableCol>
            {{ requirement.text_ru }}
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
    const requirements = (await $axios.get('/api/admin/requirements')).data
    
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
        label: 'Слайды',
        link: '/admin/slides'
      }
    ])

    const requirementCategoriesOptions = [
      'Требования к системе',
      'Дополнительная информация'
    ]

    const requirementTypesSystemOptions = {
      cpu: 'Поддерживаемые процессоры',
      oc: 'Поддерживаемые ОС',
      assembly: 'Поддерживаемые сборки'
    } as any

    const requirementTypesOtherOptions = {
      type: 'Тип проекта',
      mode: 'Режим игры',
      method: 'Метод игры не в окне',
      mods: 'Работает в режимах',
      spoofer: 'Спуфер'
    } as any

    return { requirementCategoriesOptions, requirementTypesSystemOptions, requirementTypesOtherOptions }
  },
})
</script>
