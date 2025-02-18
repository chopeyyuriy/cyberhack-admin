<template>
  <div class="page-ticket-chat" id="chat">
    <PageProductSliderModal 
      v-if="attachmentPreview.show" 
      :currentImage="attachmentPreview.image" 
      @close="attachmentPreview.show = false"
      @slide:prev="prevAttachment"
      @slide:next="nextAttachment"
    />

    <div class="page-ticket-chat__content" ref="content">
      <PageTicketChatMessage 
        v-for="message in messages"
        :key="message.id"
        :data="message"
        @image:click="selectImage"
      />
    </div>
    <div class="page-ticket-chat__input-container">
      <div v-if="!ticket.is_bot || ticket.status || fromAdmin" class="page-ticket-chat__input-content">
        <div class="page-ticket-chat__input" :class="{ 'page-ticket-chat__input_disabled': (!!ticket.status || ticket.is_bot) && !fromAdmin }">
          <textarea type="text" placeholder="Напишите нам о вашей проблеме..." v-model="message" :readonly="!!ticket.status" @keydown.enter.prevent.exact="sendMessage" @keyup.ctrl.enter="newLine" />
          <div class="page-ticket-chat__input__buttons">
            <button class="page-ticket-chat__input__attachment">
              <input type="file" ref="attachment" @change="onAttachmentChange">
              <IconAttachment />
            </button>
            <button @click="sendMessage">
              <IconSend />
            </button>
          </div>
        </div>
        <div v-if="attachments.length" class="page-ticket-chat__attachments">
          <div 
            class="page-ticket-chat__attachments__item"
            v-for="(item, index) in attachments"
            :key="`${index}_${item.loaded}_${item.total}`"
          >
            <div class="page-ticket-chat__attachments__item-content">
              <div 
                class="page-ticket-chat__attachments__item-icon"
                :style="{ backgroundImage: `url(${item.icon})` }"
              >
                <IconZIP v-if="!item.icon" />
              </div>
              <div class="page-ticket-chat__attachments__item-data">
                <p class="page-ticket-chat__attachments__item-name">{{ item.file.name }}</p>
                <p class="page-ticket-chat__attachments__item-size">{{ formatBytes(item.file.size) }}</p>
              </div>
            </div>
            <div class="page-ticket-chat__attachments__item-action">
              <div v-if="!item.isLoaded" class="page-ticket-chat__attachments__item-preloader">
                <Progressbar :value="item.loaded" :max="item.total" />
              </div>
              <div v-else class="page-ticket-chat__attachments__item-delete" @click="deleteAttachment(index)">
                <IconDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!ticket.status" class="page-ticket-chat__problems">
        <div class="page-ticket-chat__problems-container">
          <div 
            v-for="(problem, index) in allProblems"
            :key="index"
            class="page-ticket-chat__problems-item"
            @click="onProblem(problem)"
          >
            {{ problem[`name_${itemLang}`] }}
          </div>
        </div>
      </div>
      <Button 
        v-if="!(!ticket.is_bot || ticket.status) && !fromAdmin" 
        class="page-ticket-chat__to-admin" 
        tag="button"
        @click="gotoAdminChat"
      >
        {{ locale.ticket.toAdminChat }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore, ref, onMounted, useContext, nextTick } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    fromAdmin: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const store = useStore()
    const { $axios, $toast } = useContext() as any;

    const COUNTRIES = [
      {
        code: 'en|en',
        title: 'English',
      }
    ]

    const THANKS = {
      name_ru: 'Спасибо, помогло',
      name_en: "I didn't find my problem",
      action: '#NOT_FOUND'
    };

    const problems = ref([]);
    $axios.get('/api/bot/problems').then((response: any) => problems.value = response.data);

    const itemLang = computed(() => store.getters['locale/itemLang'])
    const locale = computed(() => store.getters['locale/locale'])

    const user = computed(() => store.getters['auth/user'])
    const messages = computed(() => store.getters['ticket/messages'])
    const ticket = computed(() => store.getters['ticket/ticket'])

    const attachment = ref({} as HTMLInputElement)
    const attachments = ref([] as any[])

    const errors = ref({} as any)

    const prevMessageTime = ref((new Date()).getTime())

    const OTHER_PROBLEMS = computed(() => {
      let result = [{
        name_ru: 'Я не нашел свою проблему',
        name_en: "I didn't find my problem",
        action: '#NOT_FOUND'
      }]
      if (messages.value.length > 1) {
        result.push({
          name_ru: 'Спасибо, помогло',
          name_en: 'Thanks, it helped',
          action: '#THANKS'
        });
      }
      if (props.fromAdmin) {
        result = [];
      }
      return result;
    })

    const allProblems = computed(() => [...problems.value, ...OTHER_PROBLEMS.value])

    const message = ref('')

    const deleteAttachment = (attachmentIndex: number) => {
      attachments.value = attachments.value.filter((_, index) => index !== attachmentIndex)
    }

    const attachmentPreview = ref({
      show: false,
      image: {
        image: null as any
      },
      images: [] as any
    })

    const getIconFromFile = (file: any) => {
      if (file.type.indexOf('image/') === 0) {
        return URL.createObjectURL(file)
      }
      return null;
    }

    const loadAttachment = async (file: any) => {
      if (attachments.value.length >= 5) {
        let errorText = 'Вы не можете загрузить более 5-ти файлов!';
        if (itemLang.value === 'en') errorText = 'You cannot upload more than 5 files!'
        $toast.error(errorText, {
          draggable: false
        })
        return;
      }

      let fileType = file.type && file.type.length > 0 ? file.type : 'file';

      let formData = new FormData()
      formData.append('file', file)
      formData.append('type', fileType)
      let attachmentDataIndex = attachments.value.push({
        file,
        icon: getIconFromFile(file),
        loaded: 0,
        total: 0,
        data: null,
        isLoaded: false
      }) - 1
      const response = await $axios.post('/api/user/file', formData, {
        onUploadProgress: (e: any) => {
          attachments.value[attachmentDataIndex] = {
            ...attachments.value[attachmentDataIndex],
            loaded: e.loaded,
            total: e.total
          }
          attachments.value = [...attachments.value];
        }
      })
      if (response.status === 200) {
        nextTick(() => {
          attachments.value[attachmentDataIndex] = {
            ...attachments.value[attachmentDataIndex],
            data: response.data,
            isLoaded: true
          }
          attachments.value = [...attachments.value];
        })
      } else {
        if (response.response.status === 413) {
          // @ts-ignore
          let errorText = 'Размер файла не должен превышать 2МБ';
          if (itemLang.value === 'en') errorText = 'The file size must not exceed 2MB'
          $toast.error(errorText, {
            draggable: false
          })
          deleteAttachment(attachmentDataIndex);
          return;
        }
        if (response.response.data && response.response.data.errors) {
          errors.value = response.response.data.errors

          for (const error of Object.keys(errors.value)) {
            // @ts-ignore
            let errorText = errors.value[error][0];
            if (itemLang.value === 'ru') errorText = locale.value.errors[errorText] ?? errors.value[error][0]
            $toast.error(errorText, {
              draggable: false
            })
          }

          deleteAttachment(attachmentDataIndex);
        }
      }
    }

    const onAttachmentChange = async (e: any) => {
      if (attachment.value.files?.length) {
        const file = attachment.value.files[0]
        loadAttachment(file);        
      }
    }

    onMounted(() => {
      window.addEventListener('paste', (e: any) => {
        if (e.clipboardData) {
          let clipboardData = e.clipboardData as DataTransfer;
          let items = clipboardData.items;
          if (items) {
            for (let i = 0; i < items.length; ++i) {
              let item = items[i];
              if (item.type.indexOf('image') > -1) {
                let file = item.getAsFile();
                if (file) {
                  loadAttachment(file);
                }
              }
            }
          }
        }
      })
    });

    return { COUNTRIES, itemLang, locale, messages, user, message, ticket, problems, OTHER_PROBLEMS, allProblems, attachment, attachments, deleteAttachment, attachmentPreview, onAttachmentChange, prevMessageTime }
  },

  methods: {
    formatBytes(bytes: number, decimals = 2) {
      if (!+bytes) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },

    scrollToBottom(behavior: ScrollBehavior = 'smooth') {
      let content = this.$refs.content as HTMLDivElement;
      content.scrollTo({
        top: content.scrollHeight,
        behavior
      })
    },

    sendMessage() {
      let currentTime = (new Date()).getTime();
      if (currentTime - this.prevMessageTime <= 1000) {
        let messageText = 'Пожалуйста, подождите 1 секунду!';
        if (this.itemLang === 'en') messageText = 'Please wait 1 second!';
        this.$toast.error(messageText, {
          draggable: false
        });
        this.prevMessageTime = currentTime;
        return;
      }

      this.prevMessageTime = currentTime;

      let attachments = this.attachments.filter((attachment: any) => !!attachment.data).map((attachment: any) => attachment.data);
      if ((this.message && this.message.trim().length > 0) || (attachments && attachments.length > 0)) {
        this.$emit('message:send', {
          ticketId: this.ticket.id,
          userId: this.user.id,
          text: this.message,
          attachments
        })

        this.attachments = [];

        this.message = '';
      }
    },

    onProblem(problem: any) {
      let currentTime = (new Date()).getTime();
      if (currentTime - this.prevMessageTime <= 1000) {
        let messageText = 'Пожалуйста, подождите 1 секунду!';
        if (this.itemLang === 'en') messageText = 'Please wait 1 second!';
        this.$toast.error(messageText, {
          draggable: false
        });
        this.prevMessageTime = currentTime;
        return;
      }

      this.prevMessageTime = currentTime;
      this.$emit('problem:click', problem)
    },

    gotoAdminChat() {
      this.onProblem({
        name_ru: 'Я не нашел свою проблему',
        name_en: "I didn't find my problem",
        action: '#NOT_FOUND'
      })
    },

    selectImage(url: string, images: any) {
      this.attachmentPreview = {
        show: true,
        image: {
          image: url
        },
        images: images.map((image: any) => image.file.url)
      }
    },

    prevAttachment() {
      let currentIndex = this.attachmentPreview.images.indexOf(this.attachmentPreview.image.image);
      if (currentIndex - 1 >= 0) currentIndex--;
      // @ts-ignore
      else currentIndex = this.attachmentPreview.images.length - 1

      this.attachmentPreview.image.image = this.attachmentPreview.images[currentIndex]
    },

    nextAttachment() {
      let currentIndex = this.attachmentPreview.images.indexOf(this.attachmentPreview.image.image);
      if (currentIndex + 1 < this.attachmentPreview.images.length) currentIndex++;
      // @ts-ignore
      else currentIndex = 0

      this.attachmentPreview.image.image = this.attachmentPreview.images[currentIndex]
    },

    newLine(e: any) {
      this.message += '\n';
      this.$nextTick(() => {
        e.target.blur();
        e.target.focus();
      })
    }
  },

  async mounted() {
    this.scrollToBottom('auto');
  }
})
</script>
