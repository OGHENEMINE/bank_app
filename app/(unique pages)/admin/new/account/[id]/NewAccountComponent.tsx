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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { CirclePlus, Loader2, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AccountValidation } from "./schema";
import { createBankAccount, getspecificUser } from "./actions";
import currencies from "@/lib/currency";

const NewAccountComponent = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof AccountValidation>>({
    resolver: zodResolver(AccountValidation),
    defaultValues: {
      account_userId: id.toString(),
      account_name: "",
      balance: 0,
    },
  });

  useEffect(() => {
    const fetchSpecificUser = async () => {
      try {
        const { user } = await getspecificUser(id as string);
        if (user)
          form.setValue("account_name", `${user.firstname} ${user.lastname}`);
        if (!user) return toast.error("Could not retrieve user");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchSpecificUser();
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof AccountValidation>) => {
    try {
      const data = new FormData();

      // Use keyof to ensure that key is properly typed
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        // TypeScript will now know that key is one of the defined keys
        const value = values[key];

        // Append the value to the FormData if it's not undefined
        if (value !== undefined) {
          data.append(key, value as string); // Make sure to cast value to string if necessary
        }
      });

      const { success, message } = await createBankAccount(data);

      if (success) {
        toast.success(message);
        push(`/user/${id}`);
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
      href: `/user/${id}`,
      text: "Back",
    },
  ];

  return (
    <main className="bg-[#f7f7f7] min-h-screen p-5 space-y-14 relative">
      <BreadcrumbComponent items={BreadCrumbItems} currentPage="New Account" />
      <Card className="w-[70%] mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-1">
            <PlusCircle />
            Create New Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 h-full"
            >
              <FormField
                control={form.control}
                name="account_userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider sr-only">
                      userId
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
                name="account_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">
                      Account Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Account Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tracking-wider">Balance</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Account Balance"
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
                    <FormLabel className="tracking-wider">Currency</FormLabel>
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
                name="account_type"
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
                    Creating Account...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Create Account
                    <CirclePlus size={17} />
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

export default NewAccountComponent;
