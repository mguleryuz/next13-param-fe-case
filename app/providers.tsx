"use client";

import React from "react";
import ReduxProvider from "./lib/store/ReduxProvider";

import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "./lib/AntdRegistry";
import theme from "./lib/themeConfig";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </StyledComponentsRegistry>
    </ReduxProvider>
  );
}
