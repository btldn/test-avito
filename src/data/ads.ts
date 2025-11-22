export type ModerationDecision = "approved" | "rejected" | "rework";

export type ModerationHistoryItem = {
  id: number;
  moderator: string;
  dateTime: string;
  decision: ModerationDecision;
  comment?: string;
  reason?: string;
};

export type Seller = {
  name: string;
  rating: number;
  adsCount: number;
  registeredAt: string;
};

export type Ad = {
  id: number;
  title: string;
  price: number;
  category: string;
  date: string;
  createdAt: string;
  priority: "normal" | "urgent";
  status: "pending" | "approved" | "rejected" | "rework";
  images: string[];
  description: string;
  specs: { key: string; value: string }[];
  seller: Seller;
  moderationHistory: ModerationHistoryItem[];
};


export const MOCK_ADS: Ad[] = [
  {
    id: 1,
    title: "iPhone 14 Pro 256GB",
    price: 95000,
    category: "Электроника",
    date: "18.11.2025",
    createdAt: "2025-11-18T10:15:00Z",
    priority: "urgent",
    status: "pending",
    images: [
      "https://placehold.co/640x480?text=iPhone+1",
      "https://placehold.co/640x480?text=iPhone+2",
      "https://placehold.co/640x480?text=iPhone+3",
    ],
    description:
      "Продам iPhone 14 Pro 256GB. Отличное состояние, FaceID работает, без сколов. Комплект полный.",
    specs: [
      { key: "Память", value: "256 GB" },
      { key: "Цвет", value: "Space Black" },
      { key: "Состояние", value: "Отличное" },
      { key: "Комплект", value: "Коробка, кабель" },
    ],
    seller: {
      name: "Артём К.",
      rating: 4.8,
      adsCount: 17,
      registeredAt: "12.03.2021",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Анна",
        dateTime: "18.11.2025 12:10",
        decision: "rework",
        comment: "Добавьте фото серийного номера.",
      },
    ],
  },

  {
    id: 2,
    title: "Диван угловой серый",
    price: 35000,
    category: "Мебель",
    date: "17.11.2025",
    createdAt: "2025-11-17T09:00:00Z",
    priority: "normal",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Sofa+1",
      "https://placehold.co/640x480?text=Sofa+2",
      "https://placehold.co/640x480?text=Sofa+3",
    ],
    description:
      "Угловой диван в хорошем состоянии. Ткань без пятен, механизмы рабочие. Самовывоз.",
    specs: [
      { key: "Материал", value: "Рогожка" },
      { key: "Цвет", value: "Серый" },
      { key: "Размер", value: "240×160 см" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Екатерина",
      rating: 4.6,
      adsCount: 9,
      registeredAt: "05.09.2020",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Иван",
        dateTime: "17.11.2025 09:40",
        decision: "approved",
      },
    ],
  },

  {
    id: 3,
    title: "Смарт-часы Samsung Galaxy Watch 6",
    price: 21000,
    category: "Электроника",
    date: "14.11.2025",
    createdAt: "2025-11-14T12:30:00Z",
    priority: "urgent",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Watch+1",
      "https://placehold.co/640x480?text=Watch+2",
      "https://placehold.co/640x480?text=Watch+3",
    ],
    description:
      "Galaxy Watch 6, почти новые, носились пару раз. Полный комплект, чек.",
    specs: [
      { key: "Модель", value: "Watch 6" },
      { key: "Диагональ", value: "1.5”" },
      { key: "Комплект", value: "Коробка, зарядка" },
      { key: "Состояние", value: "Как новые" },
    ],
    seller: {
      name: "Сергей",
      rating: 4.9,
      adsCount: 23,
      registeredAt: "21.06.2019",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Лена",
        dateTime: "14.11.2025 13:05",
        decision: "approved",
      },
    ],
  },

  {
    id: 4,
    title: "Шкаф-купе белый 2 м",
    price: 28000,
    category: "Мебель",
    date: "15.11.2025",
    createdAt: "2025-11-15T08:10:00Z",
    priority: "normal",
    status: "rejected",
    images: [
      "https://placehold.co/640x480?text=Wardrobe+1",
      "https://placehold.co/640x480?text=Wardrobe+2",
      "https://placehold.co/640x480?text=Wardrobe+3",
    ],
    description:
      "Шкаф-купе белый, ширина 2 метра, внутри полки и штанги. Разборка на месте.",
    specs: [
      { key: "Ширина", value: "200 см" },
      { key: "Цвет", value: "Белый" },
      { key: "Материал", value: "ЛДСП" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Марина",
      rating: 4.2,
      adsCount: 6,
      registeredAt: "11.01.2022",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Анна",
        dateTime: "15.11.2025 09:00",
        decision: "rejected",
        reason: "Некорректное описание",
        comment: "В описании нет состояния и дефектов.",
      },
    ],
  },

  {
    id: 5,
    title: "PlayStation 5 + 2 геймпада",
    price: 52000,
    category: "Игры и приставки",
    date: "16.11.2025",
    createdAt: "2025-11-16T14:20:00Z",
    priority: "urgent",
    status: "pending",
    images: [
      "https://placehold.co/640x480?text=PS5+1",
      "https://placehold.co/640x480?text=PS5+2",
      "https://placehold.co/640x480?text=PS5+3",
    ],
    description:
      "PS5 в отличном состоянии, два геймпада, коробка, все провода. Без перегревов.",
    specs: [
      { key: "Модель", value: "PS5" },
      { key: "Комплект", value: "2 геймпада" },
      { key: "Память", value: "825 GB" },
      { key: "Состояние", value: "Отличное" },
    ],
    seller: {
      name: "Дмитрий",
      rating: 4.7,
      adsCount: 14,
      registeredAt: "03.04.2020",
    },
    moderationHistory: [],
  },

  {
    id: 6,
    title: "Велосипед горный GT Aggressor",
    price: 18000,
    category: "Спорт и отдых",
    date: "13.11.2025",
    createdAt: "2025-11-13T07:45:00Z",
    priority: "normal",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Bike+1",
      "https://placehold.co/640x480?text=Bike+2",
      "https://placehold.co/640x480?text=Bike+3",
    ],
    description:
      "Горный велосипед, обслужен, тормоза и передачи в порядке. Хорош для города и леса.",
    specs: [
      { key: "Размер рамы", value: "M" },
      { key: "Колёса", value: "27.5”" },
      { key: "Тормоза", value: "Дисковые" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Павел",
      rating: 4.5,
      adsCount: 11,
      registeredAt: "19.08.2018",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Иван",
        dateTime: "13.11.2025 08:10",
        decision: "approved",
      },
    ],
  },

  {
    id: 7,
    title: "Кофемашина DeLonghi Magnifica",
    price: 24000,
    category: "Бытовая техника",
    date: "12.11.2025",
    createdAt: "2025-11-12T11:00:00Z",
    priority: "normal",
    status: "rework",
    images: [
      "https://placehold.co/640x480?text=Coffee+1",
      "https://placehold.co/640x480?text=Coffee+2",
      "https://placehold.co/640x480?text=Coffee+3",
    ],
    description:
      "Кофемашина DeLonghi, работает отлично. Регулярно чистилась, есть капучинатор.",
    specs: [
      { key: "Тип", value: "Автомат" },
      { key: "Капучинатор", value: "Есть" },
      { key: "Состояние", value: "Хорошее" },
      { key: "Комплект", value: "Без коробки" },
    ],
    seller: {
      name: "Ольга",
      rating: 4.3,
      adsCount: 5,
      registeredAt: "30.05.2023",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Лена",
        dateTime: "12.11.2025 11:35",
        decision: "rework",
        comment: "Нужны фото серийного номера и комплектности.",
      },
    ],
  },

  {
    id: 8,
    title: "Куртка зимняя мужская The North Face",
    price: 9000,
    category: "Одежда",
    date: "11.11.2025",
    createdAt: "2025-11-11T18:10:00Z",
    priority: "normal",
    status: "pending",
    images: [
      "https://placehold.co/640x480?text=Jacket+1",
      "https://placehold.co/640x480?text=Jacket+2",
      "https://placehold.co/640x480?text=Jacket+3",
    ],
    description:
      "Тёплая зимняя куртка, размер L, без дыр и пятен. Носилась один сезон.",
    specs: [
      { key: "Размер", value: "L" },
      { key: "Сезон", value: "Зима" },
      { key: "Цвет", value: "Чёрный" },
      { key: "Состояние", value: "Отличное" },
    ],
    seller: {
      name: "Алексей",
      rating: 4.4,
      adsCount: 8,
      registeredAt: "07.02.2021",
    },
    moderationHistory: [],
  },

  {
    id: 9,
    title: "Стол кухонный раскладной",
    price: 6500,
    category: "Мебель",
    date: "10.11.2025",
    createdAt: "2025-11-10T09:25:00Z",
    priority: "normal",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Table+1",
      "https://placehold.co/640x480?text=Table+2",
      "https://placehold.co/640x480?text=Table+3",
    ],
    description:
      "Кухонный стол, раскладывается, состояние отличное. Ножки не шатаются.",
    specs: [
      { key: "Материал", value: "МДФ + металл" },
      { key: "Размер", value: "120×80 см" },
      { key: "Раскладной", value: "Да" },
      { key: "Состояние", value: "Отличное" },
    ],
    seller: {
      name: "Ирина",
      rating: 4.7,
      adsCount: 12,
      registeredAt: "22.11.2019",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Иван",
        dateTime: "10.11.2025 10:00",
        decision: "approved",
      },
    ],
  },

  {
    id: 10,
    title: "Ноутбук ASUS TUF Gaming F15",
    price: 62000,
    category: "Электроника",
    date: "09.11.2025",
    createdAt: "2025-11-09T15:40:00Z",
    priority: "urgent",
    status: "pending",
    images: [
      "https://placehold.co/640x480?text=Laptop+1",
      "https://placehold.co/640x480?text=Laptop+2",
      "https://placehold.co/640x480?text=Laptop+3",
    ],
    description:
      "Игровой ноутбук, тянет все современные игры. Без перегревов, аккумулятор живой.",
    specs: [
      { key: "CPU", value: "Intel i5" },
      { key: "RAM", value: "16 GB" },
      { key: "SSD", value: "512 GB" },
      { key: "GPU", value: "RTX 3050" },
    ],
    seller: {
      name: "Никита",
      rating: 4.8,
      adsCount: 19,
      registeredAt: "14.07.2018",
    },
    moderationHistory: [],
  },

  {
    id: 11,
    title: "Автокресло детское Cybex",
    price: 12000,
    category: "Детские товары",
    date: "08.11.2025",
    createdAt: "2025-11-08T10:00:00Z",
    priority: "normal",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Cybex+1",
      "https://placehold.co/640x480?text=Cybex+2",
      "https://placehold.co/640x480?text=Cybex+3",
    ],
    description:
      "Автокресло с изофикс, состояние отличное, после одного ребёнка.",
    specs: [
      { key: "Группа", value: "0+/1" },
      { key: "Крепление", value: "ISOFIX" },
      { key: "Цвет", value: "Синий" },
      { key: "Состояние", value: "Отличное" },
    ],
    seller: {
      name: "Валентина",
      rating: 4.5,
      adsCount: 4,
      registeredAt: "01.12.2022",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Лена",
        dateTime: "08.11.2025 10:40",
        decision: "approved",
      },
    ],
  },

  {
    id: 12,
    title: "Гитара акустическая Yamaha F310",
    price: 7500,
    category: "Музыка и хобби",
    date: "07.11.2025",
    createdAt: "2025-11-07T13:15:00Z",
    priority: "normal",
    status: "rejected",
    images: [
      "https://placehold.co/640x480?text=Guitar+1",
      "https://placehold.co/640x480?text=Guitar+2",
      "https://placehold.co/640x480?text=Guitar+3",
    ],
    description:
      "Акустическая гитара Yamaha, звучит отлично, есть чехол.",
    specs: [
      { key: "Тип", value: "Акустика" },
      { key: "Материал деки", value: "Ель" },
      { key: "Чехол", value: "Есть" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Илья",
      rating: 3.9,
      adsCount: 7,
      registeredAt: "28.02.2020",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Иван",
        dateTime: "07.11.2025 14:00",
        decision: "rejected",
        reason: "Проблемы с фото",
        comment: "На фото не видно товар целиком.",
      },
    ],
  },

  {
    id: 13,
    title: "Автомобильные шины Nokian 205/55 R16 (4 шт.)",
    price: 16000,
    category: "Авто",
    date: "06.11.2025",
    createdAt: "2025-11-06T09:35:00Z",
    priority: "urgent",
    status: "pending",
    images: [
      "https://placehold.co/640x480?text=Tires+1",
      "https://placehold.co/640x480?text=Tires+2",
      "https://placehold.co/640x480?text=Tires+3",
    ],
    description:
      "Комплект зимних шин Nokian, остаток протектора 7 мм. Без грыж.",
    specs: [
      { key: "Сезон", value: "Зима" },
      { key: "Размер", value: "205/55 R16" },
      { key: "Количество", value: "4" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Руслан",
      rating: 4.1,
      adsCount: 10,
      registeredAt: "09.10.2021",
    },
    moderationHistory: [],
  },

  {
    id: 14,
    title: "Коляска прогулочная Chicco",
    price: 9800,
    category: "Детские товары",
    date: "05.11.2025",
    createdAt: "2025-11-05T16:50:00Z",
    priority: "normal",
    status: "rework",
    images: [
      "https://placehold.co/640x480?text=Stroller+1",
      "https://placehold.co/640x480?text=Stroller+2",
      "https://placehold.co/640x480?text=Stroller+3",
    ],
    description:
      "Лёгкая прогулочная коляска, складывается одной рукой. Есть дождевик.",
    specs: [
      { key: "Вес", value: "7.5 кг" },
      { key: "Складывание", value: "Книжка" },
      { key: "Комплект", value: "Дождевик" },
      { key: "Состояние", value: "Хорошее" },
    ],
    seller: {
      name: "Наталья",
      rating: 4.6,
      adsCount: 3,
      registeredAt: "15.04.2022",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Анна",
        dateTime: "05.11.2025 17:20",
        decision: "rework",
        comment: "Добавьте фото шасси и колёс.",
      },
    ],
  },

  {
    id: 15,
    title: "Кроссовки Nike Air Force 1",
    price: 6500,
    category: "Одежда",
    date: "04.11.2025",
    createdAt: "2025-11-04T11:05:00Z",
    priority: "normal",
    status: "approved",
    images: [
      "https://placehold.co/640x480?text=Nike+1",
      "https://placehold.co/640x480?text=Nike+2",
      "https://placehold.co/640x480?text=Nike+3",
    ],
    description:
      "Nike Air Force 1, размер 42, оригинал. Состояние отличное, без заломов.",
    specs: [
      { key: "Размер", value: "42" },
      { key: "Цвет", value: "Белый" },
      { key: "Оригинал", value: "Да" },
      { key: "Состояние", value: "Отличное" },
    ],
    seller: {
      name: "Виктор",
      rating: 4.9,
      adsCount: 31,
      registeredAt: "10.12.2017",
    },
    moderationHistory: [
      {
        id: 1,
        moderator: "Модератор Лена",
        dateTime: "04.11.2025 12:00",
        decision: "approved",
      },
    ],
  },
];

