import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Cuando implementemos autenticación:
// import { useAuthStore } from '@/features/auth/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Landing
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/auth/pages/WelcomePage.vue'),
    },

    // Rutas públicas de autenticación
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/features/auth/pages/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/features/auth/pages/RegisterPage.vue'),
        },
      ],
    },

    // Rutas privadas de la aplicación
    {
      path: '/',
      component: AppLayout,

      // Preparado para cuando implementemos autenticación
      // meta: { requiresAuth: true },

      children: [
        {
          path: 'games',
          name: 'games',
          component: () => import('@/features/catalog/pages/CatalogPage.vue'),
        },
        {
          path: 'games/:provider/:externalId',
          name: 'game-detail',
          component: () => import('@/features/catalog/pages/GameDetailPage.vue'),
        },
        {
          path: 'library',
          name: 'library',
          component: () => import('@/features/library/pages/LibraryPage.vue'),
        },
        {
          path: 'profile/edit',
          name: 'profile-edit',
          component: () => import('@/features/profile/pages/EditProfilePage.vue'),
        },
        {
          path: 'profile/:username',
          name: 'profile',
          component: () => import('@/features/profile/pages/ProfilePage.vue'),
        },
      ],
    },
  ],
})

/*
 * GUARD DE AUTENTICACIÓN
 *
 * Lo activaremos cuando tengamos:
 *
 * features/auth/stores/auth.store.ts
 *
 * y podamos saber si existe realmente una sesión.
 *
 * router.beforeEach(async (to) => {
 *   const authStore = useAuthStore()
 *
 *   if (!authStore.initialized) {
 *     await authStore.initializeSession()
 *   }
 *
 *   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
 *     return {
 *       name: 'login',
 *       query: {
 *         redirect: to.fullPath,
 *       },
 *     }
 *   }
 * })
 */

export default router
