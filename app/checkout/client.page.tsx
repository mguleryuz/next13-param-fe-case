"use client";

import { Button, Card, Col, DatePicker, Form, Input, Row, Space } from "antd";
import { useAppSelector } from "../lib/store";
import Frame from "../components/ui/Frame";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export type CheckOutPostArgs = {
  packageIds: string[];
  cardHolderName: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
  totalAmount: number;
};

async function postPayment(args: CheckOutPostArgs) {
  const res = await fetch(
    "https://62f9ee323c4f110faa8ed350.mockapi.io/api/payment",
    {
      method: "POST",
      body: JSON.stringify(args),
    }
  );
  if (!res.ok) throw new Error("Payment failed");
  return;
}

export default function ClientCheckoutPage({
  aggrement,
}: {
  aggrement: string;
}) {
  const { packageIds, totalAmount, packages, isActive, isAuth } =
    useAppSelector((state) => ({ ...state.cart, ...state.auth }));

  const route = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (
    values: Omit<CheckOutPostArgs, "totalAmount" | "packageIds">
  ) => {
    setIsSubmitting(true);

    await postPayment({
      ...values,
      totalAmount,
      packageIds: packageIds.map((i) => String(i)),
    });

    setIsSubmitting(false);

    route.push("/success");
  };

  useEffect(() => {
    if (!isActive || !isAuth) redirect("/");
  }, [isActive, isAuth]);

  return (
    <Form
      name="checkout"
      layout="vertical"
      onFinish={onFinish}
      style={{ display: "inherit", justifyContent: "inherit", gap: "inherit" }}
    >
      <Card>
        <h3>Kart Bilgileri</h3>
        <Frame border style={{ padding: 20, marginTop: 20, marginBottom: 40 }}>
          <Row>
            <Form.Item
              name="cardHolderName"
              label="Kart Üzerindeki İsim Soyisim"
              rules={[
                {
                  required: true,
                  message: "Lütfen kart Üzerindeki isim ve soyisimi giriniz!",
                },
              ]}
            >
              <Input size="large" name="cardHolderName" />
            </Form.Item>
          </Row>

          <Row gutter={20}>
            <Col flex="4">
              <Form.Item
                name="cardNumber"
                label="Kart Numarası"
                rules={[
                  {
                    required: true,
                    message: "Lütfen kart numarası giriniz!",
                  },
                ]}
              >
                <Input size="large" name="cardNumber" />
              </Form.Item>
            </Col>

            <Col flex="2">
              <Form.Item
                name="expireDate"
                label="Son Kul. Tar."
                rules={[
                  {
                    required: true,
                    message: "Lütfen Son Kul. Tar. giriniz!",
                  },
                ]}
              >
                <DatePicker format="DD/YY" size="large" name="expireDate" />
              </Form.Item>
            </Col>

            <Col flex="2">
              <Form.Item
                name="cvv"
                label="CVV/CVC"
                rules={[
                  {
                    required: true,
                    message: "Lütfen cvv/cvc giriniz!",
                  },
                ]}
              >
                <Input.Password size="large" name="cvv" />
              </Form.Item>
            </Col>
          </Row>
        </Frame>
        <h3>Sözleşme</h3>
        <Frame
          border
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={{ __html: aggrement }}
        />
      </Card>

      <Card style={{ height: "max-content" }}>
        <Space size={20} direction="vertical">
          <h3>Sepetteki Paketler</h3>
          {packages.map((i) => (
            <Frame flex bg style={{ alignItems: "center", gap: 60 }}>
              <p>{i.name}</p>
              <h3>{i.amount + i.currency}</h3>
            </Frame>
          ))}
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            style={{ width: "100%" }}
            disabled={!isActive || !isAuth}
            loading={isSubmitting}
          >
            Ödeme Yap
          </Button>
        </Space>
      </Card>
    </Form>
  );
}
