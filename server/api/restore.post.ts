import { purchaseRepository } from '../repositories/purchaseRepository'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('📥 [API POST /restore] Получено тело:', body)
  
  const deviceId = body?.deviceId

  if (!deviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Отсутствует параметр deviceId'
    })
  }

  try {
    const purchase = purchaseRepository.getByDevice(deviceId)

    if (!purchase) {
      return {
        success: false,
        message: 'Активных подписок не найдено'
      }
    }

    return {
      success: true,
      data: purchase
    }
  } catch (error) {
    console.error('❌ [API POST /restore] Ошибка:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при поиске подписки в базе данных'
    })
  }
})