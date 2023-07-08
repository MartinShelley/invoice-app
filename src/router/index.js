import { createRouter, createWebHistory } from 'vue-router';
import invoicesPage from '@/views/invoicesPage.vue';
import invoiceDetail from '@/views/invoiceDetail.vue';

const routes = [
  {
    path: '/',
    component: invoicesPage
  },
  {
    path: '/invoice/:id',
    component: invoiceDetail,
    params: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
