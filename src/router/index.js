import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/UserLayoutView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/UserHomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/UserProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/UserCartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/AdminDashboardView.vue'),
    children: [{
      path: 'Login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: 'products',
      component: () => import('../views/AdminProductsView.vue'),
    },
    {
      path: 'order',
      component: () => import('../views/AdminOrderView.vue'),
    },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
