import { purchaseRepository } from '../repositories/purchaseRepository'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('📥 [API POST /purchase] Получено тело:', body)

  if (!body?.offerId || !body?.deviceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Отсутствуют обязательные параметры: offerId и deviceId'
    })
  }

  try {
    const record = purchaseRepository.create(body.offerId, body.deviceId)
    return {
      success: true,
      data: record
    }
  } catch (error) {
    console.error('❌ [API POST /purchase] Ошибка:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при сохранении покупки в базу данных'
    })
  }
})