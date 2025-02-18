<template>
  <div class="admin-promos">
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Продукт</TableCol>
        <TableCol>Оценка</TableCol>
        <TableCol>Отзыв</TableCol>
        <TableCol>Cтатус</TableCol>
        <TableCol></TableCol>
      </template>
      <template #content>
        <TableRow v-for="(review, index) in allReviews" :key="index">
          <TableCol> #{{ review.id }} </TableCol>
          <TableCol>
            <a
              :href="'/admin/products/' + review.product?.id"
              style="color: #20ada3; text-decoration: none"
            >
              {{ review?.product?.name_ru }}
            </a>
          </TableCol>
          <TableCol>
            {{ variants?.[review.variant] }}
          </TableCol>
          <TableCol>
            <div style="max-height: 200px; overflow: auto" class="scrollbar">
              {{ review.text }}
            </div>
          </TableCol>
          <TableCol>
            <button
              :class="'btn small' + (review.status === 0 ? ' btn_light' : '')"
              style="width: 140px"
              @click.prevent="
                publishReview(review.id, review.status === 0 ? 1 : 0)
              "
            >
              {{ statuses?.[review.status] }}
            </button></TableCol
          >
          <TableCol>
            <button
              theme="dark"
              class="btn btn_dark small"
              style="width: 140px"
              @click.prevent="deleteReview(review.id)"
            >
              Удалить
            </button>
          </TableCol>
        </TableRow>
      </template>
    </Table>
    <div class="admin-reviews__pagination">
      <Button
        v-if="reviews.next_page_url"
        tag="button"
        @click="loadreviews"
        theme="dark"
        >Загрузить еще</Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'

function debounce<T extends (...args: any[]) => any>(
  callback: T,
  timeoutMs: number
): (...args: Parameters<T>) => void {
  return function perform(this: any, ...args: Parameters<T>) {
    let previousCall = this.lastCall as number | undefined

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer as NodeJS.Timeout)
    }

    this.lastCallTimer = setTimeout(
      () => callback(...args),
      timeoutMs
    ) as unknown as NodeJS.Timeout
  }
}

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async asyncData({ $axios }) {
    const reviews = (await $axios.get('/api/get/reviews?perPage=15&page=1'))
      .data?.reviews

    return {
      reviews,
    }
  },

  setup() {
    const store = useStore()
    const { $toast } = useContext() as any

    const search = ref('')

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Отзывы',
        link: '/admin/reviews',
      },
    ])

    const allReviews = ref([] as any)
    const variants = {
      '0': 'Хороший продукт',
      '1': 'Хорошая цена',
      '2': 'Рекомендую продукт',
      '3': 'Хороший функционал',
      '4': 'Не понравился',
      '5': 'Не рекомендую',
      '6': 'Плохой функционал',
      '7': 'Получил бан',
    }
    const statuses = ['Опубликован', 'На модерации']
    const lastResult = ref(null)
    const tmt = ref(null)

    return {
      permissions,
      allReviews,
      search,
      debounce,
      lastResult,
      tmt,
      variants,
      statuses,
    }
  },

  created() {
    // @ts-ignore
    this.allReviews = this.reviews.data
  },

  methods: {
    async loadreviews() {
      // @ts-ignore
      let reviews = await this.$axios.get(
        this.reviews.next_page_url.replace('http', 'https')
      )
      this.allReviews = [
        // @ts-ignore
        ...this.allReviews,
        ...reviews.data.reviews?.data,
      ]
      this.reviews = reviews.data
    },
    toggleReviewStatus(id: number) {
      this.allReviews = this.allReviews.map((r: any) =>
        r.id === id ? { ...r, status: r.status === 0 ? 1 : 0 } : r
      )
    },
    removeReview(id: number) {
      this.allReviews = this.allReviews.filter((r: any) => r.id !== id)
    },
    async deleteReview(id: number) {
      const response = await this.$axios.delete(`/api/delete/review?id=${id}`)

      if (response.status === 200) {
        this.$toast.success('Отзыв удалено', {
          draggable: false,
        })
        this.removeReview(id)
      } else {
        this.$toast.error('Ошибка удаления отзыва', {
          draggable: false,
        })
      }
    },
    async publishReview(id: number, status: number) {
      const response = await this.$axios.post(
        `/api/update/status/review?id=${id}&status=${status}`
      )
      if (response.status === 200) {
        this.$toast.success('Статус отзыва успешно сохранено', {
          draggable: false,
        })
        this.toggleReviewStatus(id)
      } else {
        this.$toast.error('Ошибка', {
          draggable: false,
        })
      }
    },
  },
})
</script>
