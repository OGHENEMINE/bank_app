import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader } from "lucide-react";
import { TransferFormContext } from "./Index";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { TransferFormDetails, TransferFormInterface } from "@/Interface";

const ChooseAccount = () => {
  const { step, isLoading, accounts, setStep, formDetails, setFormDetails } =
    useContext(TransferFormContext) as TransferFormInterface;

  const handleChooseAccount = (id: string) => {
    setFormDetails({
      ...(formDetails as TransferFormDetails),
      account: id,
    });
    setStep(step + 1);
  };
  // const handleNext = () => {
  //   if(formDetails)
  // }
  return (
    <>
      <div className="flex items-center justify-between gap-2 pb-2 overflow-x-auto">
        {accounts.length > 0 && !isLoading ? (
          accounts.map((account) => (
            <Card
              onClick={() => handleChooseAccount(account.id as string)}
              style={{
                backgroundImage: "url('/AccountCardImage.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex-shrink-0 p-5 w-[45%] text-white cursor-pointer"
              key={account.id as string}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between text-center">
                  <div>
                    <p className="text-4xl flex items-center gap-2">
                      {formatCurrencyUI(account?.balance, account.currency)}
                    </p>
                  </div>
                </div>
                <div className="text-lg font-light">
                  <p className="tracking-widest">{account?.accountNumber}</p>
                </div>
                <div>
                  <p>{account?.accountType}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : isLoading ? (
          <p className="flex gap-1 items-center text-sm tracking-widest">
            <Loader size={18} className="animate-spin text-primary" />
            Accounts loading
          </p>
        ) : (
          <p>User does not have an account yet.</p>
        )}
      </div>
      {formDetails?.senderAccountId !== "" && (
        <Button
          onClick={() => setStep(step + 1)}
          className="flex items-center gap-1 tracking-widest cursor-pointer mt-16 shadow"
        >
          Next
          <ArrowRight size={15} />
        </Button>
      )}
    </>
  );
};

export default ChooseAccount;
