<script setup lang="ts">
const { isLoading, isFetching } = defineProps<{
  isLoading: boolean
  isFetching: boolean
}>()

const emits = defineEmits<{
  (e: 'purchase'): void
  (e: 'restore'): void
}>()
</script>

<template>
	<div class="space-y-4 pt-4">
      <button 
        @click="emits('purchase')"
        :disabled="isLoading || isFetching"
        class="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <span v-if="isLoading" class="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
        <span>{{ isLoading ? 'Обработка платежа...' : 'Получить полный доступ' }}</span>
      </button>

      <div class="flex justify-center">
        <!-- Шаг 1: Запрос и показ найденных данных до восстановления -->
        <button 
          @click="emits('restore')"
          class="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition py-1"
        >
          Восстановить покупки
        </button>
      </div>

      <p class="text-[10px] text-slate-500 text-center leading-normal px-4">
        Оплата списывается с вашего аккаунта приложения. Подписка продлевается автоматически.
      </p>
    </div>
	 </template>