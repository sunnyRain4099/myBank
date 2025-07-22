"use serve";
import "./index.css";
import { Avatar, Button, Card, Divider, Flex, Menu, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";
/*
 *题目详情页
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;

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

  return (
    <div id="questionPage">
      <QuestionCard question={question}></QuestionCard>
    </div>
  );
}
