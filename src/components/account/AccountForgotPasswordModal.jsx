"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BORDER = "#d4d0c6";

export default function AccountForgotPasswordModal({ isOpen, onClose, email }) {
  const [isSent, setIsSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: email || "",
  });

  React.useEffect(() => {
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [email]);

  React.useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setIsSent(false);
        setServerError("");
      }, 300);
      return () => clearTimeout(t);
    }
    setServerError("");
    return undefined;
  }, [isOpen]);

  const sendLink = async (targetEmail) => {
    setServerError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail.trim() }),
      });

      const json = await res.json();

      if (!json.success) {
        setServerError(json.message || "Could not send the email. Please try again.");
        return;
      }

      setIsSent(true);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLink(formData.email);
  };

  const handleResend = () => {
    sendLink(formData.email);
  };

  const inputContainerClasses =
    "flex flex-col rounded-[8px] border bg-white/40 px-4 py-2 transition-all focus-within:border-[#26362e] focus-within:bg-white/60";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[calc(100%-2rem)] rounded-sm border bg-[#fcfaf4] p-0 shadow-2xl outline-none ring-0 focus:outline-none focus:ring-0 sm:min-h-[300px] sm:w-[586px] sm:max-w-none"
        showCloseButton={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col p-6 sm:px-10 sm:py-8">
          {!isSent ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-home-heading text-[2.1rem] font-normal leading-tight text-[#1a251f]">
                  Forgot your password?
                </DialogTitle>
                <p className="mt-1 text-[14px] text-[#4a524a]">
                  Enter your email address to receive a password reset link.
                </p>
              </DialogHeader>

              {serverError ? (
                <div
                  className="mt-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
                  role="alert"
                >
                  <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
                  {serverError}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col">
                <div className="flex-1">
                  <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                    <label className="font-home-body text-[11px] text-[#777777]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        setServerError("");
                      }}
                      autoComplete="email"
                      disabled={submitting}
                      className="bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-[42px] w-full items-center justify-center rounded-[6px] bg-[#26362e] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60 sm:w-[130px]"
                  >
                    {submitting ? (
                      <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" aria-hidden />
                    ) : (
                      "Send link"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onClose()}
                    disabled={submitting}
                    className="flex h-[42px] w-full items-center justify-center rounded-[6px] border border-[#d4d0c6] bg-[#f8f6f0] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a251f] transition hover:bg-[#1a251f]/5 disabled:opacity-60 sm:w-[120px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex h-full flex-col justify-center">
              <DialogHeader>
                <DialogTitle className="font-home-heading text-[2.1rem] font-normal leading-tight text-[#1a251f]">
                  Check your email
                </DialogTitle>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4a524a]">
                  If an account exists for <span className="font-medium text-[#1a251f]">{formData.email}</span>,
                  we&apos;ve sent a link to reset your password. Follow the link in the message to continue.
                </p>
              </DialogHeader>

              {serverError ? (
                <div
                  className="mt-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
                  role="alert"
                >
                  <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
                  {serverError}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={submitting}
                  className="flex h-[42px] w-full items-center justify-center rounded-[6px] border border-[#d4d0c6] bg-[#f8f6f0] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a251f] transition hover:bg-[#1a251f]/5 disabled:opacity-60 sm:w-[140px]"
                >
                  {submitting ? (
                    <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" aria-hidden />
                  ) : (
                    "Resend link"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
