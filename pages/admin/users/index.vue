<template>
  <div class="admin-promos">
    <Input style="margin-bottom: 16px; width: 30%" placeholder="Поиск пользователя" v-model="search" @input="onSearch">
      <template #icon>
        <IconSearch />
      </template>
    </Input>

    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Имя</TableCol>
        <TableCol>E-mail</TableCol>
        <TableCol>Права</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(user, index) in allUsers"
          :key="index"
          @click="$router.push({ name: 'admin-users-user', params: { user: user.id } })"
        >
          <TableCol>
            #{{ user.id }}
          </TableCol>
          <TableCol>
            {{ user.name }}
          </TableCol>
          <TableCol>
            {{ user.email }}
          </TableCol>
          <TableCol>
            {{ permissions[user.adminlvl] }}
          </TableCol>
        </TableRow>
      </template>
    </Table>
    <div class="admin-users__pagination">
      <Button v-if="users.next_page_url" tag="button" @click="loadUsers" theme="dark">Загрузить еще</Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useStore,
} from '@nuxtjs/composition-api'

function debounce<T extends (...args: any[]) => any>(
  callback: T,
  timeoutMs: number,
): (...args: Parameters<T>) => void {
  return function perform(this: any, ...args: Parameters<T>) {
    let previousCall = this.lastCall as number | undefined;

    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer as NodeJS.Timeout);
    }

    this.lastCallTimer = setTimeout(
      () => callback(...args),
      timeoutMs,
    ) as unknown as NodeJS.Timeout;
  };
}


export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const users = (await $axios.get('/api/admin/user/list')).data
    
    return {
      users
    }
  },

  setup() {
    const store = useStore()

    const search = ref('');

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Пользователи',
        link: '/admin/users'
      }
    ])

    const allUsers = ref([] as any)

    const lastResult = ref(null);
    const tmt = ref(null)

    return { permissions, allUsers, search, debounce, lastResult, tmt }
  },

  created() {
    // @ts-ignore
    this.allUsers = this.users.data;
  },

  methods: {
    async loadUsers() {
      // @ts-ignore
      let users = await this.$axios.get(this.users.next_page_url.replace('http', 'https'));
      this.allUsers = [
        // @ts-ignore
        ...this.allUsers,
        ...users.data.data
      ]
      this.users = users.data;
    },

    async onSearch(search: string) {
      // @ts-ignore
      if (!this.lastResult || Math.abs(Date.now() - this.lastResult) < 500) {
      // @ts-ignore
        this.lastResult = Date.now();
      // @ts-ignore
        clearTimeout(this.tmt);
      // @ts-ignore
        this.tmt = setTimeout(() => this.onSearch(search), 500);
        return;
      }
      // @ts-ignore
      let users = await this.$axios.get('/api/admin/user/list', {
        params: {
          search
        }
      });
      this.allUsers = users.data.data;
      this.users = users.data;
    }
  }
})
</script>
