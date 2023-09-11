import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import LoginForm from "../LoginForm";

const LoginModel = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center border-none justify-center w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
          variant="outline"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Form</DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModel;
