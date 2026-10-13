import { ref, onMounted, computed } from 'vue'
import { useRestore } from './useRestore'

export interface Offer {
  id: string
  title: string
  price: string
  period: string
  badge?: string
  savings?: string
}

export interface PurchaseDetails {
  offer: Offer
  orderId?: number
  deviceId: string
  createdAt: string
  isRestored?: boolean
}

export const usePaywall = () => {
  const offers = ref<Offer[]>([])
  const selectedOfferId = ref<string>('yearly_best')
  const isLoading = ref(false)
  const isFetching = ref(true)
  const errorMessage = ref('')

  const isModalOpen = ref(false)
  const purchaseDetails = ref<PurchaseDetails | null>(null)

  const selectedOffer = computed(() => {
    return offers.value.find(o => o.id === selectedOfferId.value) || offers.value[0]
  })

  // Подключаем модуль восстановления, прокидывая список офферов и колбэк успеха
  const {
    isConfirmModalOpen,
    foundSubscription,
    restoreError,
    checkRestore,
    cancelRestore,
    executeRestore
  } = useRestore(offers, (details) => {
    purchaseDetails.value = details
    isModalOpen.value = true
  })

  const fetchOffers = async () => {
    isFetching.value = true
    try {
      const res = await $fetch<{ offers: Offer[] }>('/api/offers')
      if (res?.offers?.length) {
        offers.value = res.offers
      }
    } catch (e) {
      offers.value = [
        { id: 'weekly_trial', title: 'Недельный доступ', price: '199 ₽', period: 'неделю', badge: '3 дня бесплатно' },
        { id: 'yearly_best', title: 'Годовой доступ', price: '1 490 ₽', period: 'год', badge: 'Хит продаж!' }
      ]
    } finally {
      isFetching.value = false
    }
  }

  const handlePurchase = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      let deviceId = localStorage.getItem('device_id')
      if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substring(2, 9)
        localStorage.setItem('device_id', deviceId)
      }

      const res = await $fetch<{ success: boolean; data?: any }>('/api/purchase', {
        method: 'POST',
        body: { offerId: selectedOfferId.value, deviceId }
      })

      if (res?.success && selectedOffer.value) {
        purchaseDetails.value = {
          offer: selectedOffer.value,
          orderId: res.data?.id,
          deviceId,
          createdAt: res.data?.createdAt || new Date().toISOString(),
          isRestored: false
        }
        isModalOpen.value = true
      }
    } catch (e) {
      errorMessage.value = 'Не удалось провести оплату. Попробуйте ещё раз.'
    } finally {
      isLoading.value = false
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  onMounted(() => {
    fetchOffers()
  })

  return {
    offers,
    selectedOfferId,
    selectedOffer,
    isLoading,
    isFetching,
    errorMessage: computed(() => errorMessage.value || restoreError.value),
    isModalOpen,
    isConfirmModalOpen,
    purchaseDetails,
    foundSubscription,
    handlePurchase,
    checkRestore,
    cancelRestore,
    executeRestore,
    closeModal
  }
}