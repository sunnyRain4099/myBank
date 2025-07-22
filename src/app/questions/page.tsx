"use serve";
import Title from "antd/es/typography/Title";
import "./index.css";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";

/*
 *题目列表页面
 */
export default async function QuestionsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const { q: searchText } = searchParams; //获取搜索参数
  //题目列表和总数
  let questionList = [];
  const pageSize = 12;
  let total = 0;
  try {
    const res = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
  } catch (error) {
    console.error("获取题目列表失败" + error.message);
  }

  return (
    <div id="questionPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      ></QuestionTable>
    </div>
  );
}
