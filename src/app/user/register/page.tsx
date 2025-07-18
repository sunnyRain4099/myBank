"use client";
import { userRegisterUsingPost } from "@/api/userController";
import { AppDispatch } from "@/stores";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/*
 *用户登录页面
 */

const UserRegisterPage: React.FC = () => {
  /*
   *提交
   */
  const [form] = ProForm.useForm();
  const router = useRouter();

  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功");
        // 保存用户登录状态
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            height={44}
            width={44}
            alt="网站logo"
          ></Image>
        }
        title="用户注册"
        subTitle="面试刷题网站"
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        onFinish={doSubmit}
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
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入确认密码"}
          rules={[
            {
              required: true,
              message: "密码不一样，请重新输入",
            },
          ]}
        />

        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有帐号？
          <Link href="/user/login">去登录</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
