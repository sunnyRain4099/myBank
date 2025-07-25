import { configureStore } from "@reduxjs/toolkit";
import loginUser from "@/stores/loginUsers";

const store = configureStore({
  reducer: {
    // 在这里存放状态
    loginUser: loginUser,
  },
});

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
