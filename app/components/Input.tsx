import React from "react";

type InputProps = {
  placeholder?: string;
  value?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  label,
  disabled,
  onChange,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
            w-80
            p-4
            text-lg
            border-2
            border-neutral-600
            rounded-md
            outline-none
            mr-2
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
        "
    />
  );
};

export default Input;
