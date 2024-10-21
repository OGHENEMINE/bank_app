import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useContext, useState } from "react";
import { DepositContext } from "../DepositComponent";
import { AuthContextInterface, DepositInterface } from "@/Interface";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import { createDeposit } from "../action";
import { toast } from "sonner";

const ConfirmDeposit = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const { setFormDetails, handleGoBack, formDetails, setStep, step } =
    useContext(DepositContext) as DepositInterface;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmation = async () => {
    setIsLoading(true);
    try {
      value !== "" && setError("");
      if (value === user.pin) {
        console.log(formDetails);
        // Reset error on successful confirmation
        if (formDetails?.accountId) {
          const { success, message } = await createDeposit(formDetails);
          if (success) {
            toast.success(message);
            setStep(1);
          } else {
            toast.error(message);
          }
        }
      } else {
        setError("Invalid transaction PIN");
      }
    } catch (error) {
      console.error("Error making transfer", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-10 flex flex-col text-center tracking-wider gap-8 items-center justify-center">
      <p>
        Provide transaction PIN to confirm the transaction securely. Your PIN is
        used for authentication purposes only.
      </p>
      <div className="space-y-2">
        <InputOTP
          maxLength={4}
          pattern="^\d+$"
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSeparator />
            <InputOTPSlot index={1} />
            <InputOTPSeparator />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
      <p className="text-sm text-gray-600">
        Need help? Contact our customer support for assistance.
      </p>
      <div className="flex items-center justify-between  gap-2 w-full">
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="w-full flex items-center gap-1 shadow tracking-widest"
        >
          <ArrowLeft size={15} /> Back
        </Button>
        <Button className="w-full" onClick={handleConfirmation}>
          {isLoading && (
            <Loader2 size={15} className="text-white animate-spin" />
          )}{" "}
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDeposit;