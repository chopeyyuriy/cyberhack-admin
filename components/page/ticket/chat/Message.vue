<template>
  <div 
    class="page-ticket-chat-message"
    :class="{ 'page-ticket-chat-message_myself': user.id === data.from.id }"
  >
    <div class="page-ticket-chat-message__container">
      <div class="page-ticket-chat-message__avatar">
        <UserAvatar :src="data.from.avatar" />
      </div>
      <div class="page-ticket-chat-message__content">
        <div v-if="data.text && data.text.length > 0" class="page-ticket-chat-message__text-container">
          <div class="page-ticket-chat-message__text">
            <p v-html="formatedText" />
            <div v-if="links.length" class="page-ticket-chat-message__links">
              <div class="page-ticket-chat-message__links-item__container" v-for="(link, index) in links" :key="index">
                <a :href="link.link" target="_blank" class="page-ticket-chat-message__links-item">
                  {{ link[`name_${itemLang}`] }}
                  <IconLink />
                </a>
              </div>
            </div>
          </div>
          <div class="page-ticket-chat-message__translate" @click="translate">
            <IconTranslate v-if="!translated"/>
            <IconBack v-else />
          </div>
        </div>
        <div v-if="data.attachments" class="page-ticket-chat-message__attachments">
          <div v-if="images && images.length > 0" class="page-ticket-chat-message__attachments-images">
            <div 
              v-for="(image, index) in images" 
              :key="index"
              class="page-ticket-chat-message__attachments-image"
              :style="{ backgroundImage: `url(${image.file.url})` }"
              @click="$emit('image:click', image.file.url, images)"
            >
              <div class="page-ticket-chat-message__attachments-image__icon">
                <IconSearchPlus />
              </div>
            </div>
          </div>
          <div v-if="files && files.length > 0" class="page-ticket-chat-message__attachments-files">
            <div 
              v-for="(file, index) in files" 
              :key="index"
              class="page-ticket-chat-message__attachments-file"
            >
              <div class="page-ticket-chat-message__attachments-file__content">
                <div class="page-ticket-chat-message__attachments-file__icon">
                  <IconZIP />
                </div>
                <div class="page-ticket-chat-message__attachments-file__data">
                  <div class="page-ticket-chat-message__attachments-file__name">{{ file.file.name }}</div>
                  <div class="page-ticket-chat-message__attachments-file__size">{{ formatBytes(file.file.size) }}</div>
                </div>
              </div>
              <a 
                :href="file.file.url.replace('http', 'https')"
                target="_blank"
                download
                class="page-ticket-chat-message__attachments-file__action"
              >
                <IconDownload />
              </a>
            </div>
          </div>
        </div>
        <div class="page-ticket-chat-message__time">
          {{ getTime(new Date(data.created_at)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import Config from '@/nuxt.config';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const itemLang = computed(() => store.getters['locale/itemLang'])
    const user = computed(() => store.getters['auth/user'])

    const getTime = (time: Date) => {
      // let tempDt = new Date();
      // console.log(tempDt.getTimezoneOffset())
      // let currentDt = new Date(tempDt.getTime() - (tempDt.getTimezoneOffset() * 1000));

      // let deltaTime = (currentDt.getTime() - time.getTime()) / 1000;
      // console.log(currentDt, time)
      // if (deltaTime < 60) return 'Только что';
      // else if (deltaTime >= 60 && deltaTime < 60 * 60) return Math.floor(deltaTime / 60) + ' мин. назад';
      return time.toLocaleTimeString([], { timeStyle: 'short' }) + ' ' + time.toLocaleDateString();
    }

    const params = computed(() => props.data.params || null);
    const links = computed(() => params.value?.links || []);
    const images = computed(() => {
      return props.data.attachments?.filter((attachment: any) => attachment.file.type.indexOf('image/') === 0)
    })
    const files = computed(() => {
      return props.data.attachments?.filter((attachment: any) => attachment.file.type === 'file')
    })

    const translated = ref<string | null>(null);

    return { itemLang, getTime, user, params, links, images, files, translated }
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

    async translate() {
      if (this.translated) return this.translated = null;

      const result = await this.$axios.post(Config.translator.baseUrl + '/translate', {
        text: this.data.text,
        to: this.itemLang
      });
      if (result.status === 200) {
        const translates = result.data[0].filter((item: any) => item[0] !== null).map((item: any) => item[0]);
        const text = translates.join('');
        this.translated = text;
      }
    }
  },

  computed: {
    formatedText() {
      const text = this.translated ?? this.data.text;
      const words = text.split(' ');
      const formatedWords: string[] = [];
      for (let word of words) {
        const matches = word.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
        if (matches) {
          word = word.replace('http://', '');
          word = word.replace('https://', '');
          for (let match of matches) {
            word = word.replace(match, `<a href="https://${match}" target="_blank">${match}</a>`)
          }
          formatedWords.push(word);
        } else {
          formatedWords.push(word);
        }
      }
      return formatedWords.join(' ');
    }
  }
})
</script>
