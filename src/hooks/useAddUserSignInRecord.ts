import React, { useState, useEffect } from "react";
import "github-markdown-css/github-markdown-light.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import {
  addUserSignInUsingPost,
  getUserSignInRecordUsingGet,
} from "@/api/userController";
import { message } from "antd";

/**
 * 添加用户刷题签到记录钩子
 * @param props
 * @constructor
 */
const useAddUserSignInRecord = () => {
  // 加载状态
  const [loading, setLoading] = useState<boolean>();

  //请求后端获取数据
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost({});
    } catch (e) {
      message.error("获取签到数据数据失败" + e);
    }
    setLoading(false);
  };

  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
