import { computed, ref } from 'vue'

import { useProfile } from '@/features/profile/composables/useProfile'

import type { AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types/auth'

interface LocalAccount extends AuthUser {
  password: string
}

const accounts = ref<LocalAccount[]>([
  {
    username: 'luis',
    email: 'luis@biblioteca-vg.local',
    password: 'password123',
  },
])

const user = ref<AuthUser>()

const isAuthenticated = computed(() => Boolean(user.value))

function login(payload: LoginPayload): AuthUser {
  const normalizedEmail = payload.email.trim().toLowerCase()

  const account = accounts.value.find((account) => account.email.toLowerCase() === normalizedEmail)

  if (!account || account.password !== payload.password) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const authenticatedUser: AuthUser = {
    username: account.username,
    email: account.email,
  }

  user.value = authenticatedUser

  return authenticatedUser
}

function register(payload: RegisterPayload): AuthUser {
  const normalizedUsername = payload.username.trim().toLowerCase()

  const normalizedEmail = payload.email.trim().toLowerCase()

  const emailAlreadyExists = accounts.value.some(
    (account) => account.email.toLowerCase() === normalizedEmail,
  )

  if (emailAlreadyExists) {
    throw new Error('EMAIL_ALREADY_EXISTS')
  }

  const usernameAlreadyExists = accounts.value.some(
    (account) => account.username.toLowerCase() === normalizedUsername,
  )

  if (usernameAlreadyExists) {
    throw new Error('USERNAME_ALREADY_EXISTS')
  }

  const account: LocalAccount = {
    username: normalizedUsername,
    email: normalizedEmail,
    password: payload.password,
  }

  accounts.value.push(account)

  const authenticatedUser: AuthUser = {
    username: account.username,
    email: account.email,
  }

  user.value = authenticatedUser

  const { profile, updateProfile } = useProfile()

  updateProfile({
    username: authenticatedUser.username,
    bio: profile.value.bio,
    avatarUrl: profile.value.avatarUrl,
    bannerUrl: profile.value.bannerUrl,
    libraryVisibility: profile.value.libraryVisibility,
  })

  return authenticatedUser
}

function logout(): void {
  user.value = undefined
}

export function useAuth() {
  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
