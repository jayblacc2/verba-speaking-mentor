import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../lib/utils";

const typeStyles: Record<string, { container: string; icon: string; iconName: string }> = {
  success: {
    container: "bg-secondary-container border-secondary/20 text-on-secondary-container",
    icon: "bg-secondary text-on-secondary",
    iconName: "check_circle",
  },
  error: {
    container: "bg-error-container border-error/20 text-on-error-container",
    icon: "bg-error text-on-error",
    iconName: "error",
  },
  warning: {
    container: "bg-tertiary-container border-tertiary/20 text-on-tertiary-container",
    icon: "bg-tertiary text-on-tertiary",
    iconName: "warning",
  },
  info: {
    container: "bg-primary-container border-primary/20 text-on-primary-container",
    icon: "bg-primary text-on-primary",
    iconName: "info",
  },
};

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const styles = typeStyles[toast.type] || typeStyles.info;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm",
                styles.container
              )}
              role="alert"
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  styles.icon
                )}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {styles.iconName}
                </span>
              </div>
              <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100 hover:bg-black/5"
                aria-label="Dismiss notification"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  close
                </span>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
