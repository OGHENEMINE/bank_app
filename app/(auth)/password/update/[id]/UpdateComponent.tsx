"use client";
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
import { Loader2, Rss, Send } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/interface";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { updatePassword } from "./action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updatePasswordSchema } from "./schema";

const UpdateComponent = () => {
  const { checkUser } = useContext(AuthContext) as AuthContextInterface;
  const { push } = useRouter();
  const { id } = useParams();

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      userId: id.toString()!,
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
    try {
      const data = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          data.append(key, values[key]);
        }
      }
      const res = await updatePassword(data);
      if (res.success === true) {
        push("/login");
        return toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Update Password</h1>
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
                <FormItem className="sr-only">
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input type="hidden" {...field} />
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
                      placeholder="Enter new password..."
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
                updating...
              </p>
            ) : (
              <span className="flex items-center gap-1">
                Update
                <Rss size={16} />
              </span>
            )}
          </Button>
          <Link className="text-sm block tracking-wider" href="/login">
            Already have an account?{" "}
            <span className="font-semibold text-primary underline">Login</span>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default UpdateComponent;
