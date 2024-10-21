"use client";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AdminTransactionValidation } from "./schema";
import { useParams, useRouter } from "next/navigation";
import { createTransaction } from "./actions";

const NewTransactionComponent = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof AdminTransactionValidation>>({
    resolver: zodResolver(AdminTransactionValidation),
    defaultValues: {
      transaction_title: "",
      transaction_accountId: id.toString(),
      transaction_amount: "",
      transaction_desc: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AdminTransactionValidation>
  ) => {
    try {
      console.log(values)
      const data = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }

      const { success, message, error } = await createTransaction(data);

      if (success) {
        toast.success(message);
        push("/account/" + id);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const BreadCrumbItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/account/" + id,
      text: "Back",
    },
  ];

  return (
    <main className="bg-[#f7f7f7] min-h-screen p-5 space-y-8">
      <BreadcrumbComponent
        items={BreadCrumbItems}
        currentPage="New Transaction"
      />
      <Card className="w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Create New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="transaction_accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider hidden">
                        Transaction account id
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="hidden"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transaction_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Transaction name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter transaction name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transaction_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Transaction type
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Account Type</SelectLabel>
                              <SelectItem value="credit">credit</SelectItem>
                              <SelectItem value="debit">debit</SelectItem>
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
                              <SelectItem value="false">false</SelectItem>
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
                  name="transaction_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transaction_desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Description
                      </FormLabel>
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
              <Button className="w-full tracking-widest" type="submit">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center gap-1">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Creating Transaction...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Create Transaction
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

export default NewTransactionComponent;
