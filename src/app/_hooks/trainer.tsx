import { useEffect, useState } from "react";
import { useTrainerStore } from "~/app/_store/trainer";

export function useTrainer() {
  const [mounted, setMounted] = useState(false);

  const trainer = useTrainerStore((trainer) => trainer);

  const setTrainer = useTrainerStore(({ setTrainer }) => setTrainer);
  const setBadge = useTrainerStore(({ setBadge }) => setBadge);

  useEffect(() => {
    async function rehydrate() {
      await useTrainerStore.persist.rehydrate();
    }

    rehydrate().catch((e) => {
      console.error(e);
    });

    setMounted(true);
  }, []);

  return { trainer, setTrainer, mounted, setBadge };
}
