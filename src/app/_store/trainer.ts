import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type Trainer } from "@prisma/client";
import { immer } from "zustand/middleware/immer";
import { updateTrainerBadge } from "~/utils/update-trainer-badge";
import { type TrainerUpdateBadges } from "~/types";
import { mapPokemonVersionToDb } from "~/utils/map-pokemon-version-to-db";

type TrainerState = {
  trainers: Trainer[];
};

interface TrainerActions {
  setTrainer: (props: { trainer: Trainer }) => void;
  setBadge: (
    props: Omit<TrainerUpdateBadges, "id"> & { sessionPath: string },
  ) => void;
  updateName: (props: { sessionPath: string; name: string }) => void;
}

export const useTrainerStore = create<TrainerState & TrainerActions>()(
  immer(
    devtools(
      persist(
        (set) => ({
          trainers: [],

          setTrainer: ({ trainer }) =>
            set((state) => {
              state.trainers = [trainer, ...state.trainers];
            }),

          setBadge: ({ sessionPath, version, badgeNumber, remove }) =>
            set((state) => {
              const targetTrainer = state.trainers.filter(({ sessionPath: _path }) => _path === sessionPath)[0];

              state.trainers.map((trainer) => {
                if (targetTrainer?.id !== trainer.id) {
                  return;
                }

                const trainerCurrentBadges =
                  trainer[mapPokemonVersionToDb(version)];

                const updatedBadges = updateTrainerBadge({
                  badges: trainerCurrentBadges ?? "",
                  badgeNumber,
                  remove,
                });

                trainer[mapPokemonVersionToDb(version)] = updatedBadges;
              })
            }),

          updateName: ({ sessionPath, name }) =>
            set((state) => {
              const targetTrainer = state.trainers.filter(({ sessionPath: _path }) => _path === sessionPath)[0];

              state.trainers.map((trainer) => {
                if (targetTrainer?.id !== trainer.id) {
                  return;
                }

                trainer.name = name;
              });
            }),
        }),

        { name: "trainerStore", skipHydration: true },
      ),
    ),
  ),
);
