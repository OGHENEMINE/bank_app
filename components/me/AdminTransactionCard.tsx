import { TransactionInterface } from "@/interface";
import { Card, CardContent } from "../ui/card";
import currencies from "@/lib/currency";

interface CardProps {
  transactions: TransactionInterface[];
}

const AdminTransactionCard = ({ transactions }: CardProps) => {
  return (
    <div className="flex items-center justify-between flex-wrap">
      {transactions.map(
        ({
          id,
          transactionTitle,
          transactionType,
          transactionStatus,
          transactionCurrency,
          amount,
          createdAt
        }: TransactionInterface) => (
          <Card key={id} className="w-[400px] p-3">
            <CardContent className="p-0 text-sm">
              <div className="flex items-center justify-between font-bold tracking-wider space-y-5">
                <span className="first-letter:capitalize">
                  {transactionTitle}
                </span>
                <span
                  className={`${
                    transactionType === "credit" &&
                    transactionStatus === "approved"
                      ? "text-green-600"
                      : transactionType === "credit" &&
                        transactionStatus === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {currencies[transactionCurrency].symbol} {""}
                  {amount.toLocaleString()}
                </span>
              </div>
              <span className="font-light">
                {createdAt}
              </span>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default AdminTransactionCard;
