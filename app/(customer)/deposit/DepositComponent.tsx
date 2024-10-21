"use client";

import { createContext, useState } from "react";
import ConfirmDeposit from "./depositSteps/ConfirmDeposit";
import MakeDeposit from "./depositSteps/MakeDeposit";
import { DepositInterface } from "@/Interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StepNavigation from "./StepNavigation";

export const DepositContext = createContext<DepositInterface | null>(null);

const DepositComponent = () => {
  const [step, setStep] = useState(1);
  const [formDetails, setFormDetails] = useState({
    accountId: "",
    amount: 0,
    wallet: "",
  });

  const handleGoBack = () => setStep((prevStep) => prevStep - 1);


  return (
    <DepositContext.Provider
      value={{
        step,
        setStep,
        handleGoBack,
        setFormDetails,
        formDetails,
      }}
    >
      <Card className="p-5 w-full lg:w-[70%] lg:mx-auto min-h-[450px]">
        <CardHeader className="p-0">
          <StepNavigation />
        </CardHeader>
        <CardContent className="p-0 mt-16">
          {step == 1 && <MakeDeposit />}
          {step == 2 && <ConfirmDeposit />}
        </CardContent>
      </Card>
    </DepositContext.Provider>
  );
};

export default DepositComponent;
