"use client";

import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { JoinTrainer } from "~/app/_components/ui/join-trainer";
import { Title } from "~/app/_components/title";
import { usePathname } from "next/navigation";
import { useApp } from "~/app/_hooks/app";
import { useEffect } from "react";
import { TrainersBadges } from "~/app/_components/ui/trainers-badges";
import { api } from "~/trpc/react";

export default function Session() {
  const { setSession } = useApp();
  const sessionId = usePathname().split("/")[1] ?? "";

  const getTrainers = api.trainer.getTrainers.useQuery(
    { sessionId },
    { refetchInterval: 1000 },
  );

  useEffect(() => {
    setSession({ id: sessionId });
  }, [sessionId]);

  const badgesProps: BadgesProps = {
    className: "h-full w-full self-start lg:gap-2",
    classNameBadgesRow: "md:grid-cols-8",
    badgesSize: "md:size-8 lg:size-10",
  };

  return (
    <main className="grid grid-cols-1 justify-items-center gap-y-4 ">
      <Title className="text-center sm:col-span-full " />

      <div className="grid w-fit items-center  justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
        <Badges init {...badgesProps} />

        <JoinTrainer
          className="min-w-[280px] lg:col-span-2 "
          inputClassName="grow min-h-[40px]"
          sessionId={sessionId}
        />

        <TrainersBadges trainers={getTrainers.data} {...badgesProps} />
      </div>
    </main>
  );
}
