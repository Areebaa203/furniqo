"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { profileSchema } from "@/lib/validations/settings";

const GREEN = "#26362e";
const BORDER = "#d4d0c6";

export default function AccountProfileSettings() {
  const [status, setStatus] = useState({ loading: true, error: "", saved: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "", avatarUrl: "", phone: "" },
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/settings/profile");
        const json = await res.json();
        if (cancelled) return;
        if (!json.success) {
          setStatus((s) => ({
            ...s,
            loading: false,
            error: json.message || "Could not load profile.",
          }));
          return;
        }
        const d = json.data || {};
        reset({
          fullName: d.full_name ?? "",
          avatarUrl: d.avatar_url ?? "",
          phone: d.phone ?? "",
        });
        setStatus((s) => ({ ...s, loading: false }));
      } catch {
        if (!cancelled) {
          setStatus((s) => ({ ...s, loading: false, error: "Could not load profile." }));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reset]);

  const onSubmit = async (data) => {
    setStatus((s) => ({ ...s, error: "", saved: false }));
    const res = await fetch("/api/settings/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) {
      setStatus((s) => ({
        ...s,
        error: json.message || json.errors?.fieldErrors?.fullName?.[0] || "Update failed.",
      }));
      return;
    }
    setStatus((s) => ({ ...s, saved: true }));
  };

  if (status.loading) {
    return (
      <div className="flex items-center gap-2 py-16 text-[#555555]">
        <Icon icon="mingcute:loading-fill" className="size-6 animate-spin" aria-hidden />
        <span className="font-home-body text-sm">Loading profile…</span>
      </div>
    );
  }

  return (
    <section aria-labelledby="account-profile-heading">
      <h2
        id="account-profile-heading"
        className="font-home-body text-base font-semibold text-[#1a251f]"
      >
        Profile settings
      </h2>

      <p className="font-home-body mt-2 max-w-lg text-sm leading-relaxed text-[#555555]">
        Update the details we use for orders and support. To change your password, use{" "}
        <a
          href="/forgot-password"
          className="font-medium text-[#1a251f] underline underline-offset-2"
        >
          forgot password
        </a>
        .
      </p>

      {status.error ? (
        <div className="mt-6 flex items-center gap-2 rounded-md border border-red-200 bg-red-50/90 px-3 py-2.5 text-sm text-red-800">
          <Icon icon="mingcute:warning-line" className="size-5 shrink-0" aria-hidden />
          {status.error}
        </div>
      ) : null}

      {status.saved ? (
        <p className="mt-6 text-sm font-medium text-emerald-800">Your profile was saved.</p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-md space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="account-full-name"
            className="font-home-body text-sm font-medium text-[#1a251f]"
          >
            Full name
          </label>
          <input
            id="account-full-name"
            {...register("fullName")}
            className="font-home-body w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#1a251f] outline-none transition focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
            style={{ borderColor: BORDER }}
          />
          {errors.fullName ? (
            <p className="text-xs text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="account-phone" className="font-home-body text-sm font-medium text-[#1a251f]">
            Phone
          </label>
          <input
            id="account-phone"
            {...register("phone")}
            type="tel"
            className="font-home-body w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#1a251f] outline-none transition focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
            style={{ borderColor: BORDER }}
          />
          {errors.phone ? <p className="text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="account-avatar" className="font-home-body text-sm font-medium text-[#1a251f]">
            Avatar URL <span className="font-normal text-[#777777]">(optional)</span>
          </label>
          <input
            id="account-avatar"
            {...register("avatarUrl")}
            type="url"
            placeholder="https://"
            className="font-home-body w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#1a251f] outline-none transition focus-visible:ring-2 focus-visible:ring-[#1a3021]/20"
            style={{ borderColor: BORDER }}
          />
          {errors.avatarUrl ? (
            <p className="text-xs text-red-600">{errors.avatarUrl.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-home-sub mt-2 inline-flex min-h-[3rem] w-full items-center justify-center rounded-lg px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-92 disabled:opacity-60 sm:w-auto sm:min-w-[11rem]"
          style={{ backgroundColor: GREEN }}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Icon icon="mingcute:loading-fill" className="size-5 animate-spin" />
              Saving…
            </span>
          ) : (
            "Save changes"
          )}
        </button>
      </form>
    </section>
  );
}
