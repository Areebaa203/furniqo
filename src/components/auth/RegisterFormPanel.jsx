"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { signUpSchema } from "@/lib/validations/auth";
import { useToast } from "@/hooks/use-toast";

const GREEN = "#1a3021";
const BORDER = "#d4d0c6";

export default function RegisterFormPanel() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      marketingOptOut: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setServerError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!json.success) {
      setServerError(json.message || "Something went wrong. Please try again.");
      return;
    }

    toast({
      title: "Success",
      description: json.message || "Account created successfully.",
    });

    router.push("/login");
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center bg-[#F9F7F0] px-5 py-10 sm:px-8 sm:py-12 md:w-1/2 md:max-w-none md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-home-heading text-[1.875rem] leading-tight tracking-tight text-[#1a3021] sm:text-[2.125rem]">
          Create an account
        </h1>

        {serverError ? (
          <div
            className="mt-6 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800"
            role="alert"
          >
            <Icon icon="mingcute:warning-line" className="size-5 shrink-0" />
            {serverError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="reg-first" className="sr-only">
                First name
              </label>
              <input
                id="reg-first"
                {...register("firstName")}
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                className="font-home-body w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                style={{ borderColor: BORDER }}
              />
              {errors.firstName ? (
                <p className="text-xs text-red-600">{errors.firstName.message}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="reg-last" className="sr-only">
                Last name
              </label>
              <input
                id="reg-last"
                {...register("lastName")}
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                className="font-home-body w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
                style={{ borderColor: BORDER }}
              />
              {errors.lastName ? (
                <p className="text-xs text-red-600">{errors.lastName.message}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="sr-only">
              Email
            </label>
            <input
              id="reg-email"
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Email"
              className="font-home-body w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-[#1a3021] outline-none transition placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
              style={{ borderColor: BORDER }}
            />
            {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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

          <label className="flex cursor-pointer items-start gap-3 pt-1">
            <input
              {...register("marketingOptOut")}
              type="checkbox"
              className="mt-1 size-4 shrink-0 rounded border border-[#c9c4bb] text-[#1a3021] focus:ring-[#1a3021]/30"
            />
            <span className="font-home-body text-[13px] leading-relaxed text-neutral-700 sm:text-sm">
              Opt out of Furniqo&apos;s marketing emails packed with exciting news and offers
            </span>
          </label>

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
                  Creating account…
                </span>
              ) : (
                "Join now"
              )}
            </button>

            <Link
              href="/login"
              className="font-home-sub flex min-h-[3rem] w-full items-center justify-center rounded-md border border-[#c9c4bb] bg-[#ebe7df] py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a3021] transition hover:bg-[#e0dcd4] sm:text-xs"
            >
              Back to sign in
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
