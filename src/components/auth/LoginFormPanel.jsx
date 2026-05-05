"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { signInSchema } from "@/lib/validations/auth";

const GREEN = "#1a3021";
const BORDER = "#d4d0c6";

const POST_AUTH_PATH = "/account/orders";

export default function LoginFormPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const urlError = searchParams.get("error");
  const nextParam = searchParams.get("next");
  const safeNext =
    typeof nextParam === "string" && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : null;
  const shownError = urlError || formError;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setFormError("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!json.success) {
      setFormError(json.message);
      return;
    }

    router.push(safeNext ?? json.redirectTo ?? POST_AUTH_PATH);
    router.refresh();
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center bg-[#F9F7F0] px-5 py-10 sm:px-8 sm:py-12 md:w-1/2 md:max-w-none md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-home-heading text-[1.875rem] leading-tight tracking-tight text-[#1a3021] sm:text-[2.125rem]">
          Sign in
        </h1>

        {shownError ? (
          <div
            className="mt-6 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
            role="alert"
          >
            <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
            {shownError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <input
              id="login-email"
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Email"
              className="font-home-body w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
              style={{ borderColor: BORDER }}
            />
            {errors.email ? (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="font-home-body w-full rounded-md border bg-white py-3.5 pl-4 pr-12 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                style={{ borderColor: BORDER }}
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
          </div>

          <div className="pt-0.5">
            <Link
              href="/forgot-password"
              className="font-home-body text-sm font-medium text-[#1a3021] underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-home-sub flex min-h-[3rem] w-full items-center justify-center rounded-md py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:opacity-95 disabled:opacity-60 sm:text-xs"
              style={{ backgroundColor: GREEN }}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <Link
              href="/register"
              className="font-home-sub flex min-h-[3rem] w-full items-center justify-center rounded-md border border-[#c9c4bb] bg-[#faf7f2] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a3021] transition hover:bg-[#f0ebe3] sm:text-xs"
            >
              Create an account
            </Link>
          </div>
        </form>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
