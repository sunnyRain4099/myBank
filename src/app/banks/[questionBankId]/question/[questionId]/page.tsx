"use serve";
import "./index.css";
import { Avatar, Button, Card, Divider, Flex, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
/*
 *题库题目详情页
 */
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  //获取题库详情
  let banks = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    banks = bankRes.data;
    // console.log(banks, "banks");
  } catch (e) {
    console.error("获取题库详情失败，" + e.message);
  }

  if (!banks) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  //获取题目列表
  let question = undefined;

  try {
    const bankRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = bankRes.data;
    // console.log(question, "question");
  } catch (e) {
    console.error("获取题库详情失败，" + e.message);
  }

  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  //题目菜单列表
  const questionMenuItemList = (banks.questionPage?.records || []).map((q) => {
    return {
      key: q.title,
      label: q.id,
    };
  });

  //获取第一道题
  let firstQuestionId;
  if (banks.questionPage?.records && banks.questionPage.records.length > 0) {
    firstQuestionId = banks.questionPage.records[0];
  }

  return (
    <div id="banksQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {banks.title}
          </Title>
        </Sider>
        <Content>题目详情</Content>
      </Flex>
    </div>
  );
}
