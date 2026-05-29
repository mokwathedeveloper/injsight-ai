"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { User, Bell, Shield, CreditCard, Key } from "lucide-react";

export function SettingsView() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary">Manage your account preferences and notifications.</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">Profile</h2>
        </div>
        <div className="space-y-4">
          <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="primary" size="sm">Save Changes</Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">Notifications</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Risk score changes",     desc: "Get notified when a saved wallet's risk score changes" },
            { label: "Large transfers",        desc: "Alert on transactions over $10,000" },
            { label: "Weekly AI reports",      desc: "Receive weekly portfolio intelligence digest" },
            { label: "New analysis complete",  desc: "Email when an analysis finishes" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm text-text-primary">{label}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-surface-3 peer-checked:bg-primary rounded-full peer transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">Security</h2>
        </div>
        <div className="space-y-3">
          <Button variant="secondary" size="sm">Change Password</Button>
          <Button variant="secondary" size="sm">Enable 2FA</Button>
          <p className="text-xs text-text-muted">
            InjSight never stores private keys or seed phrases. Your account only stores email and preferences.
          </p>
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass-card p-6 border-danger/20">
        <h2 className="text-sm font-semibold text-danger mb-4">Danger Zone</h2>
        <Button variant="danger" size="sm">Delete Account</Button>
      </div>
    </div>
  );
}
