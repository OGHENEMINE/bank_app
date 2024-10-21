"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";

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
import { Loader2, MailPlus } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/interface";
import { useRouter } from "next/navigation";
import { recoverySchema } from "./schema";
import { sendOTPEmail } from "./action";
import { toast } from "sonner";

const RecoveryComponent = () => {
  const { checkUser } = useContext(AuthContext) as AuthContextInterface;
  const { push } = useRouter();

  const form = useForm<z.infer<typeof recoverySchema>>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = async (values: z.infer<typeof recoverySchema>) => {
    try {
      const data = new FormData();
  
      (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
        data.append(key, values[key]);
      });
      
      const res = await sendOTPEmail(data);
  
      if ('success' in res && res.success) {
        if ('id' in res) {
          toast.success(res.message);
          return push(`/password/otp/${res.id}`);
        } else {
          toast.error("Unexpected response format: ID missing.");
        }
      } else {
        toast.error(res.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };
  

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Forgot Password</h1>
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
          </div>
          <Button className="w-full tracking-widest" type="submit">
            {form.formState.isSubmitting ? (
              <p className="flex items-center gap-1">
                <Loader2 size={15} className="text-white animate-spin" />
                Sending Email...
              </p>
            ) : (
              <span className="flex items-center gap-1">
                Send Email
                <MailPlus size={17}/>
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

export default RecoveryComponent;
