import clsx from "clsx";
import { US, RU, CN, JP, GB } from "country-flag-icons/react/3x2";

export function Game({ className }) {
  return (
    <div
      className={clsx(className, "max-w-lg flex flex-col justify-center pt-40")}
    >
      <h1>Hello Мир</h1>
      <div className="flex h-12 mt-5 gap-2">
        <US /> <RU /> <CN /> <JP /> <GB />
      </div>
    </div>
  );
}
