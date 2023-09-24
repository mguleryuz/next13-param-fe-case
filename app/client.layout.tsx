"use client";

import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./lib/store";
import Login from "./components/Login";

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 30,
  padding: 50,
};

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Login isModalOpen={!isAuth} />
      <Layout style={layoutStyle}>
        <Navbar />
        <Content className="root-content" style={contentStyle}>{children}</Content>
      </Layout>
    </>
  );
}
