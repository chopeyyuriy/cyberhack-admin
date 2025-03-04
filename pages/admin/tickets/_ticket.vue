<template>
  <div class="admin-games-create">
    <div class="admin-form">
      <div class="admin-form__errors">
        <p v-for="(error, index) in errors" :key="index">
          <span
            v-for="(errorItem, errorItemIndex) in error"
            :key="errorItemIndex"
          >
            {{ errorItem }}
          </span>
        </p>
      </div>
      <div class="ticket">
        <div class="ticket-header">
          <div class="ticket-header-info">
            <a href="/admin/tickets">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#95979F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </a>
            <h3 class="admin-form__label">
              <b>Тикет №{{ ticket?.id }} </b>- {{ ticket?.theme?.name_ru }}
            </h3>
          </div>
          <div class="ticket-controls">
            <div
              :class="
                'ticket-status' +
                `${ticket?.status === 2 ? ' ticket-status_solved' : ''}`
              "
            >
              {{ statuses[ticket?.status] }}
            </div>
            <Button
              tag="button"
              :class="
                'small ' + (ticket?.status === 2 ? ' btn_dark' : ' btn_light')
              "
              @click="toggleStatus"
            >
              {{ ticket?.status === 2 ? 'Тикет закрыт' : 'Закрыть тикет' }}
            </Button>
          </div>
        </div>
        <div
          :class="`ticket-chat ${
            attachments?.length > 0 && 'ticket-chat-with-files'
          }`"
          ref="chatContainer"
        >
          <div
            :class="
              'ticket-chat-message-wrapper' +
              (msg.from_user_id === 1 ? ' mine' : '')
            "
            v-for="(msg, index) in messages"
            :key="index"
          >
            <div class="ticket-chat-message-user" v-if="msg.from_user_id !== 1">
              {{ msg.from_user.name }}
            </div>
            <div class="ticket-chat-message">
              {{ msg.text }}
            </div>
            <div class="ticket-chat-message files" v-if="msg.files?.length > 0">
              <div
                class="ticket-chat-message-file"
                v-for="file in msg.files"
                :key="file.id"
              >
                <img :src="file.url" alt="" srcset="" />
                <div class="ticket-chat-message-file-name">
                  {{ file.name }}
                </div>
                <!-- <div class="ticket-chat-message-file-size">71,1 КБ</div> -->
              </div>
            </div>
            <div class="ticket-chat-message-date">19.02.2025</div>
          </div>
        </div>
        <div class="page-ticket-chat__input-container">
          <div class="page-ticket-chat__input-content">
            <div class="page-ticket-chat__input">
              <textarea
                v-model="message"
                type="text"
                placeholder="Напишите нам о вашей проблеме..."
              ></textarea>
              <div class="page-ticket-chat__input__buttons">
                <button class="page-ticket-chat__input__attachment">
                  <input
                    type="file"
                    ref="attachment"
                    @input="addFile"
                    value=""
                  />
                  <IconAttachment />
                </button>
                <button @click="sendMessage">
                  <IconSend />
                </button>
              </div>
            </div>
            <div
              v-if="attachments.length"
              class="page-ticket-chat__attachments"
            >
              <div
                class="page-ticket-chat__attachments__item"
                v-for="(item, index) in attachments"
                :key="index"
              >
                <div class="page-ticket-chat__attachments__item-content">
                  <div
                    class="page-ticket-chat__attachments__item-icon"
                    :style="{ backgroundImage: `url(${item?.preview})` }"
                  >
                    <IconZIP v-if="!item.preview" />
                  </div>
                  <div class="page-ticket-chat__attachments__item-data">
                    <p class="page-ticket-chat__attachments__item-name">
                      {{ item.file.name }}
                    </p>
                    <p class="page-ticket-chat__attachments__item-size">
                      <!-- {{ formatBytes(item.file.size) }} -->
                    </p>
                  </div>
                </div>
                <div class="page-ticket-chat__attachments__item-action">
                  <div class="page-ticket-chat__attachments__item-delete">
                    <IconDelete />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRoute,
  useStore,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'

import Button from '~/components/button/Button.vue'
export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  setup() {
    const { $axios } = useContext()
    const store = useStore()
    const route = useRoute()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Тикеты',
        link: '/admin/tickets',
      },
      {
        label: 'Тикет',
        link: '/admin/tickets',
      },
    ])

    const permissionOptions = [
      {
        label: 'Пользователь',
        value: 0,
      },
      {
        label: 'Модератор',
        value: 1,
      },
      {
        label: 'Администратор',
        value: 2,
      },
    ]

    const isLoading = ref(false)
    const message = ref('')
    const errors = ref([])
    const ticket = ref({} as any)
    const messages = ref([] as any)
    const attachments = ref([] as any)
    const chatContainer = ref<HTMLElement | null>(null)

    const statuses = ['Открыт', 'В процессе', 'Закрытый']

    const fetchTicket = async () => {
      const resp = await $axios.get(
        `/api/admin/ticket/${route.value.params.ticket}`
      )
      ticket.value = resp.data
    }
    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    }

    const fetchMessages = async () => {
      const resp = await $axios.get(
        `/api/admin/ticket/messages/${route.value.params.ticket}`
      )
      messages.value = resp.data
      setTimeout(scrollToBottom, 400)
    }

    onMounted(fetchTicket)
    onMounted(fetchMessages)

    const sendMessage = async () => {
      if (message.value?.length > 0 && !isLoading.value) {
        isLoading.value = true
        const data = new FormData()

        data.append('ticket_id', route.value.params.ticket)
        data.append('text', message.value)

        attachments.value.forEach(({ file }: any, i: number) =>
          data.append(`image[${i}]`, file)
        )

        await $axios.post('/api/admin/ticket/send-message', data, {})
        isLoading.value = false
        message.value = ''
        attachments.value = []
        fetchMessages()
      }
    }

    return {
      isLoading,
      errors,
      permissionOptions,
      ticket,
      statuses,
      message,
      sendMessage,
      messages,
      attachments,
      chatContainer,
    }
  },
  methods: {
    async toggleStatus() {
      const status = this.ticket.status === 2 ? 0 : 2
      await this.$axios.post('/api/admin/ticket/update-status', null, {
        params: {
          id: this.ticket.id,
          status,
        },
      })
      this.ticket = {
        ...this.ticket,
        status,
      }
    },
    addFile(e: any) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result // буде щось типу "data:image/jpeg;base64,..."
          this.attachments = [
            ...this.attachments,
            { file, preview: base64String?.toString() ?? '' },
          ]
        }
        reader.readAsDataURL(file)
      }
    },
  },
})
</script>
