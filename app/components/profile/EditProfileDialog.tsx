import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import EditProfileForm from "./EditProfileForm";
import { usersTypes } from "@/app/types/types";

interface EditProfileDialogProps {
  userDetails: usersTypes | undefined;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  userDetails,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <EditProfileForm userDetails={userDetails} />
    </>
  );
};

export default EditProfileDialog;
