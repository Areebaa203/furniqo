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

export default function AccountAddAddressModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = React.useState({
    isDefault: false,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    zipCode: "",
    city: "",
    state: "",
    country: "United States",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const inputContainerClasses = "flex flex-col rounded-[8px] border bg-white/40 px-4 py-1 transition-all focus-within:border-[#26362e] focus-within:bg-white/60 h-[50px] justify-center";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[calc(100%-2rem)] rounded-sm border bg-[#fcfaf4] p-0 shadow-2xl outline-none ring-0 focus:outline-none focus:ring-0 sm:h-[510px] sm:w-[556px] sm:max-w-none"
        showCloseButton={true}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col p-6 sm:px-[25px] sm:py-8">
          <DialogHeader>
            <DialogTitle className="font-home-heading text-[1.8rem] font-normal leading-tight text-[#1a251f] sm:text-[2.1rem]">
              Add address
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3 sm:space-y-3.5">
            <label className="mb-2 flex items-center gap-2 cursor-pointer group w-fit">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="hidden"
              />
              <div className={`size-4 rounded-sm border border-[#d4d0c6] flex items-center justify-center transition-colors ${formData.isDefault ? 'bg-[#26362e] border-[#26362e]' : 'bg-[#f8f6f0]'}`}>
                {formData.isDefault && <Icon icon="mingcute:check-fill" className="text-white size-3" />}
              </div>
              <span className="text-[14px] font-medium text-[#1a251f]">This is my default address</span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-[16px]">
              <div className={inputContainerClasses} style={{ borderColor: BORDER, width: '100%', maxWidth: '100%' }}>
                <label className="font-home-body text-[11px] text-[#777777] sm:max-w-[253px]">First name</label>
                <input
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
                />
              </div>
              <div className={inputContainerClasses} style={{ borderColor: BORDER, width: '100%', maxWidth: '100%' }}>
                <label className="font-home-body text-[11px] text-[#777777] sm:max-w-[253px]">Last name</label>
                <input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
                />
              </div>
            </div>

            <div className={`${inputContainerClasses} relative w-full`} style={{ borderColor: BORDER }}>
              <label className="font-home-body text-[11px] text-[#777777]">Address</label>
              <div className="flex items-center">
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="flex-1 bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
                />
                <Icon icon="mingcute:search-line" className="text-[#777777] size-4" />
              </div>
            </div>

            <div className={`${inputContainerClasses} w-full`} style={{ borderColor: BORDER }}>
              <label className="font-home-body text-[11px] text-[#777777]">Apartment, suite, etc. (optional)</label>
              <input
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.apartment}
                onChange={handleChange}
                className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-[16px]">
              <div className={inputContainerClasses} style={{ borderColor: BORDER, width: '100%', maxWidth: '100%' }}>
                <label className="font-home-body text-[11px] text-[#777777] sm:max-w-[253px]">ZIP code</label>
                <input
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
                />
              </div>
              <div className={inputContainerClasses} style={{ borderColor: BORDER, width: '100%', maxWidth: '100%' }}>
                <label className="font-home-body text-[11px] text-[#777777] sm:max-w-[253px]">City</label>
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none placeholder:text-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-[16px]">
              <div className={`${inputContainerClasses} relative w-full`} style={{ borderColor: BORDER }}>
                <label className="font-home-body text-[11px] text-[#777777]">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none appearance-none pr-8"
                >
                  <option value="">Select state</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                </select>
                <Icon icon="mingcute:down-line" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777] size-4 pointer-events-none mt-1.5" />
              </div>
              <div className={`${inputContainerClasses} relative w-full`} style={{ borderColor: BORDER }}>
                <label className="font-home-body text-[11px] text-[#777777]">Country/Region</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-transparent font-home-body text-[14px] text-[#1a251f] outline-none appearance-none pr-8"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                <Icon icon="mingcute:down-line" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777] size-4 pointer-events-none mt-1.5" />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-4 sm:flex-row">
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
