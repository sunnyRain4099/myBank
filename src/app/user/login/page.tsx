"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import Image from "next/image";
import Link from "next/link";

/*
 *用户登录页面
 */

const userLoginPage: React.FC = () => {
  return (
    <div id="userLoginPage">
      <LoginForm
        logo={
          <Image
            src="/assets/logo.png"
            height={44}
            width={44}
            alt="网站logo"
          ></Image>
        }
        title="用户登录"
        subTitle="面试刷题网站"
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        />

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link href="/user/register"></Link>
          去注册
        </div>
      </LoginForm>
    </div>
  );
};

export default userLoginPage;
