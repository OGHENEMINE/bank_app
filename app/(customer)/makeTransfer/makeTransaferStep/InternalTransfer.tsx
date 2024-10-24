import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransferFormContext } from "../Index";
import { useContext } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import { toast } from "sonner";
import { InternalTransferValidation } from "./schema";
import { TransferFormDetails, TransferFormInterface } from "@/Interface";

const InternalTransfer = () => {
  const { step, setStep, formDetails, setFormDetails } = useContext(
    TransferFormContext
  ) as TransferFormInterface;
  const form = useForm<z.infer<typeof InternalTransferValidation>>({
    resolver: zodResolver(InternalTransferValidation),
    defaultValues: {
      amount: "",
      description: "",
      receiverAccount: "",
    },
  });

  const onSubmit = (values: z.infer<typeof InternalTransferValidation>) => {
    try {
      console.log(values);
      setFormDetails({
        ...(formDetails as TransferFormDetails),
        amount: values.amount,
        transactionDescription: values.description,
        transactionReceiver: values.receiverAccount,
        receiverBank: "same",
      });
      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-3">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider">Amount</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiverAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider">Receiver</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter recipient account number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider">Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter transaction description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => setStep(step - 1)}
            variant="outline"
            className="w-full flex items-center gap-1 shadow tracking-widest"
          >
            <ArrowLeft size={15} /> Back
          </Button>
          <Button className="w-full flex items-center gap-1 shadow tracking-widest">
            {form.formState.isSubmitting ? "Loading" : "Make Transfer"}
            {form.formState.isSubmitting && (
              <Loader size={15} className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InternalTransfer;
