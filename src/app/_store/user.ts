import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  bears: number
}

interface UserActions {
  increase: (by: number) => void
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: 'bearStore' },
    ),
  ),
)
