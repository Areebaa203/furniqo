"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BORDER = "#d4d0c6";

export default function AccountChangePasswordModal({ isOpen, onClose, onForgotClick }) {
  const { toast } = useToast();
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    if (!isOpen) return;
    setServerError("");
    setFieldErrors({});
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError("");
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          password: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        if (json.errors && typeof json.errors === "object") {
          setFieldErrors(json.errors);
          const hasField = Object.keys(json.errors).some(
            (k) => Array.isArray(json.errors[k]) && json.errors[k].length > 0
          );
          if (hasField) {
            setServerError("");
            return;
          }
        }
        setServerError(json.message || "Something went wrong. Please try again.");
        return;
      }

      toast({
        title: "Password updated",
        description: json.message || "Your password has been saved.",
      });
      onClose();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputContainerClasses =
    "flex flex-col rounded-[8px] border bg-white/40 px-4 py-2 transition-all focus-within:border-[#26362e] focus-within:bg-white/60 relative";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[calc(100%-2rem)] rounded-sm border bg-[#fcfaf4] p-0 shadow-2xl outline-none ring-0 focus:outline-none focus:ring-0 sm:min-h-[480px] sm:w-[586px] sm:max-w-none"
        showCloseButton={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col p-6 sm:px-10 sm:py-8">
          <DialogHeader>
            <DialogTitle className="font-home-heading text-[2.1rem] font-normal leading-tight text-[#1a251f]">
              Change password
            </DialogTitle>
          </DialogHeader>

          {serverError && !Object.keys(fieldErrors).length ? (
            <div
              className="mt-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
              role="alert"
            >
              <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
              {serverError}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col">
            <div className="flex-1 space-y-4">
              <div>
                <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                  <label className="font-home-body text-[11px] text-[#777777]">
                    Current password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      autoComplete="current-password"
                      disabled={submitting}
                      className="flex-1 bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="ml-2 text-[#777777] hover:text-[#1a251f]"
                      aria-label={showCurrent ? "Hide password" : "Show password"}
                    >
                      <Icon icon={showCurrent ? "lucide:eye-off" : "lucide:eye"} className="size-4" />
                    </button>
                  </div>
                </div>
                {fieldErrors.currentPassword?.[0] ? (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.currentPassword[0]}</p>
                ) : null}
              </div>

              <div>
                <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                  <label className="font-home-body text-[11px] text-[#777777]">
                    New password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      disabled={submitting}
                      className="flex-1 bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="ml-2 text-[#777777] hover:text-[#1a251f]"
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      <Icon icon={showNew ? "lucide:eye-off" : "lucide:eye"} className="size-4" />
                    </button>
                  </div>
                </div>
                {fieldErrors.password?.[0] ? (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.password[0]}</p>
                ) : null}
              </div>

              <div>
                <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                  <label className="font-home-body text-[11px] text-[#777777]">
                    Confirm new password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      disabled={submitting}
                      className="flex-1 bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="ml-2 text-[#777777] hover:text-[#1a251f]"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      <Icon icon={showConfirm ? "lucide:eye-off" : "lucide:eye"} className="size-4" />
                    </button>
                  </div>
                </div>
                {fieldErrors.confirmPassword?.[0] ? (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword[0]}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onForgotClick}
                disabled={submitting}
                className="text-[13px] font-medium text-[#1a251f] underline underline-offset-4 transition hover:text-[#26362e] disabled:opacity-50"
              >
                Forgot your password?
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="flex h-[42px] w-full items-center justify-center rounded-[6px] bg-[#26362e] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60 sm:w-[100px]"
              >
                {submitting ? (
                  <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" aria-hidden />
                ) : (
                  "Save"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
