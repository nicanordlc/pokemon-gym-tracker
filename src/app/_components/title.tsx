import classNames from "classnames";

export function Title({ className }: { className: string }) {
  return (
    <h1
      className={classNames(
        "text-5xl font-extrabold tracking-tight sm:text-[5rem]",
        className,
      )}
    >
      Pokemon <span className="text-c-red">G</span>
      <span className="text-c-red">Y</span>
      <span className="text-c-red">M</span> Tracker
    </h1>
  );
}
