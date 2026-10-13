<script setup ts>
import PaywallHeader from '../components/PaywallHeader.vue'
import PaywallPromoHeader from '../components/PaywallPromoHeader.vue'
import PaywallActionsFooter from '../components/PaywallActionsFooter.vue'
import PaywallRestoreModal from '../components/PaywallRestoreModal.vue'
import PaywallSuccessModal from '../components/PaywallSuccessModal.vue'
import { usePaywall } from '../composables/usePaywall'

const {
  offers,
  selectedOfferId,
  isLoading,
  isFetching,
  errorMessage,
  isModalOpen,
  isConfirmModalOpen,
  purchaseDetails,
  foundSubscription,
  handlePurchase,
  checkRestore,
  cancelRestore,
  executeRestore,
  closeModal
} = usePaywall()
</script>

<template>
  <div class="relative w-full max-w-md mx-auto min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden font-sans">
    
    <!-- Верхняя панель / Хедер -->
    <PaywallPromoHeader />

    <!-- Основной контент (Заголовок и список офферов) -->
    <div class="flex-1 flex flex-col justify-center space-y-6 my-auto">
      <PaywallHeader />

      <!-- Состояние загрузки тарифов -->
      <div v-if="isFetching" class="text-center py-8 text-sm text-slate-500 animate-pulse">
        Загрузка лучших предложений...
      </div>

      <!-- Список офферов (Тарифов) -->
      <div v-else class="space-y-3">
        <div 
          v-for="offer in offers" 
          :key="offer.id"
          @click="selectedOfferId = offer.id"
          class="relative p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between"
          :class="[
            selectedOfferId === offer.id 
              ? 'bg-gradient-to-r from-purple-900/40 to-slate-900 border-purple-500 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500' 
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          ]"
        >
          <!-- Бейдж (если есть) -->
          <div v-if="offer.badge" class="absolute -top-2.5 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
            {{ offer.badge }}
          </div>

          <div class="space-y-0.5">
            <div class="font-bold text-sm text-white pt-1">{{ offer.title }}</div>
            <div class="text-xs text-slate-400">{{ offer.savings || offer.period }}</div>
          </div>

          <div class="text-right">
            <div class="font-extrabold text-base text-emerald-400">{{ offer.price }}</div>
            <div class="text-[10px] text-slate-500">за {{ offer.period }}</div>
          </div>
        </div>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="text-xs text-rose-400 text-center bg-rose-500/10 border border-rose-500/20 py-2 rounded-xl">
        {{ errorMessage }}
      </div>
    </div>

    <!-- Нижняя часть: Кнопки покупки и восстановления -->
    <PaywallActionsFooter :is-loading="isLoading" :is-fetching="isFetching" @purchase="handlePurchase" @restore="checkRestore" />

    <!-- МОДАЛКА 1: Предпросмотр найденной подписки ДО восстановления -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
     <PaywallRestoreModal 
        v-if="isConfirmModalOpen && foundSubscription" 
        :found-subscription="foundSubscription"
        @cancel-restore="cancelRestore"
        @execute-restore="executeRestore"
      />
    </Transition>

    <!-- МОДАЛКА 2: Финальный экран успешного применения -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PaywallSuccessModal 
        v-if="isModalOpen && purchaseDetails" 
        :purchase-details="purchaseDetails"
        @close="closeModal"
      />
    </Transition>

  </div>
</template>