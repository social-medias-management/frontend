"use client";
import React from "react";
import TextInput from "@/components/shared/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/shared/Form";
import { useMutation } from "@tanstack/react-query";
import apiClients from "@/services/http-service";
import Button from "@/components/Button";
import { BodyBase } from "@/components/typography/BodyBase";
import Link from "next/link";
import { schema } from "@/app/(auth)/signin/page";
import { FormData } from "@/app/(auth)/signin/page";

const httpService = new apiClients("/users/update-password");

const Page = () => {
  const { mutate } = useMutation({
    mutationFn: httpService.create,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("data=", data);
    mutate(data);
  };
  return (
    <section className="min-w-full bg-primary-100">
      <Form
        className="item-center py-8 px-6 shadow-custom w-11/12 max-w-[500px]"
        handleSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="oldPassword"
          name="oldPassword"
          type="password"
          register={register}
          error={errors.password && errors.password.message}
        />

        <TextInput
          label="NewPassword"
          name="NewPassword"
          type="password"
          register={register}
          error={errors.password && errors.password.message}
        />
        <BodyBase className="self-end text-center" fontWeight="bold">
          Update your password
        </BodyBase>

        <Button
          type="submit"
          impact="bold"
          tone="default"
          shape="rounded"
          size="large"
        >
          Change Password
        </Button>
      </Form>
    </section>
  );
};

export default Page;
