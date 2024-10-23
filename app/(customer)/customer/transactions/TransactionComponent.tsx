"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeftRight, Clock2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import MakeTransfer from "../../makeTransfer/Index";
import { AuthContext } from "@/context/authContext";
import { getUserTransactions } from "./action";
import { toast } from "sonner";
import ModalPortal from "@/components/me/ModalPortal";
import { Button } from "@/components/ui/button";
import { AuthContextInterface, TransactionInterface } from "@/Interface";
import CustomerTransactionsComponent from "@/components/me/CustomerTransactionsComponent";

const TransationComponent = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = () => setModalOpen((prev) => !prev);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { message, success, transactions } = await getUserTransactions(
          user.id as string
        );
        if (success) {
          console.info(message);
          setTransactions(transactions);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [user.id]);
  console.log(modalOpen);
  return (
    <section className="m-5 space-y-5">
      <Card>
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="flex items-end gap-1 text-2xl font-bold tracking-wide">
              Transaction History
              <Clock2 size={20} />
            </h1>
            <Button
              variant="outline"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 text-sm tracking-wider text-primary font-medium shadow-sm hover:bg-primary/5"
            >
              <ArrowLeftRight size={16} />
              Make Transaction
            </Button>
          </div>
        </CardHeader>
      </Card>

      {transactions.length > 0 ? (
        <CustomerTransactionsComponent transactions={transactions} />
      ) : (
        <p>User has not made any transaction</p>
      )}

      {modalOpen && (
        <ModalPortal toggleState={modalOpen}>
          <MakeTransfer handleToggle={handleToggle} />
        </ModalPortal>
      )}
    </section>
  );
};

export default TransationComponent;
