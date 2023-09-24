"use client";

import { Button, Card, Image, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../lib/store/slices/cartSlice";

export default function SuccessPage() {
  const route = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart());
  }, [])

  return (
    <Card style={{ margin: "auto" }}>
      <Space
        direction="vertical"
        size={30}
        style={{ alignItems: "center" }}
      >
        <Image src="/success_banner.svg" preview={false} />
        <Button type="primary" onClick={() => route.push("/")}>
          Baştan Başla
        </Button>
      </Space>
    </Card>
  );
}
