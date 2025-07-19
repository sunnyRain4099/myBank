"use serve";
import Title from "antd/es/typography/Title";
import "./index.css";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/*
 *题库列表页面
 */
export default async function BankPage() {
  let questionBankList = [];
  const pageSize = 200;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (error) {
    console.error("获取题库失败" + error.message);
  }

  return (
    <div id="homePage" className="max-width-content">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
    </div>
  );
}
