"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { SavedWalletCard } from "@/components/wallet/SavedWalletCard";
import { AddWalletModal } from "@/components/wallet/AddWalletModal";
import { MOCK_SAVED_WALLETS } from "@/data/saved-wallets-mock";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function WalletsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [wallets, setWallets] = React.useState(MOCK_SAVED_WALLETS);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredWallets = wallets.filter(w => 
    w.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWallet = (data: { address: string; label: string }) => {
    const newWallet = {
      id: `w-${Date.now()}`,
      label: data.label,
      address: data.address,
      totalValueUsd: 0,
      riskScore: 0,
      riskLevel: "Low" as any,
      lastAnalyzed: "Just now",
    };
    setWallets([newWallet, ...wallets]);
  };

  const handleDeleteWallet = (id: string) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

  const handleRefreshWallet = (id: string) => {
    setWallets(wallets.map(w => 
      w.id === id ? { ...w, lastAnalyzed: "Just now" } : w
    ));
  };

  const handleEditWallet = (id: string) => {
    const newLabel = prompt("Enter new label:");
    if (newLabel) {
      setWallets(wallets.map(w => 
        w.id === id ? { ...w, label: newLabel } : w
      ));
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Tracked <span className="text-primary">Wallets</span>
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Manage your saved Injective portfolios and monitor real-time AI intelligence.
            </p>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 group"
          >
            <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Wallet</span>
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
            <Input 
              placeholder="Search by label or address..." 
              className="h-12 pl-11 bg-card border-border-strong text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="secondary" className="h-12 px-6 gap-2 border-border-strong">
            <Filter size={18} className="text-text-disabled" />
            <span className="text-xs font-bold uppercase tracking-widest">Filter</span>
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWallets.map((wallet) => (
            <SavedWalletCard 
              key={wallet.id} 
              wallet={wallet} 
              onDelete={handleDeleteWallet}
              onRefresh={handleRefreshWallet}
              onEdit={handleEditWallet}
            />
          ))}

          {filteredWallets.length === 0 && (
            <div className="col-span-full py-32 text-center space-y-4">
              <div className="w-16 h-16 bg-hover rounded-full flex items-center justify-center mx-auto border border-border">
                <Search size={24} className="text-text-disabled" />
              </div>
              <div className="space-y-1">
                <p className="text-text-primary font-bold">No wallets found</p>
                <p className="text-text-secondary text-sm">Try adjusting your search or add a new wallet to track.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddWalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddWallet}
      />
    </AppShell>
  );
}
