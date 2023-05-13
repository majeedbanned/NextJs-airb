"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    LoginModal.onClose();
    registerModal.onOpen();
  }, [LoginModal, registerModal]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(true);
      if (callback?.ok) {
        console.log(callback);
        toast.success("Logged In");
        router.refresh();
        setIsLoading(false);

        LoginModal.onClose();
      }

      if (callback?.error) {
        setIsLoading(false);
        toast.error(callback.error);
      }
    });
  };
  const bodyContent = (
    <div
      className="
    flex flex-col gap-4"
    >
      <Heading title="Welcome Back" subTitle="Login to your account" />
      <Input
        id="email"
        label="Email"
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
          <div>First Time using site?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
