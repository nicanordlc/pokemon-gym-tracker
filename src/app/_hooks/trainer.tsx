import { useEffect, useState } from "react";
import { useTrainerStore } from "~/app/_store/trainer";

export function useTrainer() {
  const [mounted, setMounted] = useState(false);

  const trainers = useTrainerStore(({ trainers }) => trainers);

  const setTrainer = useTrainerStore(({ setTrainer }) => setTrainer);
  const setBadge = useTrainerStore(({ setBadge }) => setBadge);
  const updateName = useTrainerStore(({ updateName }) => updateName);

  useEffect(() => {
    async function rehydrate() {
      await useTrainerStore.persist.rehydrate();
    }

    rehydrate().catch((e) => {
      console.error(e);
    });

    setMounted(true);
  }, []);

  return { trainers, setTrainer, mounted, setBadge, updateName };
}
