"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Edit3, Loader2 } from "lucide-react";
import { createAccount } from "./action";
import { userSchema } from "./schema";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterComponent = () => {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      pin: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const data = new FormData();
      // Assuming values is an object with keys and values
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }
      console.log(data);
      const { success, message } = await createAccount(data);

      if (success === true) {
        toast.success(message);
        push("/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">SIGN UP</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="space-y-2">
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
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter pin..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password..."
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
                Signing Up...
              </p>
            ) : (
              <span className="flex items-center gap-1">
                Sign Up
                <Edit3 size={16} />
              </span>
            )}
          </Button>
          <Link className="text-sm block tracking-wider" href="/login">
            Already registered?{" "}
            <span className="font-semibold text-primary underline">Login</span>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default RegisterComponent;
