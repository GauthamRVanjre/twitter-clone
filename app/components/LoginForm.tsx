"use client";
import { LoginFormValidation } from "@/lib/validations/LoginFormValidation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFinish = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.error) {
        toast.error("Invalid Credentials");
      }
      if (result?.url) {
        toast.success("login successfull");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="glass rounded-2xl"
                    type="email"
                    placeholder="Enter your Email"
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
                <FormLabel className="text-white-600">Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="glass rounded-2xl"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>

          <FormDescription className="text-white-600">
            New to twitter. Sign up{" "}
            <a href="/SignUp" className="hover:text-gray-700 cursor-pointer">
              Here
            </a>
          </FormDescription>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
