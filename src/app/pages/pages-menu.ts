import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'لوحة التحكم',
    icon: 'shopping-cart-outline',
    // link: '/dashboard/dashboard',
    home: true,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // }
  {
    title: 'اعدادات النظام',
    icon: {icon: 'gear', pack: 'font-awesome'},
    children: [
      {
        title: 'البيانات الاساسية',
        icon: {icon: 'notes-medical', pack: 'font-awesome'},
        // link: '/pages/layout/stepper',
        children :[
          {
            title: 'المستشفيات',
            icon: {icon: 'hospital', pack: 'font-awesome'},
            link: '/dashboard/hospitals',
            // icon: {icon: 'hospital', pack: 'font-awesome'},
            // link: '/pages/iot-dashboard',
            // children:[
            //   {
            //     title: 'كل المستشفيات',
            //     icon: {icon: 'house-medical-flag', pack: 'font-awesome'},
            //     link: '/dashboard/hospitals',
            //   },
            //   {
            //     title: 'إضافة مستشفي',
            //     icon: {icon: 'square-plus', pack: 'font-awesome'},
            //     link: '/dashboard/hospitals/add-hospital',
            //   }
            // ]
          },
          {
            title: 'المباني',
            icon: {icon: 'building', pack: 'font-awesome'},
            link: '/dashboard/buildings',
          }
        ]
      },

    ],
  },
  {
    title: ' نظام إدارة الاستقبال',
    icon: {icon: 'receipt', pack: 'font-awesome'},
    children: [
      {
        title: ' الحجوزات',
        icon: {icon: 'phone', pack: 'font-awesome'},
        // link: '/pages/layout/stepper',
        children :[
          {
            title: 'كل الحجوزات',
            icon: {icon: 'book-medical', pack: 'font-awesome'},
            link: '/dashboard/booking',
          },
        ]
      },

    ],
  },
];
