// server/utils/db.ts
import Database from 'better-sqlite3'

// Только инициализация клиента и схемы
const db = new Database('paywall.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    offerId TEXT NOT NULL,
    deviceId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export { db }