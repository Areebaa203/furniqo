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

export default function AccountEditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = React.useState({
    firstName: profile?.fullName?.split(" ")[0] || "",
    lastName: profile?.fullName?.split(" ")[1] || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.fullName?.split(" ")[0] || "",
        lastName: profile.fullName?.split(" ")[1] || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...profile,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
    });
    onClose();
  };

  const inputContainerClasses = "flex flex-col rounded-[8px] border bg-white/40 px-4 py-2 transition-all focus-within:border-[#26362e] focus-within:bg-white/60";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[calc(100%-2rem)] rounded-sm border bg-[#fcfaf4] p-0 shadow-2xl outline-none ring-0 focus:outline-none focus:ring-0 sm:h-[397px] sm:w-[586px] sm:max-w-none"
        showCloseButton={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-full flex-col p-6 sm:px-10 sm:py-8">
          <DialogHeader>
            <DialogTitle className="font-home-heading text-[2.1rem] font-normal leading-tight text-[#1a251f]">
              Edit profile
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col">
            <div className="flex-1 space-y-3.5">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                  <label className="font-home-body text-[11px] text-[#777777]">
                    First name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none"
                  />
                </div>
                <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                  <label className="font-home-body text-[11px] text-[#777777]">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none"
                  />
                </div>
              </div>

              <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                <label className="font-home-body text-[11px] text-[#777777]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none"
                />
              </div>
              <p className="text-[11px] text-[#777777]">
                This email is used for sign-in and order updates.
              </p>

              <div className={inputContainerClasses} style={{ borderColor: BORDER }}>
                <label className="font-home-body text-[11px] text-[#777777]">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[15px] text-[#1a251f] outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex h-[42px] w-full items-center justify-center rounded-[6px] bg-[#26362e] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90 sm:w-[100px]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-[42px] w-full items-center justify-center rounded-[6px] border border-[#d4d0c6] bg-[#f8f6f0] font-home-sub text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a251f] transition hover:bg-[#1a251f]/5 sm:w-[120px]"
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



