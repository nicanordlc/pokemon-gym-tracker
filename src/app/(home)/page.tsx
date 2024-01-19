"use client";

import { Badges } from "~/app/_components/ui/badges";
import { CreateSession } from "~/app/_components/create-session";
import { Title } from "~/app/_components/title";
import { ContextMenuBadge } from "~/app/_components/ui/context-menu/badge";
import { ModalBadgeInfo } from "~/app/_components/ui/modals/badge-info";
import { ModalProvider } from "~/app/_context/modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 ">
      <ModalProvider>
        <Title className="text-center" />

        <Badges classNameBadgesRow="sm:grid-cols-8 " init />

        <CreateSession />

        <ContextMenuBadge />
        <ModalBadgeInfo />
      </ModalProvider>
    </main>
  );
}
