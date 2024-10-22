"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";

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
import { Loader2, LogIn } from "lucide-react";
import { loginSchema } from "./schema";
import { loginUser } from "./action";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthContextInterface } from "@/Interface";

const LoginComponent = () => {
  const { checkUser } = useContext(AuthContext) as AuthContextInterface;
  const { push } = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const data = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }
      const {message, success} = await loginUser(data);
      if (success) {
        await checkUser();
        toast.success(message);
        return push("/dashboard");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">SIGN IN</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="space-y-2">
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
          </div>
          <Button className="w-full tracking-widest" type="submit">
            {form.formState.isSubmitting ? (
              <p className="flex items-center gap-1">
                <Loader2 size={15} className="text-white animate-spin" />
                Sigining In...
              </p>
            ) : (
              <span className="flex items-center gap-1">
                Sign In
                <LogIn size={15} />
              </span>
            )}
          </Button>
          <div className="flex items-center tracking-wider mt-4 justify-between w-full text-sm">
            <Link href="/register">
              Don&apos;t have an account?{" "}
              <span className="font-semibold text-primary underline">
                Register
              </span>
            </Link>
            <Link
              className="font-semibold text-primary underline"
              href="/password/recovery"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginComponent;
