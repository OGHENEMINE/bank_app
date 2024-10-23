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
import { EditIcon, Loader2, LucideEdit } from "lucide-react";
import { toast } from "sonner";
import { redirect, useParams, useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { useEffect } from "react";
import { editTokenSchema } from "./schema";
import { getTokenInfo, updateTokenInfo } from "./action";

const EditTokenComponent = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof editTokenSchema>>({
    resolver: zodResolver(editTokenSchema),
    defaultValues: {
      id: "",
      token: "",
      usage: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, token, message } = await getTokenInfo(id as string);
        console.log(token);

        if (success) {
          form.setValue("id", id as string);
          form.setValue("token", token.token);
          form.setValue("usage", token.usage);
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
  const onSubmit = async (values: z.infer<typeof editTokenSchema>) => {
    try {
      console.log(values);
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
      const { success, message } = await updateTokenInfo(data);

      if (success) {
        toast.success(message);
        return push("/tokens");
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
      href: `/tokens`,
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">id</FormLabel>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter token"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter token usage"
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
                  <p className="flex items-center">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Editting Token Info...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Edit Token Info
                    <LucideEdit size={16} />
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

export default EditTokenComponent;
