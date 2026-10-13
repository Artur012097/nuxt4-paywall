import { db } from '../utils/db'

export interface PurchaseRecord {
  id?: number
  offerId: string
  deviceId: string
  createdAt?: string
}

export const purchaseRepository = {
  create(offerId: string, deviceId: string): PurchaseRecord {
    console.log('💾 [DB] Сохранение покупки:', { offerId, deviceId })
    const stmt = db.prepare<[string, string]>(`
      INSERT INTO purchases (offerId, deviceId) 
      VALUES (?, ?)
    `)
    const info = stmt.run(offerId, deviceId)
    
    return {
      id: Number(info.lastInsertRowid),
      offerId,
      deviceId,
      createdAt: new Date().toISOString()
    }
  },

  getByDevice(deviceId: string): PurchaseRecord | undefined {
    console.log('🔍 [DB] Поиск покупки для устройства:', deviceId)
    const stmt = db.prepare<[string], PurchaseRecord>(`
      SELECT id, offerId, deviceId, createdAt 
      FROM purchases 
      WHERE deviceId = ? 
      ORDER BY id DESC 
      LIMIT 1
    `)
    const result = stmt.get(deviceId)
    console.log('📦 [DB] Результат поиска:', result)
    return result
  }
}