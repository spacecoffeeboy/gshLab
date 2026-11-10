import type { CSSProperties } from "react";
type IconName = "topics" | "shuffle" | "arrow" | "back" | "check";
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    topics: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    shuffle: (
      <>
        <path d="m17 3 4 4-4 4M3 17c6 0 8-10 14-10h4M17 13l4 4-4 4M3 7c2.6 0 4.4 1.8 6 4M15 16c1.5.8 3 1 6 1" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    back: <path d="M20 12H4m6-6-6 6 6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      className="icon"
      style={{ "--icon-size": `${size}px` } as CSSProperties}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
