"use client";
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  Edit3,
  HandCoins,
  Loader,
  Loader2,
  ShieldPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newAccountSchema } from "./schema";
import { useParams, useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { createNewCustomerAccount } from "./actions";
import { toast } from "sonner";
import { useContext, useEffect } from "react";
import currencies from "@/lib/currency";
import { AuthContextInterface } from "@/Interface";
import { AuthContext } from "@/context/authContext";

const NewAccountComponent = () => {
  const { push } = useRouter();
  const { id } = useParams();

  const form = useForm<z.infer<typeof newAccountSchema>>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: {
      userId: id?.toString(),
      accountName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newAccountSchema>) => {
    try {
      const data = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }
      const { success, message } = await createNewCustomerAccount(data);
      if (success === true) {
        toast.success(message);
        push("/customer/accounts");
      } else {
        return toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const BreadCrumbs = [
    {
      href: "/customer/accounts",
      text: "Accounts",
    },
  ];
  return (
    <section className="m-5 h-full">
      <BreadcrumbComponent items={BreadCrumbs} currentPage="New Account" />
      <Card className="w-[70%] mx-auto mt-10 p-5">
        <CardHeader className="px-0 py-2.5">
          <CardTitle className="text-center p-0 tracking-wider">
            Create a new account
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2.5 py-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">userId</FormLabel>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Account Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Provide account name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Account Currency
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectGroup>
                            <SelectLabel>Currency</SelectLabel>
                            {Object.values(currencies).map((currency) => (
                              <SelectItem
                                key={currency.code}
                                value={currency.code}
                              >
                                {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
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
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Account Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Account Type</SelectLabel>
                            <SelectItem value="savings">savings</SelectItem>
                            <SelectItem value="current">current</SelectItem>
                            <SelectItem value="corporate">corporate</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full tracking-widest" type="submit">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center gap-1">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Creating account...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Create account
                    <ShieldPlus size={18} />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewAccountComponent;
