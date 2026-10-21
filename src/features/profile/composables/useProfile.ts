import { ref } from 'vue'

import { mockProfile } from '@/mocks/profile.mock'

import type {
  UpdateProfilePayload,
  UserProfile,
} from '@/features/profile/types/profile'

const profile = ref<UserProfile>({
  ...mockProfile,
})

function updateProfile(
  payload: UpdateProfilePayload,
): void {
  profile.value = {
    ...profile.value,
    ...payload,
  }
}

export function useProfile() {
  return {
    profile,
    updateProfile,
  }
}
