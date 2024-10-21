import { formatCurrencyUI } from "@/lib/formatCurrency";
import React from "react";
import { Card, CardContent } from "../ui/card";

const CustomerTransactionsComponent = ({
  transactions,
}: {
  transactions: {
    id: string;
    transactionTitle: string;
    transactionType: string;
    amount: number;
    createdAt: string;
    transactionStatus: string;
  }[];
}) => {
  return (
    <div className="space-y-1">
      {transactions.map(
        ({
          id,
          transactionTitle,
          transactionType,
          amount,
          createdAt,
          transactionStatus,
        }) => (
          <Card className="px-4" key={id}>
            <CardContent className="px-0 py-3">
              <div className="flex items-center justify-between font-bold tracking-wider">
                <div>
                  <p className="capitalize">
                    {transactionTitle
                      ? transactionTitle
                      : transactionType === "debit"
                      ? "Debit"
                      : transactionType === "credit"
                      ? "Credit"
                      : ""}
                  </p>
                  <p className="font-light">{createdAt}</p>
                </div>
                <p
                  className={`${
                    transactionType === "credit" &&
                    transactionStatus === "approved"
                      ? "text-green-600"
                      : transactionStatus === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {formatCurrencyUI(amount)}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default CustomerTransactionsComponent;
