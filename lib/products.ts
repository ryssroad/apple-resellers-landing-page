export interface Product {
  id: string
  name: string
  category: 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'accessories'
  description: string
  price: number
  originalPrice?: number
  image: string
  colors: { name: string; hex: string }[]
  specs: { label: string; value: string }[]
  storage?: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
}

export const products: Product[] = [
  // iPhone
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    category: 'iphone',
    description: 'Самый мощный iPhone с чипом A19 Pro, титановым корпусом и передовой камерой 48 МП.',
    price: 899990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693009284541',
    colors: [
      { name: 'Натуральный титан', hex: '#8F8A81' },
      { name: 'Синий титан', hex: '#394C5E' },
      { name: 'Белый титан', hex: '#F5F5F0' },
      { name: 'Черный титан', hex: '#1D1D1F' },
    ],
    specs: [
      { label: 'Дисплей', value: '6.9" Super Retina XDR, ProMotion 120Hz' },
      { label: 'Чип', value: 'A19 Pro, 6-ядерный CPU' },
      { label: 'Камера', value: '48 МП основная, 12 МП Ultra Wide, 12 МП телефото 5x' },
      { label: 'Батарея', value: 'До 29 часов видео' },
      { label: 'Материал', value: 'Титановый корпус Grade 5' },
    ],
    storage: ['256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    category: 'iphone',
    description: 'Pro-возможности в компактном формате. Титановый дизайн и камера ProRAW.',
    price: 749990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693009284539',
    colors: [
      { name: 'Натуральный титан', hex: '#8F8A81' },
      { name: 'Синий титан', hex: '#394C5E' },
      { name: 'Белый титан', hex: '#F5F5F0' },
      { name: 'Черный титан', hex: '#1D1D1F' },
    ],
    specs: [
      { label: 'Дисплей', value: '6.3" Super Retina XDR, ProMotion 120Hz' },
      { label: 'Чип', value: 'A19 Pro, 6-ядерный CPU' },
      { label: 'Камера', value: '48 МП основная, 12 МП Ultra Wide, 12 МП телефото 3x' },
      { label: 'Батарея', value: 'До 23 часа видео' },
      { label: 'Материал', value: 'Титановый корпус Grade 5' },
    ],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    category: 'iphone',
    description: 'Новое поколение iPhone с Dynamic Island и улучшенной камерой.',
    price: 549990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693009284559',
    colors: [
      { name: 'Черный', hex: '#1D1D1F' },
      { name: 'Синий', hex: '#A1C3D3' },
      { name: 'Зеленый', hex: '#CAD4C5' },
      { name: 'Желтый', hex: '#F9E479' },
      { name: 'Розовый', hex: '#FADDD7' },
    ],
    specs: [
      { label: 'Дисплей', value: '6.1" Super Retina XDR' },
      { label: 'Чип', value: 'A19, 6-ядерный CPU' },
      { name: 'Камера', value: '48 МП основная система' },
      { label: 'Батарея', value: 'До 20 часов видео' },
      { label: 'Защита', value: 'Ceramic Shield' },
    ],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ'],
    inStock: true,
    isNew: true,
  },
  // Mac
  {
    id: 'macbook-pro-16-m5-pro',
    name: 'MacBook Pro 16" M5 Pro',
    category: 'mac',
    description: 'Профессиональная мощность с чипом M5 Pro. Идеален для разработки и креатива.',
    price: 1475800,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290',
    colors: [
      { name: 'Серый космос', hex: '#1D1D1F' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M5 Pro, 12-ядерный CPU, 18-ядерный GPU' },
      { label: 'Дисплей', value: '16.2" Liquid Retina XDR, ProMotion' },
      { label: 'Память', value: '18 ГБ унифицированная' },
      { label: 'Батарея', value: 'До 22 часов' },
      { label: 'Порты', value: '3x Thunderbolt 5, HDMI, SD, MagSafe' },
    ],
    storage: ['512 ГБ', '1 ТБ', '2 ТБ', '4 ТБ'],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 'macbook-pro-14-m5-pro',
    name: 'MacBook Pro 14" M5 Pro',
    category: 'mac',
    description: 'Компактный профессиональный ноутбук с невероятной производительностью.',
    price: 1199990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200',
    colors: [
      { name: 'Серый космос', hex: '#1D1D1F' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M5 Pro, 12-ядерный CPU, 18-ядерный GPU' },
      { label: 'Дисплей', value: '14.2" Liquid Retina XDR, ProMotion' },
      { label: 'Память', value: '18 ГБ унифицированная' },
      { label: 'Батарея', value: 'До 17 часов' },
      { label: 'Порты', value: '3x Thunderbolt 5, HDMI, SD, MagSafe' },
    ],
    storage: ['512 ГБ', '1 ТБ', '2 ТБ'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'macbook-air-15-m5',
    name: 'MacBook Air 15" M5',
    category: 'mac',
    description: 'Большой экран, невероятная портативность. Самый тонкий 15" ноутбук в мире.',
    price: 784900,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684518479231',
    colors: [
      { name: 'Полночь', hex: '#1D1D1F' },
      { name: 'Звездный свет', hex: '#F0E4D3' },
      { name: 'Серый космос', hex: '#7D7E80' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M5, 8-ядерный CPU, 10-ядерный GPU' },
      { label: 'Дисплей', value: '15.3" Liquid Retina' },
      { label: 'Память', value: '8 ГБ унифицированная' },
      { label: 'Батарея', value: 'До 18 часов' },
      { label: 'Вес', value: '1.51 кг' },
    ],
    storage: ['256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'macbook-air-13-m4',
    name: 'MacBook Air 13" M4',
    category: 'mac',
    description: 'Самый популярный Mac. Легкий, быстрый и с бесшумным охлаждением.',
    price: 524990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034',
    colors: [
      { name: 'Полночь', hex: '#1D1D1F' },
      { name: 'Звездный свет', hex: '#F0E4D3' },
      { name: 'Серый космос', hex: '#7D7E80' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M4, 8-ядерный CPU, 10-ядерный GPU' },
      { label: 'Дисплей', value: '13.6" Liquid Retina' },
      { label: 'Память', value: '8 ГБ унифицированная' },
      { label: 'Батарея', value: 'До 18 часов' },
      { label: 'Вес', value: '1.24 кг' },
    ],
    storage: ['256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
  },
  // iPad
  {
    id: 'ipad-pro-13-m5',
    name: 'iPad Pro 13" M5',
    category: 'ipad',
    description: 'Ультратонкий. Невероятно мощный. С новейшим чипом M5 и OLED дисплеем.',
    price: 795990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-space-black-wifi?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1713920820750',
    colors: [
      { name: 'Серый космос', hex: '#1D1D1F' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M5, 9-ядерный CPU, 10-ядерный GPU' },
      { label: 'Дисплей', value: '13" Ultra Retina XDR OLED, ProMotion' },
      { label: 'Толщина', value: '5.1 мм — самый тонкий продукт Apple' },
      { label: 'Face ID', value: 'Да, в альбомной ориентации' },
      { label: 'Apple Pencil', value: 'Поддержка Apple Pencil Pro' },
    ],
    storage: ['256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'ipad-air-11-m4',
    name: 'iPad Air 11" M4',
    category: 'ipad',
    description: 'Мощь M4 в универсальном формате. Идеален для работы и творчества.',
    price: 449990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue-wifi?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1713308063407',
    colors: [
      { name: 'Голубой', hex: '#B5C9D1' },
      { name: 'Фиолетовый', hex: '#C9C2D1' },
      { name: 'Звездный свет', hex: '#F0E4D3' },
      { name: 'Серый космос', hex: '#6E6E73' },
    ],
    specs: [
      { label: 'Чип', value: 'Apple M4, 9-ядерный CPU' },
      { label: 'Дисплей', value: '11" Liquid Retina' },
      { label: 'Камера', value: '12 МП Wide, 12 МП фронтальная' },
      { label: 'Touch ID', value: 'Встроен в верхнюю кнопку' },
      { label: 'Apple Pencil', value: 'Поддержка Apple Pencil Pro' },
    ],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
  },
  {
    id: 'ipad-10',
    name: 'iPad 10-го поколения',
    category: 'ipad',
    description: 'Яркий, универсальный и доступный. Отличный выбор для повседневных задач.',
    price: 269990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1670858021004',
    colors: [
      { name: 'Синий', hex: '#4B6D9B' },
      { name: 'Розовый', hex: '#E8D2CF' },
      { name: 'Желтый', hex: '#F3D77A' },
      { name: 'Серебристый', hex: '#E3E4E5' },
    ],
    specs: [
      { label: 'Чип', value: 'A14 Bionic' },
      { label: 'Дисплей', value: '10.9" Liquid Retina' },
      { label: 'Камера', value: '12 МП Wide' },
      { label: 'Разъем', value: 'USB-C' },
      { label: 'Touch ID', value: 'Встроен в верхнюю кнопку' },
    ],
    storage: ['64 ГБ', '256 ГБ'],
    inStock: true,
  },
  // Apple Watch
  {
    id: 'apple-watch-ultra-3',
    name: 'Apple Watch Ultra 3',
    category: 'watch',
    description: 'Самые прочные и функциональные Apple Watch. Для экстремальных условий.',
    price: 549990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-702702-702719-702778-702701-702814-702718-702814_VW_PF+watch-case-49-titanium-ultra2_VW_PF+watch-face-49-activity-digital-ultra2_VW_PF?wid=1000&hei=1000&fmt=jpeg&qlt=90&.v=1693508833335',
    colors: [
      { name: 'Титан', hex: '#8F8A81' },
    ],
    specs: [
      { label: 'Корпус', value: '49 мм титан' },
      { label: 'Дисплей', value: 'Always-On Retina LTPO OLED, 3000 нит' },
      { label: 'Чип', value: 'S10 SiP' },
      { label: 'Водозащита', value: 'До 100 м, дайвинг до 40 м' },
      { label: 'Батарея', value: 'До 36 часов, до 72 в режиме энергосбережения' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    category: 'watch',
    description: 'Самый большой и продвинутый дисплей. Здоровье всегда под контролем.',
    price: 349990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-702702-702719-702778-702701-702814-702718-702814_VW_PF+watch-case-46-aluminum-midnight-nc-s9_VW_PF+watch-face-46-aluminum-midnight-s9_VW_PF?wid=1000&hei=1000&fmt=jpeg&qlt=90&.v=1693346910291',
    colors: [
      { name: 'Полночь', hex: '#1D1D1F' },
      { name: 'Звездный свет', hex: '#F0E4D3' },
      { name: 'Серебристый', hex: '#E3E4E5' },
      { name: 'Розовый', hex: '#FADDD7' },
    ],
    specs: [
      { label: 'Корпус', value: '42 мм или 46 мм алюминий' },
      { label: 'Дисплей', value: 'Always-On Retina LTPO OLED' },
      { label: 'Чип', value: 'S10 SiP' },
      { label: 'Датчики', value: 'ЭКГ, SpO2, температура тела' },
      { label: 'Батарея', value: 'До 18 часов' },
    ],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  // AirPods
  {
    id: 'airpods-pro-3',
    name: 'AirPods Pro 3',
    category: 'airpods',
    description: 'Активное шумоподавление нового поколения. Персонализированный звук.',
    price: 189990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=470&hei=556&fmt=png-alpha&.v=1724041669458',
    colors: [
      { name: 'Белый', hex: '#F5F5F7' },
    ],
    specs: [
      { label: 'Чип', value: 'H3' },
      { label: 'Шумоподавление', value: 'Адаптивное активное' },
      { label: 'Режим прозрачности', value: 'Да, с распознаванием голоса' },
      { label: 'Батарея', value: 'До 6 часов, 30 часов с кейсом' },
      { label: 'Защита', value: 'IPX4' },
    ],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 'airpods-4',
    name: 'AirPods 4',
    category: 'airpods',
    description: 'Комфорт открытого дизайна с пространственным аудио.',
    price: 129990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=470&hei=556&fmt=png-alpha&.v=1725502639798',
    colors: [
      { name: 'Белый', hex: '#F5F5F7' },
    ],
    specs: [
      { label: 'Чип', value: 'H2' },
      { label: 'Дизайн', value: 'Открытый, без вкладышей' },
      { label: 'Пространственный звук', value: 'Да, с отслеживанием головы' },
      { label: 'Батарея', value: 'До 5 часов, 30 часов с кейсом' },
      { label: 'Управление', value: 'Сенсорное, нажатие на ножку' },
    ],
    inStock: true,
  },
  {
    id: 'airpods-max-2',
    name: 'AirPods Max 2',
    category: 'airpods',
    description: 'Премиальные накладные наушники с Hi-Fi звуком и USB-C.',
    price: 399990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=470&hei=556&fmt=png-alpha&.v=1724927451276',
    colors: [
      { name: 'Полночь', hex: '#1D1D1F' },
      { name: 'Звездный свет', hex: '#F0E4D3' },
      { name: 'Голубой', hex: '#8DB4C7' },
      { name: 'Фиолетовый', hex: '#9B8BA0' },
      { name: 'Оранжевый', hex: '#E8A46A' },
    ],
    specs: [
      { label: 'Чип', value: 'H2' },
      { label: 'Шумоподавление', value: 'Активное' },
      { label: 'Аудио', value: 'Hi-Fi с поддержкой Lossless' },
      { label: 'Батарея', value: 'До 20 часов' },
      { label: 'Материал', value: 'Алюминий, нержавеющая сталь' },
    ],
    inStock: true,
    isNew: true,
  },
  // Accessories
  {
    id: 'apple-pencil-pro',
    name: 'Apple Pencil Pro',
    category: 'accessories',
    description: 'Новые жесты сжатия, тактильный отклик и функция Find My.',
    price: 89990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713841707336',
    colors: [
      { name: 'Белый', hex: '#F5F5F7' },
    ],
    specs: [
      { label: 'Совместимость', value: 'iPad Pro M4, iPad Air M2' },
      { label: 'Функции', value: 'Сжатие, наведение, наклон, давление' },
      { label: 'Find My', value: 'Да' },
      { label: 'Зарядка', value: 'Магнитная, беспроводная' },
      { label: 'Тактильный отклик', value: 'Да' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: 'magic-keyboard-ipad-pro-13',
    name: 'Magic Keyboard для iPad Pro 13"',
    category: 'accessories',
    description: 'Тонкая и легкая клавиатура с трекпадом и функциональным рядом клавиш.',
    price: 249990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWR53?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1713928172393',
    colors: [
      { name: 'Черный', hex: '#1D1D1F' },
      { name: 'Белый', hex: '#F5F5F7' },
    ],
    specs: [
      { label: 'Совместимость', value: 'iPad Pro 13" M4' },
      { label: 'Трекпад', value: 'Да, увеличенный' },
      { label: 'Подсветка', value: 'Да' },
      { label: 'Функциональный ряд', value: 'Да, 14 клавиш' },
      { label: 'Порт', value: 'USB-C для зарядки' },
    ],
    inStock: true,
    isNew: true,
  },
  {
    id: 'magsafe-charger',
    name: 'Зарядное устройство MagSafe',
    category: 'accessories',
    description: 'Быстрая беспроводная зарядка с идеальным выравниванием.',
    price: 34990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1603835871000',
    colors: [
      { name: 'Белый', hex: '#F5F5F7' },
    ],
    specs: [
      { label: 'Мощность', value: 'До 15 Вт' },
      { label: 'Совместимость', value: 'iPhone 12 и новее, AirPods' },
      { label: 'Длина кабеля', value: '1 м' },
      { label: 'Разъем', value: 'USB-C' },
      { label: 'Магниты', value: 'Встроенные для выравнивания' },
    ],
    inStock: true,
  },
]

export const categories = [
  { id: 'all', name: 'Все товары', icon: 'grid' },
  { id: 'iphone', name: 'iPhone', icon: 'smartphone' },
  { id: 'mac', name: 'Mac', icon: 'laptop' },
  { id: 'ipad', name: 'iPad', icon: 'tablet' },
  { id: 'watch', name: 'Watch', icon: 'watch' },
  { id: 'airpods', name: 'AirPods', icon: 'headphones' },
  { id: 'accessories', name: 'Аксессуары', icon: 'cable' },
] as const

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
