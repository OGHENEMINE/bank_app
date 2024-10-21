import { TransferFormContext } from "@/app/(customer)/makeTransfer/Index";
import { TransferFormInterface } from "@/Interface";
import { Check } from "lucide-react";
import { Fragment, useContext } from "react";

const StepFormNavigation = () => {
  const { step } = useContext(TransferFormContext) as TransferFormInterface;
  return (
    <nav className="flex items-center gap-1.5">
      {[
        { number: 1, desc: "choose an account" },
        { number: 2, desc: "Make Transfer" },
        { number: 3, desc: "complete" },
      ].map(({ number, desc }, index, stepsArray) => (
        <Fragment key={index}>
          <div
            className={`relative rounded-full transition-all duration-300 ease-in-out font-bold divide-y w-20 lg:w-[92px] h-8 lg:h-10 inline-flex items-center justify-center text-center ${
              step >= number ? "bg-primary text-white" : "border"
            }`}
          >
            {step > number ? <Check size={16} /> : number}
            {step == number && (
              <span className="text-primary absolute font-medium first-letter:capitalize top-full left-1/2 -translate-x-1/2 leading-4 mt-1.5 tracking-wider text-xs">
                {desc}
              </span>
            )}
          </div>
          {index !== stepsArray.length - 1 && (
            <span
              className={`w-full h-[1px] inline-flex transition-all duration-300 ease-in-out ${
                number < step ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default StepFormNavigation;
