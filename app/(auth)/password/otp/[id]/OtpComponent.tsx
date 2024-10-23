"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatEmailTime";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { resendOTPEmail, verifyOTP } from "./action";
import { otpSchema } from "./schema";
import { toast } from "sonner";

const OtpComponent = () => {
  const [countdown, setCountdown] = useState(1500); // Initial countdown value in seconds
  const [isDisabled, setIsDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State for storing the user's email
  const { push } = useRouter();
  const { id } = useParams();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
      userId: id.toString(),
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return 1500; // Reset countdown for next use
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDisabled]);

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    try {
      console.log(values);
      const data = new FormData();

      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        data.append(key, values[key]); // Make sure to cast value to string if necessary
      });

      const { message, success, expired, email } = await verifyOTP(data);

      if (success === true) {
        setUserEmail(email); // Store the user's email
        setIsDisabled(expired);
        toast.success(message);
        return push(`/password/update/${id}`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailResend = async (email: string) => {
    console.log(email);
    // Send email resend request to server
    const { success, message } = await resendOTPEmail(email);
    if (success === true) {
      // Disable the button and start countdown
      setIsDisabled(true);
      setCountdown(1500); // Reset countdown to initial value
    } else {
      console.log("error resending email", message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel></FormLabel>
              <FormControl>
                <Input type="hidden" {...field} />
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
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP {...field} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="flex tracking-wide items-center gap-1 mt-3">
                <span>Enter the one-time password sent to your email.</span>
                <Button
                  variant="link"
                  onClick={() => handleEmailResend(userEmail)}
                  disabled={isDisabled}
                  className="p-0 tracking-wide"
                >
                  Resend Email
                </Button>
                {isDisabled && <span>in {formatTime(countdown)}</span>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full tracking-widest" type="submit">
          {form.formState.isSubmitting ? (
            <p className="flex items-center gap-1">
              <Loader2 size={15} className="text-white animate-spin" />
              Sending OTP...
            </p>
          ) : (
            <span className="flex items-center gap-1">
              Send OTP
              <MailCheck size={15} />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default OtpComponent;
