import ACCESS_ENUM from "./accessEnum";
/*
 * @Description: 检查权限
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess: string = ACCESS_ENUM.NOT_LOGIN
) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN; // 用户权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  if (ACCESS_ENUM.USER === needAccess) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
