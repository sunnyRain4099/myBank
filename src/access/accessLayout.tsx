import { usePathname } from "next/navigation";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import { findAllMenuItemByPath } from "../../public/config/menu";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";
import Forbidden from "@/app/forbidden";
import { MenuDataItem } from "@ant-design/pro-components";

/*
 *同意权限校验拦截器
 */
const AccessLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const pathname: string = usePathname(); //获取当前路由
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const menu = findAllMenuItemByPath(pathname) || {};
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);

  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
};

export default AccessLayout;
