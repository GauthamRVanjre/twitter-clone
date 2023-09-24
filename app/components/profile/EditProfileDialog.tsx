import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfileDialog = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <EditProfileForm />
    </>
  );
};

export default EditProfileDialog;
