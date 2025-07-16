"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";

import { Dropdown, Input, Popover, theme } from "antd";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
// import { menus } from "../../../public/config/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

interface Props {
  children: React.ReactNode;
}

export default function User({ children }: Props) {
  const pathname = usePathname();

  const loginUser = useSelector((state: RootState) => state.loginUser);
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      主页面
    </div>
  );
}
