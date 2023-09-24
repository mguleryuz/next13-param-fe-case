"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../lib/store";
import { Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { resetAuth } from "../lib/store/slices/authSlice";
import useIsHydrated from "../hooks/useIsHydrated";
import Link from "next/link";

const navbarFrameStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 80,
  padding: "10px 30px 10px 30px",
  boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
};

export default function Navbar() {
  const isHydrated = useIsHydrated();
  const { isAuth, fullName } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div style={navbarFrameStyle}>
      <Link href="/">
        <Image
          src="/param_tech.svg"
          alt="param_tech_svg"
          width={120}
          height={40}
        />
      </Link>
      {isHydrated && isAuth && (
        <Space size={10}>
          <Button
            type="primary"
            size="small"
            onClick={() => dispatch(resetAuth())}
          >
            Çıkış Yap
          </Button>
          <UserOutlined />
          {fullName}
        </Space>
      )}
    </div>
  );
}
