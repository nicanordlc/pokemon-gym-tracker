import { Badges } from "~/app/_components/ui/badges";
import { CreateSession } from "~/app/_components/create-session";
import { Title } from "~/app/_components/title";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 ">
      <Title className="text-center" />

      <Badges classNameBadgesRow="sm:grid-cols-8 " init />

      <CreateSession />
    </main>
  );
}
