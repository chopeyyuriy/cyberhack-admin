<template>
  <div class="page-profile-sidebar__avatars">
    <div class="page-profile-sidebar__avatars-title">{{ locale.profile.changeAvatar }}</div>
    <div class="page-profile-sidebar__avatars-avatar">
      <UserAvatar :src="avatar.image" />
    </div>
    <div class="page-profile-sidebar__avatars-label">Meta avatars</div>
    <div class="page-profile-sidebar__avatars-avatars__container">
      <div class="page-profile-sidebar__avatars-avatars">
        <div 
          v-for="(src, index) in avatars"
          :key="index"
          :style="{ backgroundImage: `url('${src.image}')` }"
          :class="{ active: selectedAvatar == src || selectedAvatar.image == src.image  }"
          @click="selectAvatar(src)"
          class="avatar"
        ></div>
      </div>
    </div>
    <div class="page-profile-sidebar__avatars-upload">
      <input @change="changeAvatar" type="file" accept="image/*">
      <ButtonLarge tag="button">
        <IconUpload />
        {{ locale.profile.uploadAvatar }}
      </ButtonLarge>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])
    const avatars = computed(() => store.getters['settings/avatars'])
    const locale = computed(() => store.getters['locale/locale'])

    const selectedAvatar = ref(avatars.value.find((avatar: any) => avatar.image == user.value.avatar) ?? { image: user.value.avatar })

    const selectAvatar = (avatar: any) => {
      selectedAvatar.value = avatar

      store.commit('settings/SET_REQUEST_DATA', {
        ...store.getters['settings/requestData'],
        avatar: null,
        avatar_url: avatar.image_store
      })
    }

    const changeAvatar = ({ target }: any) => {
      if (target.files && target.files.length > 0) {
        const file = target.files[0]
        store.commit('settings/SET_REQUEST_DATA', {
          ...store.getters['settings/requestData'],
          avatar_url: null,
          avatar: file
        })
        selectedAvatar.value = { image: URL.createObjectURL(file) };
      }
    }

    const avatar = computed(() => selectedAvatar.value ?? { image: user.value.avatar } )

    return { user, avatar, avatars, locale, selectedAvatar, selectAvatar, changeAvatar }
  },
})
</script>
