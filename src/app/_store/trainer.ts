import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Trainer } from '@prisma/client';

interface TrainerState {
  trainer: Trainer,
}

interface TrainerActions {
  setTrainer: (trainer: Trainer) => void
}

export const useTrainerStore = create<TrainerState & TrainerActions>()(
  devtools(
    persist(
      (set) => ({
        trainer: {
          id: '',
          badgesCrystal: '',
          badgesEmerald: '',
          badgesRed: '',
          name: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        setTrainer: (trainer) => set(() => ({ trainer })),
      }),
      { name: 'trainerStore' },
    ),
  ),
)
