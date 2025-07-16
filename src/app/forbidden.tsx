import { Button, Result } from "antd";
/*
 * @Description: 403页面
 */
const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，你没有权限访问此页面"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
};
export default Forbidden;
