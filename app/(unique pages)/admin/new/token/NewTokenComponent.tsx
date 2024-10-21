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
import { FolderPlus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { tokenValidation } from "./schema";
import { useEffect, useState } from "react";
import { addToken, getSystemData } from "./action";
import { UserInterface } from "@/Interface";

const NewTokenComponent = () => {
  const { push } = useRouter();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        setIsLoading(true);
        const { users, success, message } = await getSystemData();
        // console.log("data:", data);
        if (success) {
          setUsers(users);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Error fetching crypto assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoAssets();
  }, []);

  const form = useForm<z.infer<typeof tokenValidation>>({
    resolver: zodResolver(tokenValidation),
    defaultValues: {
      userId: "",
      length: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tokenValidation>) => {
    try {
      console.log(values);
      const data = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }

      // Submit the form data...
      const { success, message } = await addToken(data);
      // console.log(success)
      if (success) {
        toast.success(message);
        push("/tokens");
      } else {
        toast.error(message);
        console.error(message);
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
      href: "/tokens",
      text: "Back",
    },
  ];

  return (
    <main className="bg-[#f7f7f7] min-h-screen p-5 space-y-8">
      <BreadcrumbComponent items={BreadCrumbItems} currentPage="New Token" />
      <Card className="w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="text-center">New Transaction Token</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">user</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectGroup>
                              <SelectLabel>users</SelectLabel>
                              {users.map(({ id, firstname, lastname }) => (
                                <SelectItem
                                  className="block"
                                  key={id.toString()}
                                  value={id.toString()}
                                >
                                  <div className="flex capitalize items-center tracking-wider gap-5">
                                    {`${firstname} ${lastname}`}
                                  </div>
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
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Token Length
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter token length"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wider">
                        Token Type
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a token type" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectGroup>
                              <SelectLabel>users</SelectLabel>
                              <SelectItem
                                className="block"
                                value="alphaNumeric"
                              >
                                Alphanumeric
                              </SelectItem>
                              <SelectItem className="block" value="numeric">
                                Numeric
                              </SelectItem>
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
                    Adding Token...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Add Token
                    <FolderPlus size={20} />
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

export default NewTokenComponent;
