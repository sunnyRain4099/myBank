"use client";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { updateQuestionUsingPost } from "@/api/questionController";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  questionId: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  // //索取所属题库列表
  // const getCurrentQuestionBankIdList = async () => {
  //   try {
  //     const res = await listQuestionBankQuestionVoByPageUsingPost({
  //       questionId,
  //       pageSize: 20,
  //     });
  //     const list = (res.data?.records ?? []).map((item) => item.questionBankId);

  //     form.setFieldValue("questionBankIdList", list);
  //   } catch (e) {
  //     console.error("获取题目所属题库列表详情失败，" + e.message);
  //   }
  // };

  // useEffect(() => {
  //   console.log(questionId, "questionId");

  //   if (questionId) {
  //     getCurrentQuestionBankIdList();
  //   }
  // }, [questionId]);

  // //获取题库列表
  // const getQuestionBankList = async () => {
  //   //题库全量获取
  //   const pageSize = 200;
  //   try {
  //     const res = await listQuestionBankVoByPageUsingPost({
  //       pageSize,
  //       sortField: "createTime",
  //       sortOrder: "descend",
  //     });
  //     setQuestionBankList(res.data?.records ?? []);
  //   } catch (e) {
  //     console.error("获取题库列表失败，" + e.message);
  //   }
  // };

  // useEffect(() => {
  //   getQuestionBankList();
  // }, []);
  const fetchData = async () => {
    try {
      const [questionBankRes, questionBankListRes] = await Promise.all([
        listQuestionBankQuestionVoByPageUsingPost({
          questionId,
          pageSize: 20,
        }),
        listQuestionBankVoByPageUsingPost({
          pageSize: 200,
          sortField: "createTime",
          sortOrder: "descend",
        }),
      ]);

      // 处理题目所属题库ID列表
      const list = (questionBankRes.data?.records ?? []).map(
        (item) => item.questionBankId
      );
      form.setFieldValue("questionBankIdList", list);

      // 设置题库列表
      setQuestionBankList(questionBankListRes.data?.records ?? []);
    } catch (e) {
      console.error("获取数据失败，" + e.message);
    }
  };

  // 调用并发方法
  useEffect(() => {
    console.log(questionId, "questionId");

    if (questionId) {
      fetchData();
    }
  }, [questionId]);

  return (
    <Modal
      title={"更新"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.Item label="所属题库" name="questionBankIdList">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            // defaultValue={["a10", "c12"]}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}
            options={questionBankList.map((questionBank) => ({
              label: questionBank.title,
              value: questionBank.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
