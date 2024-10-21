"use client";

import { AccountInterface } from "@/Interface";
import { Card, CardContent } from "../ui/card";
import { formatCurrencyUI } from "@/lib/formatCurrency";

interface CardProps {
  accounts: AccountInterface[];
}

function CustomerAccountCard({ accounts }: CardProps) {
  return (
    <div className="flex flex-wrap items-center gap-5 pb-2 overflow-x-auto">
      {accounts.map((account: AccountInterface) => (
        <Card
          style={{
            backgroundImage: "url('/AccountCardImage.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={account.id as string}
          className="w-96 flex-shrink-0 cursor-pointer p-4 relative text-stone-50 shadow"
        >
          <CardContent
            // onClick={() => setSpecialTransactions(account?.transactions ?? [], account.currency)}
            className="p-0 space-y-2 tracking-widest capitalize"
          >
            <p className="text-4xl flex items-center gap-2 tracking-tighter">
              <span>{formatCurrencyUI(account.balance)}</span>
            </p>
            <p className="text-lg font-light">{account.accountNumber}</p>
            <p className="text-sm">{account.accountType}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CustomerAccountCard;
