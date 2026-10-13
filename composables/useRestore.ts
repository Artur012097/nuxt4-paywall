// composables/useRestore.ts
import { ref } from 'vue'
import type { Offer, PurchaseDetails } from './usePaywall'

export const useRestore = (offersRef: Ref<Offer[]>, onRestored: (details: PurchaseDetails) => void) => {
  const isConfirmModalOpen = ref(false)
  const foundSubscription = ref<PurchaseDetails | null>(null)
  const restoreError = ref('')

  // Шаг 1: Запрос в БД для предпросмотра
  const checkRestore = async () => {
    restoreError.value = ''
    const deviceId = localStorage.getItem('device_id')
    if (!deviceId) {
      restoreError.value = 'Устройство не идентифицировано.'
      return
    }

    try {
      const res = await $fetch<{ success: boolean; data?: any; message?: string }>('/api/restore', {
        method: 'POST',
        body: { deviceId }
      })

      if (res?.success && res.data) {
        const matchedOffer = offersRef.value.find(o => o.id === res.data.offerId) || {
          id: res.data.offerId,
          title: 'Премиум подписка',
          price: 'Оплачено',
          period: 'активно'
        }

        foundSubscription.value = {
          offer: matchedOffer,
          orderId: res.data.id,
          deviceId,
          createdAt: res.data.createdAt,
          isRestored: true
        }
        isConfirmModalOpen.value = true
      } else {
        restoreError.value = res?.message || 'Активных подписок для восстановления не найдено.'
      }
    } catch (e: any) {
      restoreError.value = e?.data?.statusMessage || 'Не удалось проверить покупки.'
    }
  }

  // Отмена
  const cancelRestore = () => {
    isConfirmModalOpen.value = false
    foundSubscription.value = null
  }

  // Шаг 2: Подтверждение и применение
  const executeRestore = () => {
    if (!foundSubscription.value) return
    onRestored(foundSubscription.value) // Передаем данные наверх в пейволл
    isConfirmModalOpen.value = false
    foundSubscription.value = null
  }

  return {
    isConfirmModalOpen,
    foundSubscription,
    restoreError,
    checkRestore,
    cancelRestore,
    executeRestore
  }
}