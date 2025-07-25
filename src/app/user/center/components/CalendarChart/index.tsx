import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "github-markdown-css/github-markdown-light.css";
import "bytemd/dist/index.css";
import dayjs from "dayjs";
import "highlight.js/styles/vs.css";
import "./index.css";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import { message } from "antd";

interface Props {}

const plugins = [gfm(), highlight()];

/**
 * 刷题日历图表
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
  const {} = props;
  // 计算图表需要的数据
  const year = new Date().getFullYear();
  // 签到日期列表（[1, 200]，表示第 1 和第 200 天有签到记录）
  const [dataList, setDataList] = useState<number[]>([]);

  //请求后端获取数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordUsingGet({
        year: year,
      });
      setDataList(res.data);
      // console.log(res.data);
    } catch (e) {
      message.error("获取签到数据数据失败" + e);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const optionsData = dataList.map((dayOfYear, index) => {
    // 计算日期字符串
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  const option = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: `${year}`,
      left: 20,
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year}年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="calendar-chart" option={option} />;
};

export default CalendarChart;
