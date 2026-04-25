import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  layout?: "vertical" | "horizontal";
}

export default function Logo({
  className,
  iconOnly = false,
  layout = "vertical",
}: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center text-primary",
        layout === "vertical" ? "flex-col" : "flex-row gap-3",
        className,
      )}
    >
      <img
        src="/verba-logo.png"
        alt="Verba"
        className={cn(
          "object-contain",
          iconOnly
            ? "w-full h-full"
            : layout === "horizontal"
              ? "w-10 h-10"
              : "w-14 h-14",
        )}
        onError={(e) => {
          // Fallback to inline SVG if the image file isn't present yet
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            svg.setAttribute("viewBox", "0 0 100 100");
            svg.setAttribute("fill", "none");
            svg.setAttribute(
              "class",
              iconOnly
                ? "w-full h-full"
                : layout === "horizontal"
                  ? "w-10 h-10"
                  : "w-14 h-14",
            );
            svg.innerHTML = `
              <path d="M 33 65 C 20 60 16 40 26 26 C 36 12 55 12 65 26" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none" />
              <path d="M 65 26 C 65 26 73 38 60 52 C 50 62 40 62 33 65 L 26 71 C 28 69 30 67 33 65 Z" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 30 55 C 38 52 45 42 50 28" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none" />
              <path d="M 52 57 L 58 57 L 62 40 L 68 70 L 73 53 L 78 55 L 85 55" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            `;
            parent.insertBefore(svg, target);
          }
        }}
      />
      {!iconOnly && (
        <span
          className={cn(
            "font-bold tracking-tight font-headline",
            layout === "horizontal" ? "text-xl" : "text-2xl mt-1",
          )}
        >
          verba
        </span>
      )}
    </div>
  );
}
