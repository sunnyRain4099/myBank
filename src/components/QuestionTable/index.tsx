"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "../TagList";

interface Props {
  //默认值
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  //默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}
/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  //题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || []
  );
  //题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  //用于判断是否首屏加载
  const [init, setInit] = useState<boolean>(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },

    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },
  ];

  return (
    <ProTable<API.QuestionVO>
      headerTitle={"查询表格"}
      actionRef={actionRef}
      size="large"
      pagination={{
        pageSize: 12,
        showTotal: (total) => `总共${total}条`,
        showSizeChanger: false,
        total,
      }}
      // as
      // TablePaginationConfig
      search={{
        labelWidth: "auto",
      }}
      form={{
        initialValues: defaultSearchParams,
      }}
      dataSource={questionList}
      rowKey={(record) => record.id ?? null}
      request={async (params, sort, filter) => {
        if (init) {
          setInit(false);
          if (defaultQuestionList && defaultTotal) {
            return;
          }
        }
        const sortField = Object.keys(sort)?.[0] || "createTime";
        const sortOrder = sort?.[sortField] || "descend";

        const { data, code } = await listQuestionVoByPageUsingPost({
          ...params,
          sortField,
          sortOrder,
          ...filter,
        } as API.QuestionQueryRequest);

        const newData = data?.records || [];
        const newTotal = data?.total || 0;
        //更新状态
        setQuestionList(newData);
        setTotal(newTotal);
        return {
          success: code === 0,
          data: newData,
          total: newTotal,
        };
      }}
      columns={columns}
    />
  );
};
export default QuestionTable;
