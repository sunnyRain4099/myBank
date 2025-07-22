"use client";
import { Avatar, Card, List, Tag, Typography } from "antd";
import "./index.css";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import TagList from "../TagList";
import MdViewer from "../MdViewer";

interface Props {
  question?: API.QuestionVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question = [] } = props;

  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList}></TagList>
        <div style={{ marginBottom: "16px" }}></div>
        <MdViewer value={question.content}></MdViewer>
      </Card>
      <div style={{ marginBottom: "16px" }}></div>
      <Card title="推荐答案">
        <MdViewer value={question.answer}></MdViewer>
      </Card>
    </div>
  );
};

export default QuestionCard;
