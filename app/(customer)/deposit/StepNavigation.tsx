import { DepositInterface } from "@/Interface";
import { Check } from "lucide-react";
import { Fragment, useContext } from "react";
import { DepositContext } from "./DepositComponent";

const StepNavigation = () => {
  const { step } = useContext(DepositContext) as DepositInterface;
  return (
    <nav className="flex items-center gap-1.5">
      {[
        { number: 1, desc: "Make deposit" },
        { number: 2, desc: "Confirm deposit" },
      ].map(({ number, desc }, index, stepsArray) => (
        <Fragment key={index}>
          <div
            className={`relative rounded-full transition-all duration-300 ease-in-out font-bold divide-y w-20 lg:w-12 h-8 lg:h-10 inline-flex items-center justify-center text-center ${
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

export default StepNavigation;