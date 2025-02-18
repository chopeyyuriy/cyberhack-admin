<template>
  <div class="page-product-payment-modal__container">
    <div class="page-product-payment-modal__overlay" @click="close"></div>
    <div class="page-product-payment-modal">
      <div class="page-product-payment-modal__content">
        <div class="page-product-payment-modal__title">
          <p>{{ data.product.game[`name_${itemLang}`] }} - {{ data.product[`name_${itemLang}`] }} - {{ data.rate.period }} days</p>
          <h3>{{ locale.product.payment }}</h3>
          <img @dragstart="$event.preventDefault()" src="/images/underline.svg" alt="">

          <button class="page-product-payment-modal__title-close" @click="close"><IconClose /></button>
        </div>
        <div v-if="currentSystem && currentSystem.hint" class="page-product-payment-modal__hint">
          <IconHint />
          <p>{{ locale.product.emailHint }}</p>
        </div>
        <div v-if="currentSystem && currentSystem.canEnterEmail" class="page-product-payment-modal__pcode">
          <Input :placeholder="locale.signin.email" v-model="email" :errors="errors" name="email">
            <template #icon>
              <IconSMS />
            </template>
          </Input>
        </div>
        <div v-if="currentSystem && currentSystem.canEnterPromo" class="page-product-payment-modal__pcode">
          <div class="page-product-payment-modal__pcode-input" :style="currentSystem.name === 'digiseller' ? 'grid-template-columns: 1fr' : ''">
            <Input :placeholder="locale.product.promo" v-model="promoCode" :errors="errors" name="promo_code">
              <template #icon>
                <IconPromo />
              </template>
            </Input>
            <Button v-if="(!isLoading && currentSystem.name !== 'digiseller')" style="width: 100%;" tag="button" @click="checkPromo">{{ locale.apply }}</Button>
          </div>

          <p v-if="promoCodeData">{{ locale.sale }}: <span>{{ promoCodeData.sale }}%</span></p>
        </div>
        <div class="page-product-payment-modal__price">
          <p class="label">{{ locale.product.toPay }}:</p>
          <div class="price">
            <p v-if="data.rate && data.rate.sale" class="price-old">
              {{ data.rate.currency }}{{ data.rate.cost * count }}
            </p>
            <p v-html="cost" />
          </div>
        </div>
        <div class="page-product-payment-modal__payment">
          <div class="counter">
            <button @click="plusCount">
              <IconPlus />
            </button>
            <div class="counter__number">
              {{ count }}
            </div>
            <button @click="minusCount">
              <IconMinus />
            </button>
          </div>
          <div class="wm-form">
            <form method="POST" ref="wmFormRef" action="https://merchant.webmoney.ru/lmi/payment_utf.asp" target="_blank" accept-charset="utf-8">  
              <input 
                v-for="(key, index) in Object.keys(wmForm)"
                :key="index"
                type="hidden" 
                :name="key" 
                :value="wmForm[key]"
              >
            </form>
          </div>
          <ButtonLarge v-if="!isLoading" @click="buy" tag="button">{{ locale.product.pay }}</ButtonLarge>
        </div>
      </div>

      <div class="page-product-payment-modal__systems">
        <p class="page-product-payment-modal__systems-title">{{ locale.product.paymentSystems }}:</p>
        <div class="page-product-payment-modal__systems-cards">
          <div 
            v-for="system in paymentsSystems.filter((system) => !!data.rate[`is_${system.name}_available`])"
            :key="system.name"
            class="page-product-payment-modal__systems-card"
            @click="currentSystemIndex = paymentsSystems.findIndex((item) => item.name === system.name)"
            :class="{ active: currentSystem.name == system.name }"
          >
            <component :is="`IconPayment${system.icon}`" />
          </div>
        </div>
        <p class="page-product-payment-modal__systems-hint" v-html="locale.product.paymentsHint"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useContext, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { $axios, $toast } = useContext() as any;

    const store = useStore()

    const count = ref(1)
    const email = ref('')
    const promoCode = ref('')
    const promoCodeData = ref(null as any)

    const locale = computed(() => store.getters['locale/locale'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    const product = computed(() => store.getters['game/product'])

    const wmForm = ref({} as any);
    const wmFormRef = ref<HTMLDivElement | null>(null)

    const isLoading = ref(false);
    const errors = ref({})

    const plusCount = () => {
      count.value++
    }

    const minusCount = () => {
      if (count.value - 1 > 0)
        count.value--
    }

    const paymentsSystems = [
      {
        name: 'webmoney',
        icon: 'Webmoney',
        hint: true,
        canEnterEmail: true,
        canEnterPromo: true
      },
      {
        name: 'freekassa',
        icon: 'Freekassa',
        hint: true,
        canEnterEmail: true,
        canEnterPromo: true
      },
      {
        name: 'digiseller',
        icon: 'Digiseller',
        canEnterPromo: true
      }
    ]
    
    let availableSystemIndex = paymentsSystems.findIndex((system) => !!props.data.rate[`is_${system.name}_available`])
    const currentSystemIndex = ref(availableSystemIndex > -1 ? availableSystemIndex : 0)
    const currentSystem = computed(() => paymentsSystems[currentSystemIndex.value] || null)

    const close = () => {
      store.commit('modal/CLOSE', 'payment')
    }

    const cost = computed(() => {
      if (!props.data.rate) return ''

      let value = props.data.rate.currency
      let promoSale = 1
      if (promoCodeData.value) {
        promoSale = (1 - (promoCodeData.value.sale / 100))
      }
      const fixedValue = (props.data.rate.cost * (1 - props.data.rate.sale / 100) * count.value * promoSale).toFixed(2).toString().split('.')

      value += `${fixedValue[0]}<span>.${fixedValue[1]}</span>`

      return value
    })

    const checkPromo = async () => {
      errors.value = [];
      promoCodeData.value = null;

      isLoading.value = true

      const response = await $axios.post('/api/promo/check?p=' + promoCode.value, {
        product_id: product.value.id
      }) as any;
      if (response.status == 200) {
        promoCodeData.value = response.data
      } else {
        if (response.response && response.response?.data?.errors) {
          errors.value = response.response.data.errors

          for (const error of Object.keys(errors.value)) {
            // @ts-ignore
            let errorText = errors.value[error][0];
            if (itemLang.value === 'ru') errorText = locale.value.errors[errorText]
            $toast.error(errorText, {
              draggable: false
            })
          }
        }
      }

      isLoading.value = false
    }

    const buy = async () => {
      errors.value = [];
      
      if (currentSystem.value.name == 'digiseller') {
        let digiUrl = new URL(props.data.rate.url);
        digiUrl.searchParams.set('item_cnt', count.value.toString());
        digiUrl.searchParams.set('promocode', promoCode.value);
        window.open(digiUrl.toString(), '_blank');
        close()
      } else {
        isLoading.value = true

        let payload = '';
        if (promoCode.value.length) payload = '&p=' + promoCode.value

        const response = await $axios.post(`/api/payment/url/${props.data.rate.id}/${currentSystem.value.name}?lang=${itemLang.value}${payload}`, {
          count: count.value,
          email: email.value
        }) as any
        if (response.status == 200) {
          if (currentSystem.value.name === 'webmoney') {
            wmForm.value = response.data;

            nextTick(() => {
              // @ts-ignore
              wmFormRef.value.submit();
            })
          } else {
            if (response.data.url) {
              window.open(response.data.url, '_blank')
              close()
            }
          }
        } else {
          if (response.response && response.response?.data?.errors) {
            errors.value = response.response.data.errors;

            for (const error of Object.keys(errors.value)) {
              // @ts-ignore
              let errorText = errors.value[error][0];
              if (itemLang.value === 'ru') {
                errorText = locale.value.errors[errorText] ?? errorText
                if (errorText.indexOf('The number of keys must not exceed') === 0) {
                  errorText = errorText.replace('The number of keys must not exceed', 'Количество ключей не должно превышать')
                }
              }
              $toast.error(errorText, {
                draggable: false
              })
            }
          }
        }

        isLoading.value = false
      }
    }

    return { count, wmFormRef, email, plusCount, minusCount, isLoading, paymentsSystems, currentSystemIndex, currentSystem, locale, buy, close, checkPromo, promoCodeData, cost, itemLang, errors, promoCode, wmForm }
  }
})
</script>

<style lang="scss">
#wm-widget .button_pay {
  background: #76DBA1;
  border-radius: 12px;
  text-decoration: none;
  width: 100%;
  height: 68px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #111317;
  transition: .25s;
  cursor: pointer;
  padding: 0 50px;
  user-select: none;

  &:hover {
    background: #20ADA3;
  }

  &::before {
    display: none;
  }

  &-content {
    margin: 0;
    padding: 0;
  }
}
</style>