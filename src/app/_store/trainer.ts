import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type Trainer } from "@prisma/client";
import { immer } from "zustand/middleware/immer";
import { updateTrainerBadge } from "~/utils/update-trainer-badge";
import { type TrainerUpdateBadges } from "~/types";
import { mapPokemonVersionToDb } from "~/trpc/map-pokemon-version-to-db";

type TrainerState = Trainer

interface TrainerActions {
  setTrainer: (trainer: Trainer) => void;
  setBadge: (props: Omit<TrainerUpdateBadges, 'id'>) => void;
  updateName: (props: { name: string }) => void;
}

export const useTrainerStore = create<TrainerState & TrainerActions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          id: "",
          badgesCrystal: "",
          badgesEmerald: "",
          badgesRed: "",
          name: "",
          createdAt: new Date(),
          updatedAt: new Date(),

          setTrainer: (trainer) =>
            set(() => ({ ...trainer })),

          setBadge: ({ version, badgeNumber, remove }) =>
            set((state) => {
              const trainerCurrentBadges = state[mapPokemonVersionToDb(version)];

              const updatedBadges = updateTrainerBadge({
                badges: trainerCurrentBadges ?? "",
                badgeNumber,
                remove,
              });

              state[mapPokemonVersionToDb(version)] = updatedBadges;
            }),

          updateName: ({ name }) => set((state) => {
            state.name = name
          }),
        }),

        { name: "trainerStore", skipHydration: true },
      ),
    ),
  ),
);
