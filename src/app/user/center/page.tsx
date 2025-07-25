"use client";
import { Avatar, Card, Col, Row } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";
import CalendarChart from "./components/CalendarChart";

/*
 *用户中心页面
 */
export default function UserCenterPage() {
  const LoginUser = useSelector((state: RootState) => state.loginUser);
  const user = LoginUser;
  //控制菜单栏的Tab高亮
  const [activeTabKey, setActiveTabKey] = useState("record");

  return (
    <div id="userCenterPage" className="userCenterPage">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              src={user.userAvatar || "/assets/logo.png"}
              size={72}
            ></Avatar>
            <div style={{ marginBottom: 16 }}></div>
            <Card.Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName || "墨小菊"}
                </Title>
              }
            />
            <Paragraph type="secondary">{user.userProfile}</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "other",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
              console.log(user);
            }}
          >
            {activeTabKey === "record" && (
              <div>
                <CalendarChart></CalendarChart>
              </div>
            )}
            {activeTabKey === "other" && <div>other</div>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
