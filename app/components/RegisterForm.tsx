"use client";
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
import toast from "react-hot-toast";
import { SignUpFormValidation } from "@/lib/validations/SignUpFormValidation";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onFinish = async (values: z.infer<typeof SignUpFormValidation>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        toast.success("user created successfully");
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
        }
        window.location.href = "/";
      }

      const data = await response.json();
      if (data.message === "body cannot be empty") {
        toast.error("make sure to fill all the fields");
      } else if (data.message === "email already exists") {
        toast.error("user already exists");
      }
    } catch (error) {
      toast.error("something went wrong");
    }

    form.reset();
    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFinish)}
          className="space-y-8 bg-gray-800 p-4 w-[500px]"
        >
          <div className="text-center">Sign Up for an exciting journey</div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="glass rounded-2xl"
                    type="text"
                    placeholder="Enter your Name"
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
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
