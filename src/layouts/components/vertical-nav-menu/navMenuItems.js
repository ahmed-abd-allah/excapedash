/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [{
        url: "/",
        name: "الرئيسية",
        slug: "home",
        icon: "HomeIcon",
    },
    // {
    //   url: null,
    //   name: 'الصيدليات',
    //   icon: 'CommandIcon',

    //   submenu: [{
    //       url: '/pharmacy/new',
    //       name: 'إضافة صيدالية جديدة ',
    //       slug: 'pharmacy-new',
    //     },
    //     {
    //       url: '/pharmacy',
    //       name: 'عرض الصيدليات',
    //       slug: '',
    //     },

    //   ]
    // },
    // {
    //   url: null,
    //   name: 'المخازن',
    //   icon: 'BriefcaseIcon',

    //   submenu: [{
    //       url: '/inventory/new',
    //       name: 'إضافة مخزن جديد ',
    //       slug: 'inventory-new',
    //     },
    //     {
    //       url: '/inventory',
    //       name: 'عرض المخازن',
    //       slug: '',
    //     },

    //   ]
    // },
    {
        url: null,
        name: 'والمستخدمين العملاء',
        icon: 'UsersIcon',

        submenu: [{
                url: '/client/new',
                name: 'إضافة مستخدم جديد',
                slug: 'client-new',
            },
            {
                url: '/client',
                name: 'عرض الكل ',
                slug: '',
            },

        ]
    },
    {
        url: null,
        name: ' الخدمات  ',
        icon: 'ShoppingCartIcon',

        submenu: [{
                url: '/category/new',
                name: 'إضافة خدمة جديد',
                slug: 'category-new',
            },
            {
                url: '/category',
                name: 'عرض كل الخدمات',
                slug: '',
            },

        ]
    },
    {
        url: null,
        name: ' المقالات ',
        icon: 'TargetIcon',

        submenu: [{
                url: '/post/new',
                name: 'إضافة مقال  جديد',
                slug: 'post-new',
            },
            {
                url: '/post',
                name: 'عرض كل المقالات',
                slug: '',
            },

        ]
    },
    {
        url: null,
        name: ' الاعمال السابقة  ',
        icon: 'ServerIcon',

        submenu: [{
                url: '/products/new',
                name: 'إضافة  جديد',
                slug: 'products-new',
            },
            {
                url: '/products',
                name: 'عرض الكل ',
                slug: '',
            },

        ]
    },
    // {
    //     url: null,
    //     name: ' الطلبات ',
    //     icon: 'CloudRainIcon',

    //     submenu: [{
    //             url: '/orders',
    //             name: 'عرض كل الطلبات ',
    //             slug: '',
    //         },

    //     ]
    // },
    // {
    //   url: null,
    //   name: 'مكونات الوجبات',
    //   icon: 'ShoppingCartIcon',

    //   submenu: [{
    //       url: '/ingredient/new',
    //       name: 'إضافة مكون جديد',
    //       slug: '',
    //     },
    //     {
    //       url: '/ingredient',
    //       name: 'عرض المكونات',
    //       slug: '',
    //     },

    //   ]
    // },

]