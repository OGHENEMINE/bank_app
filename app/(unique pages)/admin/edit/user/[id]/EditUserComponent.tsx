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
import { EditIcon, Loader2, LucideEdit, PlusCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { editUserSchema } from "./schema";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { useEffect } from "react";
import { editUserInfo, getSpecificUser } from "./actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUserComponent = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      userId: id.toString(),
      email: "",
      firstname: "",
      lastname: "",
      pin: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, user, message } = await getSpecificUser(id as string);

        if (success) {
          toast.success(message);
          form.setValue("email", user.email);
          form.setValue("firstname", user.firstname);
          form.setValue("lastname", user.lastname);
          form.setValue("role", user.role);
          form.setValue("pin", user.pin);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id, form]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
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

      const { success, message } = await editUserInfo(data);

      if (success) {
        toast.success(message);
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
      href: `/user/${id}`,
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
            Edit User Information
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
                  name="userId"
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
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter firstname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter lastname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user role" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectGroup>
                              <SelectLabel>Currency</SelectLabel>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="customer">Customer</SelectItem>
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
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter pin..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
              <Button className="w-full tracking-widest" type="submit">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center">
                    <Loader2 size={15} className="text-white animate-spin" />
                    Editting User Detail...
                  </p>
                ) : (
                  <span className="flex items-center gap-1">
                    Edit User Info
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

export default EditUserComponent;
