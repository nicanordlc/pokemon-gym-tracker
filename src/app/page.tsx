import classNames from "classnames";
import { Badges } from "~/app/_components/badges";

export default async function Home() {
  return (
    <main
      className={classNames(
        "p-gutter sm:px-gutter-sm flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-white",
        "items-center justify-center gap-12",
      )}
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Pokemon <span className="text-c-red">G</span>
        <span className="text-c-red">Y</span>
        <span className="text-c-red">M</span> Tracker
      </h1>

      <div
        className={classNames(
          "container flex flex-col items-center justify-center ",
        )}
      >
        <Badges />
      </div>
    </main>
  );
}
