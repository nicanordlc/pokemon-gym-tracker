import { useEffect, useState } from "react";
import { useTrainerStore } from "~/app/_store/trainer";

export function useTrainer() {
  const [mounted, setTrainerMounted] = useState(false);

  const trainer = useTrainerStore((trainer) => trainer);

  const setTrainer = useTrainerStore(({ setTrainer }) => setTrainer);
  const setBadge = useTrainerStore(({ setBadge }) => setBadge);

  useEffect(() => {
    setTrainerMounted(true);
  }, []);

  return { trainer, setTrainer, mounted, setBadge };
}
