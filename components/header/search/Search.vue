<template>
  <div class="header-search__container">
    <div class="header-search__overlay" @click="close"></div>
    <div class="header-search">
      <div class="container">
        <transition name="fade-in-down">
          <div v-if="animationState" class="header-search__title">
            <p>Crooked Search</p>
            <img src="/images/underline.svg" @dragstart="$event.preventDefault()" />
          </div>
        </transition>
        <div class="header-search__searchbar">
          <transition name="searchbar">
            <Input v-if="animationState > 1" placeholder="Search Game" v-model="search">
              <template #icon>
                <IconSearch />
              </template>
            </Input>
          </transition>
        </div>
        <transition name="fade">
          <div v-if="results && search.length && animationState > 2" class="header-search__results-container">
            <p class="header-search__results-label">{{ locale.search.results }}</p>
            <div v-if="results.length" class="header-search__results">
              <GameItem 
                v-for="(item, index) in results"
                :key="index"
                :data="item"
              />
            </div>
            <Empty
              v-else
              :title="locale.search.empty.title"
              :text="locale.search.empty.text"
            >
              <template #icon>
                <IconReceipt />
              </template>
            </Empty>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useStore, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const store = useStore()

    const search = ref('')
    const animationState = ref(0)

    const locale = computed(() => store.getters['locale/locale'])

    const results = computed(() => store.getters['game/search'])

    watch(search, (value) => {
      setTimeout(async () => {
        if (value == search.value) {
          await store.dispatch('game/search', value)
        }
      }, 500)
    })

    onMounted(() => {
      animationState.value = 1
      setTimeout(() => {
        animationState.value = 2
        setTimeout(() => animationState.value = 3, 250)
      }, 250)
    })

    const close = () => {
      animationState.value = 2
      setTimeout(() => {
        animationState.value = 1
        setTimeout(() => {
          animationState.value = 0
          setTimeout(() => emit('close'), 250)
        }, 500)
      }, search.value.length ? 250 : 0)
    }

    return { results, search, animationState, locale, close }
  },
})
</script>
