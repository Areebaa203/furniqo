import { cn } from "@/lib/utils";

export default function AuthLegalFootnote({ className = "" }) {
  return (
    <p
      className={cn(
        "text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs",
        className
      )}
    >
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
