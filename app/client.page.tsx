"use client";

import { Button, Card, Divider, Space } from "antd";
import Package, { PackageProps } from "./components/Package";
import { useAppSelector } from "./lib/store";
import { useRouter } from "next/navigation";

export default function HomePageClient({
  packages,
}: {
  packages: PackageProps[];
}) {
  const route = useRouter();
  const { packageIds, totalAmount, isActive, currency } = useAppSelector(
    (state) => state.cart
  );

  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        route.push("/checkout");
      }}
    >
      <Card>
        <Space
          wrap
          size={36}
          style={{
            padding: "10px 0 10px 0",
            maxHeight: 500,
            overflowY: "scroll",
            justifyContent: "center",
          }}
        >
          {packages?.map?.((i, index) => {
            const props = {
              ...i,
              isSelected: packageIds.some((s) => s === i.id),
            };
            return <Package key={index} {...props} />;
          })}
        </Space>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            Seçilen Paket Tutarı: <b>{totalAmount + currency}</b>
          </p>
          <Button
            htmlType="submit"
            type="primary"
            disabled={!isAuth || !isActive}
          >
            Devam Et
          </Button>
        </div>
      </Card>
    </form>
  );
}
