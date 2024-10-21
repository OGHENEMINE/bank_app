"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon, Loader2, LucideEdit, Send } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { useEffect } from "react";
import { editTokenSchema } from "../../token/[id]/schema";
import { getTransactionInfo, updateInfo } from "./action";
import { editTransactionSchema } from "./schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionComponent = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof editTransactionSchema>>({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      id: "",
      transaction_amount: 0,
      transaction_status: "",
      transaction_hidden_status: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, transaction, message } = await getTransactionInfo(
          id as string
        );
        console.log(transaction);

        if (success) {
          form.setValue("id", id as string);
          form.setValue("transaction_amount", transaction.amount!);
          form.setValue("transaction_status", transaction.transactionStatus);
          form.setValue("transaction_hidden_status", transaction.hiddenStatus);
          console.info(message);
        } else {
          console.error(message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id, form]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof editTransactionSchema>) => {
    try {
      console.log(values);
      const data = new FormData();
      // Assuming values is an object with keys and values
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }

      const { success, message } = await updateInfo(data);

      if (success) {
        toast.success(message);
        return push("/admin/transactions");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const BreadCrumbItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: `/admin/transactions`,
      text: "Back",
    },
  ];

  return (
    <main className="bg-[#f7f7f7] min-h-screen p-5 space-y-8 relative">
      <BreadcrumbComponent
        items={BreadCrumbItems}
        currentPage="Edit information"
      />
      <Card className="w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="flex items-end justify-center gap-1">
            Edit Token Information
            <EditIcon size={20} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="transaction_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Update amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider hidden">
                        Transaction id
                      </FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transaction_hidden_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Transaction hidden
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hidden transaction status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Hidden Transaction</SelectLabel>
                              <SelectItem value="false">False</SelectItem>
                              <SelectItem value="true">true</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transaction_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Transaction Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Transaction Status</SelectLabel>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="decline">Decline</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full tracking-widest" type="submit">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center gap-1">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Editing Transaction...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Edit Transaction
                    <Send size={17} />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default TransactionComponent;
