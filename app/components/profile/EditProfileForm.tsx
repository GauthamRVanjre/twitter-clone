"use client";
import { usersTypes } from "@/app/types/types";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileValidation } from "@/lib/validations/EditProfileValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface EditProfileFormProps {
  userDetails: usersTypes | undefined;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof EditProfileValidation>>({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      username: userDetails?.username,
      Bio: userDetails?.Bio,
      Location: userDetails?.Location,
      Website: userDetails?.Website,
    },
  });

  const onFinish = async (values: z.infer<typeof EditProfileValidation>) => {
    setIsLoading(true);

    console.log("values", values);
    try {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        toast.success("user profile updated successfully");
      } else {
        toast.error("something went wrong! try again");
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
          <ScrollArea className="h-[400px] ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white-600">Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="text"
                      placeholder="Enter your Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white-600">Enter Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      placeholder="Enter your Bio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white-600">
                    Enter Location
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      placeholder="Enter your Location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white-600">
                    Enter Website
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      placeholder="Enter your Website"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2" disabled={isLoading} type="submit">
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </>
  );
};

export default EditProfileForm;
