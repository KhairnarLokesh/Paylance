"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp, Clock, CheckCircle, CreditCard, Building, } from "lucide-react";
export default function WalletPage() {
    const { user, transactions, addFunds, withdrawFunds, refreshData } = useApp();
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [amount, setAmount] = useState("");
    useEffect(() => {
        refreshData();
    }, [refreshData]);
    const handleAddFunds = () => {
        if (!amount || Number.parseFloat(amount) <= 0)
            return;
        addFunds(Number.parseFloat(amount));
        setAmount("");
        setShowAddFunds(false);
    };
    const handleWithdraw = () => {
        if (!amount || Number.parseFloat(amount) <= 0)
            return;
        const success = withdrawFunds(Number.parseFloat(amount));
        if (success) {
            setAmount("");
            setShowWithdraw(false);
        }
    };
    const totalEarnings = transactions
        .filter((t) => t.type === "earning")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalSpent = transactions
        .filter((t) => t.type === "escrow_deposit" || t.type === "milestone_release")
        .reduce((sum, t) => sum + t.amount, 0);
    const getTransactionIcon = (type) => {
        switch (type) {
            case "deposit":
                return <ArrowDownLeft className="h-4 w-4 text-success"/>;
            case "withdrawal":
                return <ArrowUpRight className="h-4 w-4 text-destructive"/>;
            case "earning":
                return <TrendingUp className="h-4 w-4 text-success"/>;
            case "escrow_deposit":
                return <Clock className="h-4 w-4 text-warning"/>;
            case "milestone_release":
                return <CheckCircle className="h-4 w-4 text-primary"/>;
            default:
                return <DollarSign className="h-4 w-4"/>;
        }
    };
    const getTransactionLabel = (type) => {
        switch (type) {
            case "deposit":
                return "Added Funds";
            case "withdrawal":
                return "Withdrawal";
            case "earning":
                return "Earning";
            case "escrow_deposit":
                return "Escrow Deposit";
            case "milestone_release":
                return "Milestone Payment";
            default:
                return type;
        }
    };
    const isPositive = (type) => type === "deposit" || type === "earning";
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and transactions</p>
      </div>

      {/* Balance Card */}
      <Card className="border-border bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4"/>
                Available Balance
              </div>
              <p className="mt-2 text-4xl font-bold text-card-foreground">
                ₹{user.walletBalance?.toLocaleString() || 0}
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowAddFunds(true)}>
                <ArrowDownLeft className="mr-2 h-4 w-4"/>
                Add Funds
              </Button>
              {user.role === "freelancer" && (<Button variant="outline" onClick={() => setShowWithdraw(true)}>
                  <ArrowUpRight className="mr-2 h-4 w-4"/>
                  Withdraw
                </Button>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.role === "freelancer" ? (<>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="mt-1 text-2xl font-bold text-success">
                      ₹{totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-success/10 p-3">
                    <TrendingUp className="h-6 w-6 text-success"/>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="mt-1 text-2xl font-bold text-card-foreground">₹0</p>
                  </div>
                  <div className="rounded-xl bg-warning/10 p-3">
                    <Clock className="h-6 w-6 text-warning"/>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Withdrawn</p>
                    <p className="mt-1 text-2xl font-bold text-card-foreground">
                      ₹{transactions
                .filter((t) => t.type === "withdrawal")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground"/>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>) : (<>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="mt-1 text-2xl font-bold text-card-foreground">
                      ₹{totalSpent.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-3">
                    <DollarSign className="h-6 w-6 text-primary"/>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Escrow</p>
                    <p className="mt-1 text-2xl font-bold text-warning">
                      ₹{transactions
                .filter((t) => t.type === "escrow_deposit")
                .reduce((sum, t) => sum + t.amount, 0) -
                transactions
                    .filter((t) => t.type === "milestone_release")
                    .reduce((sum, t) => sum + t.amount, 0)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-warning/10 p-3">
                    <Clock className="h-6 w-6 text-warning"/>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Released</p>
                    <p className="mt-1 text-2xl font-bold text-success">
                      ₹{transactions
                .filter((t) => t.type === "milestone_release")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-success/10 p-3">
                    <CheckCircle className="h-6 w-6 text-success"/>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>)}
      </div>

      {/* Transaction History */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (<div className="py-8 text-center">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50"/>
              <p className="mt-2 text-muted-foreground">No transactions yet</p>
            </div>) : (<div className="space-y-3">
              {transactions.map((txn) => (<div key={txn._id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getTransactionIcon(txn.type)}
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {getTransactionLabel(txn.type)}
                      </p>
                      <p className="text-sm text-muted-foreground">{txn.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive(txn.type) ? "text-success" : "text-card-foreground"}`}>
                      {isPositive(txn.type) ? "+" : "-"}₹{txn.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>))}
            </div>)}
        </CardContent>
      </Card>

      {/* Add Funds Modal */}
      {showAddFunds && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
              </div>

              {/* Demo Payment Methods */}
              <div className="space-y-2">
                <Label>Payment Method (Demo)</Label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-3">
                    <CreditCard className="h-5 w-5 text-primary"/>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">Credit Card</p>
                      <p className="text-xs text-muted-foreground">**** 4242</p>
                    </div>
                    <div className="h-4 w-4 rounded-full border-4 border-primary"/>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3 opacity-50">
                    <Building className="h-5 w-5 text-muted-foreground"/>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => {
                setShowAddFunds(false);
                setAmount("");
            }}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddFunds} disabled={!amount || Number.parseFloat(amount) <= 0}>
                  Add ₹{amount || 0}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>)}

      {/* Withdraw Modal */}
      {showWithdraw && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="text-muted-foreground">
                  Available balance:{" "}
                  <span className="font-semibold text-card-foreground">
                    ₹{user.walletBalance?.toLocaleString() || 0}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Amount (₹)</Label>
                <Input id="withdrawAmount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} max={user.walletBalance}/>
              </div>

              {/* Demo Bank Account */}
              <div className="space-y-2">
                <Label>Withdraw To (Demo)</Label>
                <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-3">
                  <Building className="h-5 w-5 text-primary"/>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">Bank Account</p>
                    <p className="text-xs text-muted-foreground">**** 1234</p>
                  </div>
                  <div className="h-4 w-4 rounded-full border-4 border-primary"/>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => {
                setShowWithdraw(false);
                setAmount("");
            }}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleWithdraw} disabled={!amount ||
                Number.parseFloat(amount) <= 0 ||
                Number.parseFloat(amount) > user.walletBalance}>
                  Withdraw ₹{amount || 0}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>)}
    </div>);
}
