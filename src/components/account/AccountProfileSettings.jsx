"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import AccountEditProfileModal from "./AccountEditProfileModal";
import AccountChangePasswordModal from "./AccountChangePasswordModal";
import AccountForgotPasswordModal from "./AccountForgotPasswordModal";
import AccountAddAddressModal from "./AccountAddAddressModal";
import AccountEditAddressModal from "./AccountEditAddressModal";

const BORDER = "#d4d0c6";

export default function AccountProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 222-333-4444",
    loading: true,
  });

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      isDefault: true,
      firstName: "John",
      lastName: "Doe",
      address: "206 Batran's Street, 39",
      apartment: "",
      zipCode: "2044",
      city: "Ottawa",
      state: "Ontario",
      country: "Canada",
    },
    {
      id: "2",
      isDefault: false,
      firstName: "John",
      lastName: "Doe",
      address: "206 Batran's Street, 39",
      apartment: "",
      zipCode: "2044",
      city: "Ottawa",
      state: "Ontario",
      country: "Canada",
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/settings/profile");
        const json = await res.json();
        if (json.success && json.data) {
          setProfile({
            fullName: json.data.full_name || "John Doe",
            email: json.data.email || "johndoe@example.com",
            phone: json.data.phone || "+1 222-333-4444",
            loading: false,
          });
        } else {
          setProfile((s) => ({ ...s, loading: false }));
        }
      } catch {
        setProfile((s) => ({ ...s, loading: false }));
      }
    })();
  }, []);

  const handleSaveProfile = async (updatedProfile) => {
    // Optimistically update UI
    setProfile({ ...updatedProfile, loading: false });

    try {
      const res = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: updatedProfile.fullName,
          phone: updatedProfile.phone,
          // avatarUrl is currently not in the UI but the API expects it or we can omit it if not changed
        }),
      });
      const json = await res.json();
      if (!json.success) {
        console.error("Failed to save profile:", json.message);
        // Rollback or show error toast could go here
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsEditAddressModalOpen(true);
  };

  const handleSaveAddress = async (addressData) => {
    // This will be implemented when the address API is ready
    console.log("Saving address:", addressData);
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...addressData } : a));
    }
  };

  const handleAddAddress = async (addressData) => {
    // This will be implemented when the address API is ready
    console.log("Adding address:", addressData);
    setAddresses([...addresses, { ...addressData, id: Math.random().toString() }]);
  };

  if (profile.loading) {
    return (
      <div className="flex items-center gap-2 py-16 text-[#555555]">
        <Icon icon="mingcute:loading-fill" className="size-6 animate-spin" aria-hidden />
        <span className="font-home-body text-sm">Loading profile…</span>
      </div>
    );
  }

  return (
    <section className="max-w-4xl" aria-labelledby="profile-settings-heading">
      <h2
        id="profile-settings-heading"
        className="font-home-body text-lg font-bold text-[#1a251f] sm:text-xl"
      >
        Profile settings
      </h2>

      <div className="mt-8 space-y-6">
        {/* Profile Info Card */}
        <div 
          className="rounded-sm border bg-[#FFFDF4] p-6 sm:p-8"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center gap-3">
            <h3 className="font-home-body text-lg font-bold text-[#1a251f]">
              {profile.fullName}
            </h3>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-[#4a524a] transition hover:text-[#1a251f]"
            >
              <Icon icon="mingcute:edit-2-line" className="size-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="font-home-body text-[13px] text-[#777777]">Email & password</p>
                <p className="mt-1 font-home-body text-[15px] font-medium text-[#1a251f]">
                  {profile.email}
                </p>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-1.5 text-[14px] font-medium text-[#4a524a] transition hover:text-[#1a251f]"
              >
                <Icon icon="mingcute:edit-2-line" className="size-3.5" />
                <span>Change password</span>
              </button>
            </div>

            <div>
              <p className="font-home-body text-[13px] text-[#777777]">Phone number</p>
              <p className="mt-1 font-home-body text-[15px] font-medium text-[#1a251f]">
                {profile.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div 
          className="rounded-sm border bg-[#FFFDF4] p-6 sm:p-8"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-home-body text-lg font-bold text-[#1a251f]">Address</h3>
              <button 
                onClick={() => setIsAddAddressModalOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-[#4a524a] transition hover:text-[#1a251f]"
              >
                <Icon icon="mingcute:add-line" className="size-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {addresses.map((addr, idx) => (
              <div key={addr.id} className={idx > 0 ? "hidden sm:block" : ""}>
                <p className="font-home-body text-[13px] text-[#777777]">
                  {addr.isDefault ? "Default address" : "Secondary address"}
                </p>
                <div className="mt-3 space-y-0.5 font-home-body text-[15px] text-[#1a251f]">
                  <p className="font-medium">{addr.firstName} {addr.lastName}</p>
                  <p>{addr.state}, {addr.city}, {addr.zipCode}</p>
                  <p>{addr.address}</p>
                  <p>{addr.country}</p>
                </div>
                <button 
                  onClick={() => handleEditAddress(addr)}
                  className="mt-4 flex items-center gap-1.5 text-[14px] font-medium text-[#4a524a] transition hover:text-[#1a251f]"
                >
                  <Icon icon="mingcute:edit-2-line" className="size-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6" style={{ borderColor: BORDER }}>
        <Link href="/privacy" className="text-[13px] text-[#4a524a] underline underline-offset-4 hover:text-[#1a251f]">
          Privacy policy
        </Link>
        <Link href="/terms" className="text-[13px] text-[#4a524a] underline underline-offset-4 hover:text-[#1a251f]">
          Terms of service
        </Link>
      </footer>

      <AccountEditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <AccountChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onForgotClick={() => {
          setIsPasswordModalOpen(false);
          setIsForgotModalOpen(true);
        }}
      />

      <AccountForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        email={profile.email}
      />

      <AccountAddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={handleAddAddress}
      />

      <AccountEditAddressModal
        isOpen={isEditAddressModalOpen}
        onClose={() => setIsEditAddressModalOpen(false)}
        address={editingAddress}
        onSave={handleSaveAddress}
      />
    </section>
  );
}


