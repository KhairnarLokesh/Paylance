"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp, Clock, CheckCircle, CreditCard, Building } from "lucide-react";

export default function WalletPage() {
  const { user, transactions, addFunds, withdrawFunds, refreshData } = useApp();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => { refreshData(); }, [refreshData]);

  const handleAddFunds = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    addFunds(parseFloat(amount)); setAmount(""); setShowAddFunds(false);
  };
  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    const ok = withdrawFunds(parseFloat(amount));
    if (ok) { setAmount(""); setShowWithdraw(false); }
  };

  const totalEarnings = transactions.filter(t => t.type === "earning").reduce((s, t) => s + t.amount, 0);
  const totalSpent = transactions.filter(t => t.type === "escrow_deposit" || t.type === "milestone_release").reduce((s, t) => s + t.amount, 0);

  const txnIcon = (type) => {
    if (type === "deposit") return <ArrowDownLeft className="h-4 w-4 text-[#16A34A]" />;
    if (type === "withdrawal") return <ArrowUpRight className="h-4 w-4 text-red-400" />;
    if (type === "earning") return <TrendingUp className="h-4 w-4 text-[#16A34A]" />;
    if (type === "escrow_deposit") return <Clock className="h-4 w-4 text-[#F59E0B]" />;
    if (type === "milestone_release") return <CheckCircle className="h-4 w-4 text-[#EA580C]" />;
    return <DollarSign className="h-4 w-4 text-[#71717A]" />;
  };
  const txnLabel = (type) => {
    const map = { deposit: "Added Funds", withdrawal: "Withdrawal", earning: "Earning", escrow_deposit: "Escrow Deposit", milestone_release: "Milestone Payment" };
    return map[type] || type;
  };
  const isPositive = (type) => type === "deposit" || type === "earning";

  const inputCls = "h-10 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 text-sm text-white placeholder:text-[#3F3F46] focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] outline-none transition-all";

  return (
    <div className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Wallet</h1>
        <p className="text-sm text-[#71717A] mt-0.5">Manage your funds and transactions</p>
      </div>

      {/* Balance Card — orange border (only place in app with orange border) */}
      <div className="bg-[#111111] rounded-2xl border-2 border-[#EA580C]/40 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#71717A] mb-2">
              <Wallet className="h-3.5 w-3.5" /> Available Balance
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">
              ₹{user.walletBalance?.toLocaleString() || 0}
            </p>
          </div>
          <div className="flex gap-2.5">
            <button onClick={() => setShowAddFunds(true)} className="px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5">
              <ArrowDownLeft className="h-4 w-4" /> Add Funds
            </button>
            {user.role === "freelancer" && (
              <button onClick={() => setShowWithdraw(true)} className="px-4 py-2 border border-[#2A2A2A] text-[#A1A1AA] text-sm font-semibold rounded-lg hover:border-[#EA580C] hover:text-white transition-colors flex items-center gap-1.5">
                <ArrowUpRight className="h-4 w-4" /> Withdraw
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.role === "freelancer" ? (
          <>
            <StatCard label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} icon={TrendingUp} green />
            <StatCard label="Pending" value="₹0" icon={Clock} pending />
            <StatCard label="Withdrawn" value={`₹${transactions.filter(t => t.type === "withdrawal").reduce((s, t) => s + t.amount, 0).toLocaleString()}`} icon={ArrowUpRight} />
          </>
        ) : (
          <>
            <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} icon={DollarSign} />
            <StatCard label="In Escrow" value={`₹${transactions.filter(t => t.type === "escrow_deposit").reduce((s, t) => s + t.amount, 0) - transactions.filter(t => t.type === "milestone_release").reduce((s, t) => s + t.amount, 0)}`} icon={Clock} pending />
            <StatCard label="Released" value={`₹${transactions.filter(t => t.type === "milestone_release").reduce((s, t) => s + t.amount, 0).toLocaleString()}`} icon={CheckCircle} green />
          </>
        )}
      </div>

      {/* Transactions */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl">
        <div className="px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-white">Transaction History</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="py-12 text-center">
            <DollarSign className="mx-auto h-10 w-10 text-[#3F3F46]" />
            <p className="mt-2 text-sm text-[#71717A]">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2A2A2A]">
            {transactions.map(txn => (
              <div key={txn._id} className="flex items-center justify-between px-5 py-4 hover:bg-[#1A1A1A] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] shrink-0">
                    {txnIcon(txn.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{txnLabel(txn.type)}</p>
                    <p className="text-xs text-[#71717A]">{txn.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${isPositive(txn.type) ? "text-[#16A34A]" : "text-white"}`}>
                    {isPositive(txn.type) ? "+" : "-"}₹{txn.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#71717A]">{new Date(txn.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <Modal title="Add Funds" onClose={() => { setShowAddFunds(false); setAmount(""); }}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="amount" className="text-xs font-semibold text-[#A1A1AA]">Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#A1A1AA]">Payment Method</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#EA580C]/50 bg-[#1A0D07]">
                  <CreditCard className="h-4 w-4 text-[#EA580C]" />
                  <div className="flex-1"><p className="text-sm font-medium text-white">Credit Card</p><p className="text-xs text-[#71717A]">**** 4242</p></div>
                  <div className="h-4 w-4 rounded-full border-[3px] border-[#EA580C]" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-[#2A2A2A] opacity-40">
                  <Building className="h-4 w-4 text-[#71717A]" />
                  <div className="flex-1"><p className="text-sm font-medium text-[#71717A]">Bank Transfer</p><p className="text-xs text-[#71717A]">Coming soon</p></div>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => { setShowAddFunds(false); setAmount(""); }} className="flex-1 py-2.5 border border-[#2A2A2A] text-sm font-medium rounded-lg text-[#71717A] hover:border-[#EA580C] hover:text-white transition-colors">Cancel</button>
              <button onClick={handleAddFunds} disabled={!amount || parseFloat(amount) <= 0} className="flex-1 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
                Add ₹{amount || 0}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <Modal title="Withdraw Funds" onClose={() => { setShowWithdraw(false); setAmount(""); }}>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-[#71717A]">
              Available: <span className="font-semibold text-white">₹{user.walletBalance?.toLocaleString() || 0}</span>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wAmount" className="text-xs font-semibold text-[#A1A1AA]">Amount (₹)</Label>
              <Input id="wAmount" type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} max={user.walletBalance} className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#A1A1AA]">Withdraw To</Label>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#EA580C]/50 bg-[#1A0D07]">
                <Building className="h-4 w-4 text-[#EA580C]" />
                <div className="flex-1"><p className="text-sm font-medium text-white">Bank Account</p><p className="text-xs text-[#71717A]">**** 1234</p></div>
                <div className="h-4 w-4 rounded-full border-[3px] border-[#EA580C]" />
              </div>
            </div>
            <div className="flex gap-2.5 pt-1">
              <button onClick={() => { setShowWithdraw(false); setAmount(""); }} className="flex-1 py-2.5 border border-[#2A2A2A] text-sm font-medium rounded-lg text-[#71717A] hover:border-[#EA580C] hover:text-white transition-colors">Cancel</button>
              <button onClick={handleWithdraw} disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.walletBalance} className="flex-1 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
                Withdraw ₹{amount || 0}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, green, pending }) {
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#71717A]">{label}</p>
          <p className={`mt-1.5 text-2xl font-bold tracking-tight ${green ? "text-[#16A34A]" : "text-white"}`}>{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${green ? "bg-[#0A1F0F]" : pending ? "bg-[#1F1500]" : "bg-[#1A1A1A]"}`}>
          <Icon className={`h-5 w-5 ${green ? "text-[#16A34A]" : pending ? "text-[#F59E0B]" : "text-[#71717A]"}`} />
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#111111] rounded-2xl border border-[#2A2A2A] shadow-2xl w-full max-w-md p-6">
        <h2 className="text-base font-bold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
