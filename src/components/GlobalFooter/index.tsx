// 全局底部栏组件
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/components/GlobalFooter/index.css";

export default function GlobalFooter() {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 我的面试题库</div>
      <div>
        <Link href="https://github.com/sunnyRLinkin4099/myBank" target="_blank">
          我的的Github
        </Link>
      </div>
    </div>
  );
}
