"use serve";
import "./index.css";
import { Avatar, Button, Card, Divider, Flex, Typography } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
/*
 *题库详情页
 */
export default async function BanksPage({ params }) {
  const { questionBankId } = params;
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
  //获取第一道题
  let firstQuestionId;
  if (banks.questionPage?.records && banks.questionPage.records.length > 0) {
    firstQuestionId = banks.questionPage.records[0].id;
  }

  return (
    <div id="banksPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={banks.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {banks.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{banks.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/banks/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <QuestionList
        questionBankId={questionBankId}
        questionList={banks.questionPage?.records ?? []}
        cardTitle={`题目列表（${banks.questionPage?.total || 0}）`}
      />
    </div>
  );
}
