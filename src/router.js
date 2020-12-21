/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
// orders
import ordersMain from './views/pages/orders/Main.vue';
// import Neworders from './views/pages/orders/New.vue';
import ordersList from './views/pages/orders/List.vue';
import ordersEdit from './views/pages/orders/Edit.vue';
// Categories
import CategoryMain from './views/pages/category/Main.vue';
import NewCategory from './views/pages/category/New.vue';
import CategoriesList from './views/pages/category/List.vue';
import CategoriesEdit from './views/pages/category/Edit.vue';
// posts
import postsMain from './views/pages/posts/Main.vue';
import NewPosts from './views/pages/posts/New.vue';
import postsList from './views/pages/posts/List.vue';
import postsEdit from './views/pages/posts/Edit.vue';
// products
import productsMain from './views/pages/products/Main.vue';
import Newproducts from './views/pages/products/New.vue';
import productsList from './views/pages/products/List.vue';
import productsEdit from './views/pages/products/Edit.vue';
// area
import areaMain from './views/pages/area/Main.vue';
import Newarea from './views/pages/area/New.vue';
import areaiesList from './views/pages/area/List.vue';
import areaiesEdit from './views/pages/area/Edit.vue';
// Ingedients
import IngredientMain from './views/pages/ingredient/Main.vue';
import NewIngredient from './views/pages/ingredient/New.vue';
import IngredientsList from './views/pages/ingredient/List.vue';
// Pharmacy 
import PharmacyMain from './views/pages/pharmacy/Main.vue';
import NewPharmacy from './views/pages/pharmacy/New.vue';
import PharmacyList from './views/pages/pharmacy/List.vue';
import PharmacyEdit from './views/pages/pharmacy/Edit.vue';
// inventory 
import inventoryMain from './views/pages/inventory/Main.vue';
import Newinventory from './views/pages/inventory/New.vue';
import inventoryList from './views/pages/inventory/List.vue';
import inventoryEdit from './views/pages/inventory/Edit.vue';
// client  
import clientMain from './views/pages/client/Main.vue';
import Newclient from './views/pages/client/New.vue';
import clientList from './views/pages/client/List.vue';
import clientEdit from './views/pages/client/Edit.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () =>
                import ('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    name: 'home',
                    component: () =>
                        import ('./views/Home.vue'),
                    meta: {
                        requiresAuth: true

                    }
                },
                {
                    path: '/pharmacy',
                    component: PharmacyMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: NewPharmacy
                        },
                        {
                            name: "edit-pharmacy",
                            path: 'edit',
                            component: PharmacyEdit
                        },
                        {
                            path: '/',
                            component: PharmacyList
                        },

                    ]
                },


                {
                    path: '/inventory',
                    component: inventoryMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            name: 'new',

                            path: 'new',
                            component: Newinventory
                        },
                        {
                            path: '/',
                            name: 'inventory-new',

                            component: inventoryList
                        },
                        {
                            name: 'edit-inventory',

                            path: 'edit',
                            component: inventoryEdit
                        },

                    ]
                },
                {
                    path: '/client',
                    component: clientMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            name: 'new',

                            path: 'new',
                            component: Newclient
                        },
                        {
                            path: '/',

                            component: clientList
                        },
                        {
                            name: 'edit-client',

                            path: 'edit',
                            component: clientEdit
                        },

                    ]
                },

                {
                    path: '/category',
                    component: CategoryMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: NewCategory
                        },
                        {
                            name: "edit-category",
                            path: 'edit',
                            component: CategoriesEdit
                        },
                        {
                            path: '/',
                            component: CategoriesList
                        },

                    ]
                },

                {
                    path: '/post',
                    component: postsMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: NewPosts
                        },
                        {
                            name: "edit-post",
                            path: 'edit',
                            component: postsEdit
                        },
                        {
                            path: '/',
                            component: postsList
                        },

                    ]
                },
                {
                    path: '/area',
                    component: areaMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: Newarea
                        },
                        {
                            name: "edit-area",
                            path: 'edit',
                            component: areaiesEdit
                        },
                        {
                            path: '/',
                            component: areaiesList
                        },

                    ]
                },
                {
                    path: '/products',
                    component: productsMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: Newproducts
                        },
                        {
                            name: "edit-products",
                            path: 'edit',
                            component: productsEdit
                        },
                        {
                            path: '/',
                            component: productsList
                        },

                    ]
                },
                {
                    path: '/products',
                    component: productsMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            path: 'new',
                            component: Newproducts
                        },
                        {
                            name: "edit-products",
                            path: 'edit',
                            component: productsEdit
                        },
                        {
                            path: '/',
                            component: productsList
                        },

                    ]
                },
                {
                    path: '/orders',
                    component: ordersMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        // {
                        //   path: 'new',
                        //   component: Neworders
                        // },
                        {
                            name: "edit-orders",
                            path: 'edit',
                            component: ordersEdit
                        },
                        {
                            path: '/',
                            component: ordersList
                        },

                    ]
                },
                {
                    path: '/ingredient',
                    name: 'ingredient',

                    component: IngredientMain,
                    meta: {
                        requiresAuth: true
                    },
                    children: [{
                            name: 'ingredient-new',

                            path: 'new',
                            component: NewIngredient
                        },
                        {
                            path: '/',
                            component: IngredientsList
                        },

                    ]
                },
            ],
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () =>
                import ('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '/login',
                    name: 'page-login',
                    component: () =>
                        import ('@/views/pages/Login.vue')
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () =>
                        import ('@/views/pages/Error404.vue')
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router