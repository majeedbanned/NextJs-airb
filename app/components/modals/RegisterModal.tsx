"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import usLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const LoginModal = usLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    LoginModal.onOpen();
    registerModal.onClose();
  }, [LoginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        //alert();
        toast.error("error");
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  const bodyContent = (
    <div
      className="
    flex flex-col gap-4"
    >
      <Heading title="Welcome to my site" subTitle="Create an account" />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-3">
      <hr></hr>
      <Button
        icon={FcGoogle}
        onClick={() => {}}
        outline
        label="Continue with Google"
      />
      <Button
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
        outline
        label="Continue with Github"
      />
      <div
        className="
      mt-4
      text-center
      text-neutral-500"
      >
        <div className="flex flex-row items-center justify-center gap-3 text-center">
          <div>Already have account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
