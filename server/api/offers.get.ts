export default defineEventHandler(async (event) => {
  return {
    offers: [
      {
        id: 'weekly_trial',
        title: 'Недельный доступ',
        price: '199 ₽',
        period: 'неделю',
        badge: '3 дня бесплатно',
        savings: 'Пробный период'
      },
      {
        id: 'yearly_best',
        title: 'Годовой доступ',
        price: '1 490 ₽',
        period: 'год',
        badge: 'Хит продаж!',
        savings: 'Экономия 65%'
      }
    ]
  }
})