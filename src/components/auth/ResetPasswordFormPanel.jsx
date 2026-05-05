"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { resetPasswordSchema } from "@/lib/validations/auth";
import AuthLegalFootnote from "@/components/auth/AuthLegalFootnote";
import { cn } from "@/lib/utils";

const GREEN = "#1a3021";
const BORDER = "#d4d0c6";

function PasswordRule({ met, label }) {
  return (
    <p
      className={cn(
        "font-home-body flex items-center gap-2 text-[13px] sm:text-sm",
        met ? "text-emerald-700" : "text-neutral-500"
      )}
    >
      {met ? (
        <Icon icon="mingcute:check-circle-fill" className="size-4 shrink-0 text-emerald-600" aria-hidden />
      ) : (
        <span className="size-4 shrink-0 rounded-full border border-neutral-300" aria-hidden />
      )}
      {label}
    </p>
  );
}

export default function ResetPasswordFormPanel() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const pwd = watch("password") ?? "";

  const rules = useMemo(() => {
    return {
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      len: pwd.length >= 8,
      num: /[0-9]/.test(pwd),
    };
  }, [pwd]);

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!json.success) {
      setServerError(json.message);
      return;
    }

    setSuccessMsg(json.message);
    setTimeout(() => {
      router.push("/account/orders");
    }, 2000);
  };

  const confirmErr = errors.confirmPassword;

  return (
    <div className="flex w-full flex-1 flex-col justify-center bg-[#F9F7F0] px-5 py-10 sm:px-8 sm:py-12 md:w-1/2 md:max-w-none md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-home-heading text-[1.875rem] leading-tight tracking-tight text-[#1a3021] sm:text-[2.125rem]">
          Reset password
        </h1>
        <p className="font-home-body mt-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
          Enter a new password for your account.
        </p>

        {serverError ? (
          <div
            className="mt-6 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
            role="alert"
          >
            <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
            {serverError}
          </div>
        ) : null}
        {successMsg ? (
          <div
            className="mt-6 flex items-start gap-2 rounded-md border border-emerald-200/80 bg-emerald-50/90 px-3 py-2.5 text-sm text-emerald-900"
            role="status"
          >
            <Icon icon="mingcute:check-circle-line" className="mt-0.5 size-5 shrink-0 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="reset-password" className="sr-only">
              New password
            </label>
            <div className="relative">
              <input
                id="reset-password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="New password"
                className="font-home-body w-full rounded-md border bg-white py-3.5 pl-4 pr-12 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                style={{ borderColor: errors.password ? "#dc2626" : BORDER }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 transition hover:text-[#1a3021]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                  className="size-5"
                />
              </button>
            </div>
            {errors.password ? (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            ) : null}
            <div className="space-y-1.5 pt-1">
              <PasswordRule met={rules.lower} label="1 lowercase letter" />
              <PasswordRule met={rules.upper} label="1 uppercase letter" />
              <PasswordRule met={rules.len} label="Minimum of 8 characters" />
              <PasswordRule met={rules.num} label="1 number" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reset-confirm" className="sr-only">
              Re-enter new password
            </label>
            <div className="relative">
              <input
                id="reset-confirm"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter new password"
                className="font-home-body w-full rounded-md border bg-white py-3.5 pl-4 pr-12 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                style={{ borderColor: confirmErr ? "#dc2626" : BORDER }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 transition hover:text-[#1a3021]"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  icon={showConfirmPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                  className="size-5"
                />
              </button>
            </div>
            {confirmErr ? (
              <p className="text-sm text-red-600">{confirmErr.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || Boolean(successMsg)}
            className="font-home-sub mt-2 flex min-h-[3rem] w-full items-center justify-center rounded-md py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:opacity-95 disabled:opacity-60 sm:text-xs"
            style={{ backgroundColor: GREEN }}
          >
            {isSubmitting || successMsg ? (
              <span className="inline-flex items-center gap-2">
                <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" />
                {successMsg ? "Redirecting…" : "Saving…"}
              </span>
            ) : (
              "Save new password"
            )}
          </button>
        </form>

        <p className="font-home-body mt-8 text-center text-sm text-neutral-600">
          <Link href="/login" className="inline-flex items-center justify-center gap-1 font-medium text-[#1a3021] underline-offset-4 hover:underline">
            <Icon icon="mingcute:arrow-left-line" className="size-4" aria-hidden />
            Back to sign in
          </Link>
        </p>

        <div className="mt-10">
          <AuthLegalFootnote />
        </div>
      </div>
    </div>
  );
}
