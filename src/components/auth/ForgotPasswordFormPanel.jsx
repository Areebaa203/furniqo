"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import AuthLegalFootnote from "@/components/auth/AuthLegalFootnote";
import { cn } from "@/lib/utils";

const GREEN = "#1a3021";
const BORDER = "#d4d0c6";

export default function ForgotPasswordFormPanel() {
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");

    const res = await fetch("/api/auth/forgot-password", {
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
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center bg-[#F9F7F0] px-5 py-10 sm:px-8 sm:py-12 md:w-1/2 md:max-w-none md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-home-heading text-[1.875rem] leading-tight tracking-tight text-[#1a3021] sm:text-[2.125rem]">
          Forgot password?
        </h1>
        <p className="font-home-body mt-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
          Enter your email address to receive a password reset link.
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
            <span>
              We’ve sent a password reset link to your email. Check your inbox and follow the link to continue.
            </span>
          </div>
        ) : null}

        {!successMsg ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="forgot-email" className="sr-only">
                Email address
              </label>
              <input
                id="forgot-email"
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className={cn(
                  "font-home-body w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                )}
                style={{ borderColor: errors.email ? "#dc2626" : BORDER }}
              />
              {errors.email ? (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-home-sub mt-2 flex min-h-[3rem] w-full items-center justify-center rounded-md py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:opacity-95 disabled:opacity-60 sm:text-xs"
              style={{ backgroundColor: GREEN }}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" />
                  Sending…
                </span>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        ) : null}

        <p className="font-home-body mt-8 text-center text-sm text-neutral-600">
          <Link href="/login" className="font-medium text-[#1a3021] underline-offset-4 hover:underline">
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
