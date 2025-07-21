"use client";
import { Avatar, Card, List, Tag, Typography } from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "../TagList";

interface Props {
  questionBankId: number;
  questionList?: API.QuestionVO[];
  cardTitle?: string;
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBankId } = props;

  return (
    <Card className="question-bank-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList}></TagList>}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/banks/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
