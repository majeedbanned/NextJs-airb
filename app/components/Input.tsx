"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute 
      left-2
      top-5
      text-neutral-700
      "
        ></BiDollar>
      )}

      <input
        id={id}
        disabled={disabled}
        className={`peer
        w-full
        rounded-md
        border-2
        bg-white
        p-4
        pt-6
        font-light
        outline-none
        transition
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${formatPrice ? "pl-9" : "pl-7"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-neutral-300"}

        `}
        type={type}
        placeholder=" "
        {...register(id, { required })}
      ></input>
      <label
        className={` text-md
      absolute
      
      top-5
      z-50
      origin-[0]
      -translate-y-3
      transform
      duration-150
      ${formatPrice ? "left-9" : "left-4"}
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      peer-placeholder-shown:translate-y-0
      peer-placeholder-shown:scale-100
      peer-focus:-translate-y-4
      peer-focus:scale-75

      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
