import { clsx } from "clsx";

export function LoadSpinner({ className }) {
  return (
    <div
      className={clsx(
        className,
        `inline-block h-8 w-8 animate-spin rounded-full 
        border-4 border-solid border-current border-r-transparent align-[-0.125em] 
        text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]`
      )}
      role="status"
    >
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap 
      !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
  );
}
