<script setup lang="ts">
	const {} = defineProps<{
	 foundSubscription: {
		offer: {
		  title: string
		  price: string
		}
		orderId?: string
	 }
  }>()

  const emits = defineEmits<{
	 (e: 'cancel-restore'): void
	 (e: 'execute-restore'): void
  }>()

  const cancelRestore = () => {
	 emits('cancel-restore')
  }

  const executeRestore = () => {
	 emits('execute-restore')
  }
</script>

<template>
	 <div 
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      >
        <div class="w-full max-w-xs bg-slate-900 border border-purple-500/30 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
          
          <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl">
            🔍
          </div>

          <h3 class="text-lg font-extrabold text-white tracking-tight mb-1">
            Найдена подписка!
          </h3>
          <p class="text-xs text-slate-400 mb-4">
            Обнаружена активная покупка для этого устройства:
          </p>

          <!-- Карточка с деталями НАЙДЕННОЙ подписки -->
          <div class="bg-slate-800/90 border border-slate-700/60 rounded-2xl p-3.5 mb-5 text-left space-y-2">
            <div class="flex justify-between items-center border-b border-slate-700/50 pb-1.5">
              <span class="text-xs text-slate-400">Тариф</span>
              <span class="text-xs font-semibold text-purple-300">{{ foundSubscription.offer.title }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-slate-700/50 pb-1.5">
              <span class="text-xs text-slate-400">Сумма</span>
              <span class="text-xs font-bold text-emerald-400">{{ foundSubscription.offer.price }}</span>
            </div>

            <div v-if="foundSubscription.orderId" class="flex justify-between items-center text-[11px] text-slate-500">
              <span>Заказ</span>
              <span class="font-mono text-slate-400">#{{ foundSubscription.orderId }}</span>
            </div>
          </div>

          <!-- Кнопки управления -->
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="cancelRestore" 
              class="py-3 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700 transition"
            >
              Отмена
            </button>
            <button 
              @click="executeRestore" 
              class="py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 hover:brightness-110 transition"
            >
              Восстановить
            </button>
          </div>
        </div>
      </div>
</template>