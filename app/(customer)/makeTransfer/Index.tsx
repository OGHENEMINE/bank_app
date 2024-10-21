"use client";
import StepFormNavigation from "@/components/me/StepFormNavigation";
import ChooseAccount from "./ChooseAccount";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createContext, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import ConfirmTransfer from "./ConfirmTransfer";
import { AuthContext } from "@/context/authContext";
import Transfer from "./makeTransaferStep/Transfer";
import { getUserAccounts } from "../customer/accounts/actions";
import { toast } from "sonner";
import { AccountInterface, AuthContextInterface, TransferFormInterface } from "@/Interface";

export const TransferFormContext = createContext<TransferFormInterface | null>(
  null
);
const MakeTransfer = ({ handleToggle }: { handleToggle: () => void }) => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formDetails, setFormDetails] = useState({
    account: "",
    amount: "",
    transactionDescription: "",
    receiverBank: "",
    transactionReceiver: "",
    senderAccountId: "",
  });

  useEffect(() => {
    console.log(formDetails);
  }, [formDetails]);

  useEffect(() => {
    if (!user.id) return;
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const {success, message, accounts} = await getUserAccounts(user?.id as string);
        if (success === true) {
          accounts && setAccounts(accounts);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [user.id]);

  const handleGoBack = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="p-5 fixed overflow-y-auto z-50 top-0 bottom-0 left-0 w-[100vw] bg-primary/10 backdrop-blur-sm h-[100vh] flex items-center justify-center">
      <span
        className="cursor-pointer absolute top-5 left-5 group inline-block hover:bg-white hover:rounded hover:shadow p-1"
        onClick={handleToggle}
      >
        <X className="group-hover:text-gray-600" size={18} />
      </span>
      <TransferFormContext.Provider
        value={{
          step,
          setStep,
          isLoading,
          accounts,
          handleGoBack,
          setFormDetails,
          formDetails,
          handleToggle,
        }}
      >
        <Card className="p-5 w-full lg:w-[70%] lg:mx-auto min-h-[450px]">
          <CardHeader className="p-0">
            <StepFormNavigation />
          </CardHeader>
          <CardContent className="p-0 mt-16">
            {step == 1 && <ChooseAccount />}
            {step == 2 && <Transfer />}
            {step == 3 && <ConfirmTransfer />}
          </CardContent>
        </Card>
      </TransferFormContext.Provider>
    </div>
  );
};

export default MakeTransfer;
