import { Badges } from "~/app/_components/badges";
import { CreateSession } from "~/app/_components/create-session";
import { Title } from "~/app/_components/title";

export default async function Home() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4 ">
      <Title className="text-center" />

      <Badges />

      <CreateSession />
    </div>
  );
}
