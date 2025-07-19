"use client";
import { Avatar, Card, List, Tag, Typography } from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "../TagList";

interface Props {
  questionList?: API.QuestionVO[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [] } = props;

  return (
    <Card className="question-bank-list">
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList}></TagList>}>
            <List.Item.Meta
              title={<Link href={`/question/${item.id}`}>{item.title}</Link>}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
