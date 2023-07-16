
export const items = [
  // {
  //   title: 'لوحة التحكم',
  //   icon: 'fa-solid fa-shopping-cart',
  //   // link: '/dashboard/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // }
  {
    title: 'اعدادات النظام',
    icon:'fa-solid fa-gear',
    link:'/dashboard/system/',
    children: [
      {
        title: ' الاعدادات',
        icon:'fa-solid fa-gears',
        link:'/dashboard/system/settings/room-types'
      },
      {
        title: 'البيانات الاساسية',
        icon:'fa-solid fa-notes-medical',
        link:'/dashboard/system/hospitals/all-hospital'
      },

    ],
  },
  // {
  //   title: ' نظام إدارة الاستقبال',
  //   icon:'fa-solid fa-receipt',
  //   link:'/dashboard/booking/',
  //   children: [
  //     {
  //       title: ' الاجراءات',
  //       icon:'fa-solid fa-phone',
  //       link:'/dashboard/booking/all-booking'
  //     },
  //     {
  //       title: ' التقارير',
  //       icon:'fa-solid fa-phone',
  //       link:'/dashboard/all-seeting'
  //     },
  //   ],
  // },
  // {
  //   title: ' نظام العيادات',
  //   icon:'fa-solid fa-receipt',
  //   children: [
  //     {
  //       title: ' الاجراءات',
  //       icon:'fa-solid fa-phone',
  //       link:'/dashboard/all-seeting'
  //     },
  //     {
  //       title: ' التقارير',
  //       icon:'fa-solid fa-phone',
  //       link:'/dashboard/all-seeting'
  //     },

  //   ],
  // },
];
