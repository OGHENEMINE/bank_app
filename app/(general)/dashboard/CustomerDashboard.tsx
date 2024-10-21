import CustomerDashboardLayout from "@/components/me/CustomerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlignCenter,
  AlignRight,
  ArrowDown,
  ArrowLeftRight,
  BadgeDollarSign,
  Home,
  MoreHorizontal,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
// import Transfer from "./transfer/Index";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import UserAvatar from "@/components/me/UserAvatar";
import { getSpecificUserAccount } from "./actions";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import MakeTransfer from "@/app/(customer)/makeTransfer/Index";
import ModalPortal from "@/components/me/ModalPortal";
import Link from "next/link";
import {
  AccountInterface,
  AuthContextInterface,
  TransactionInterface,
} from "@/Interface";
import CustomerTransactionsComponent from "@/components/me/CustomerTransactionsComponent";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const [account, setAccount] = useState<AccountInterface>();
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchUserAccounts = async () => {
        const { success, message, account, transactions } =
          await getSpecificUserAccount(user.id as string);
        if (success) {
          setAccount(account);
          setTransactions(transactions);
          console.info(message);
        } else {
          console.error(message);
          setAccount(account);
        }
      };
      fetchUserAccounts();
    } catch (error) {
      console.log("Error fetching account", error);
    }
  }, [user.id]);

  console.log(transactions);
  return (
    <CustomerDashboardLayout>
      <section className="md:m-5">
        {/* header */}
        <div className="rounded-sm p-5 bg-primary text-white mt-2.5 space-y-1">
          <Link
            className="group hover:underline text-sm font-medium flex items-start gap-0.5"
            href="/"
          >
            <Home className="group-hover:underline" size={16} />
            Home
          </Link>

          <div className="flex max-sm:flex-wrap gap-2 items-start justify-between tracking-widest">
            <h2 className="text-2xl flex items-center gap-1 capitalize">
              Balance:
              {account ? (
                <span className="inline-flex items-center gap-2">
                  {formatCurrencyUI(account.balance, account.currency)}
                </span>
              ) : (
                <p>00.00</p>
              )}
            </h2>
            <div className="flex items-center max-sm:justify-between justify-center gap-2 max-sm:w-full">
              <h1 className="text-2xl font-medium capitalize">
                Welcome, {user.firstname}
              </h1>
              <UserAvatar />
            </div>
          </div>
        </div>

        <Card className="my-5 p-4">
          <CardTitle className="text-lg max-sm:font-bold">
            Quick Actions
          </CardTitle>
          <CardContent className="p-0 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => setModalOpen(true)}
              className="rounded bg-primary text-white flex flex-col items-center justify-center md:max-w-sm"
            >
              <ArrowLeftRight className="size-5" />
              <span className="text-xs">Transfer</span>
            </Button>
            <Link
              href="/deposit"
              className="rounded bg-primary text-white p-4 flex flex-col items-center justify-center md:max-w-sm"
            >
              <BadgeDollarSign className="size-6" />
              <span className="text-xs">Make deposit</span>
            </Link>
            <button className="rounded bg-primary text-white p-4 flex flex-col items-center justify-center md:max-w-sm">
              <ArrowDown className="size-6" />
              <span className="text-xs">Deposit</span>
            </button>
            <button className="rounded bg-primary text-white p-4 flex flex-col items-center justify-center md:max-w-sm">
              <ArrowDown className="size-6" />
              <span className="text-xs">Deposit</span>
            </button>
          </CardContent>
        </Card>

        {/* second section */}
        <div className="flex justify-between">
          <Card className="w-full h-fit px-3 py-2.5">
            <CardHeader className="px-0 py-2">
              <CardTitle className="text-lg flex items-center justify-between tracking-wider">
                Recent Transactions
                <Link
                  className="text-sm text-primary/80 hover:underline p-2 rounded"
                  href="/customer/transactions"
                >
                  See More
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.length > 0 ? (
                <CustomerTransactionsComponent transactions={transactions} />
              ) : (
                <p className="text-center max-sm:text-lg pt-2">
                  No recent transactions to display
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        {modalOpen && (
          <ModalPortal toggleState={modalOpen}>
            <MakeTransfer handleToggle={() => setModalOpen((prev) => !prev)} />
          </ModalPortal>
        )}
      </section>
    </CustomerDashboardLayout>
  );
};

export default CustomerDashboard;
