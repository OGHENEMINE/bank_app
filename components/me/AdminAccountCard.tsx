import { AccountInterface } from "@/Interface";
import { Card, CardContent } from "../ui/card";
import currencies from "@/lib/currency";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import Link from "next/link";

const AdminAccountCard = ({ accounts }: { accounts: AccountInterface[] }) => {
  console.log(accounts);

  return (
    <div className="flex flex-wrap items-center gap-5">
      {accounts.map((account: AccountInterface) => (
        <Card
          style={{
            backgroundImage: "url('/AccountCardImage.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={account?.id.toString()}
          className="w-full md:w-[45%] lg:w-[32%] p-4 relative text-stone-50 shadow-lg"
        >
          <CardContent className="p-0 space-y-3 tracking-widest capitalize">
            <div className="flex items-center justify-between text-center">
              <div>
                <p className="text-4xl flex items-center gap-2 tracking-tighter">
                  <span>
                    {formatCurrencyUI(
                      account?.balance,
                      account.currency.toString()
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-lg font-light">
              <p className="tracking-widest">{account?.accountNumber}</p>
            </div>
            <div>
              <p>{account?.accountType}</p>
            </div>
            <Link
              className="absolute inset-0"
              href={`/account/${account?.id}`}
            ></Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminAccountCard;
