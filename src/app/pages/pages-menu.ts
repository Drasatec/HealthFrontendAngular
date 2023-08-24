
export const items = [
  {
    title: 'لوحة التحكم',
    icon: 'fa-solid fa-shopping-cart',
    link: '/dashboard',
    home: true,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // }
  {
    title: 'الاعدادات الرئيسية',
    icon:'fa-solid fa-gear',
    link:'/system/',
    children: [
      {
        title: ' اعدادات النظام',
        icon:'fa-solid fa-notes-medical',
        link:'/system/hospitals/all-hospital'
      },
      {
        title: ' الاعدادات',
        icon:'fa-solid fa-gears',
        link:'/system/settings/general-setting'
      },


    ],
  },
  {
    title: ' نظام إدارة الاستقبال',
    icon:'fa-solid fa-receipt',
    link:'/booking/',
    children: [
      {
        title: ' الاجراءات',
        icon:'fa-solid fa-phone',
        link:'/booking/all-booking'
      },
      // {
      //   title: ' التقارير',
      //   icon:'fa-solid fa-phone',
      //   link:'/all-seeting'
      // },
    ],
  },

  {
  title: ' نظام إدارة التسويق',
  icon:'fa-solid fa-receipt',
  link:'/marketing/',
  children: [
    {
      title: ' العملاء',
      icon:'fa-solid fa-phone',
      link:'/marketing/contactUs'
    },
    // {
    //   title: ' التقارير',
    //   icon:'fa-solid fa-phone',
    //   link:'/dashboard/all-seeting'
    // },
  ],
},
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
