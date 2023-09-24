"use client";

import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { setAuth } from "../lib/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useIsHydrated from "../hooks/useIsHydrated";

async function signUp(fullName: string, email: string) {
  const res = await fetch(
    "https://62f9ee323c4f110faa8ed350.mockapi.io/api/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
      }),
    }
  );

  if (!res.ok) throw new Error("Error Posting SignUp");
}

export default function Login({ isModalOpen }: { isModalOpen: boolean }) {
  const isHydrated = useIsHydrated();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: { fullName: string; email: string }) => {
    setIsSubmitting(true);

    await signUp(values.fullName, values.email);

    dispatch(setAuth({ ...values, isAuth: true }));
    setIsSubmitting(false);
  };

  if (!isHydrated) return <></>

  return (
    <Modal open={isModalOpen} footer={null} closable={false}>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Adınız Soyadınız"
          rules={[
            {
              required: true,
              message: "Lütfen adınızı ve soyadınızı giriniz!",
            },
          ]}
        >
          <Input size="large" prefix={<UserOutlined />} name="fullName" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Adresiniz"
          rules={[
            {
              type: "email",
              message: "Lütfen geçerli bir email adresi giriniz!",
            },
            {
              required: true,
              message: "Lütfen email adresinizi giriniz!",
            },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} name="email" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
            loading={isSubmitting}
          >
            Devam Et
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
