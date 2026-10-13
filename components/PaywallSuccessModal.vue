<script setup lang="ts">
const { isModalOpen, purchaseDetails } = defineProps<{
  isModalOpen: boolean
  purchaseDetails: {
	 offer: {
		title: string
		price: string
		period: string
	 }
	 orderId?: string
	 deviceId: string
	 isRestored: boolean
  } | null
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
	<div 
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      >
        <div class="w-full max-w-xs bg-slate-900 border border-purple-500/30 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
          
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div class="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-emerald-400 text-2xl font-bold">
              ✓
            </div>
          </div>

          <h3 class="text-xl font-extrabold text-white tracking-tight mb-1">
            {{ purchaseDetails?.isRestored ? 'Подписка восстановлена!' : 'Ура! Покупка успешна' }}
          </h3>
          <p class="text-xs text-slate-400 mb-5">
            Все миры и персонажи разблокированы.
          </p>

          <div class="bg-slate-800/90 border border-slate-700/60 rounded-2xl p-4 mb-5 text-left space-y-2.5">
            <div class="flex justify-between items-center border-b border-slate-700/50 pb-2">
              <span class="text-xs text-slate-400">Тариф</span>
              <span class="text-xs font-semibold text-purple-300">{{ purchaseDetails?.offer.title }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-slate-700/50 pb-2">
              <span class="text-xs text-slate-400">Сумма</span>
              <span class="text-sm font-bold text-emerald-400">
                {{ purchaseDetails?.offer?.price }} 
                <span class="text-[10px] text-slate-400 font-normal">/ {{ purchaseDetails?.offer.period }}</span>
              </span>
            </div>

            <div v-if="purchaseDetails?.orderId" class="flex justify-between items-center text-[11px] text-slate-500">
              <span>Заказ</span>
              <span class="font-mono text-slate-400">#{{ purchaseDetails?.orderId }}</span>
            </div>

            <div class="flex justify-between items-center text-[11px] text-slate-500">
              <span>Устройство</span>
              <span class="font-mono text-slate-400 truncate max-w-[110px]">{{ purchaseDetails?.deviceId }}</span>
            </div>
          </div>

          <button 
            @click="emits('close')" 
            class="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold rounded-2xl shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Начать играть 🚀
          </button>
        </div>
      </div>
</template>