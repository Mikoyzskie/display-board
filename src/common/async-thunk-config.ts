import { RootState } from "./root-state.type";
import { AppDispatch } from "./app-dispatch-type";
import { extraArgument } from "@/redux/store";

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};

export { type AsyncThunkConfig };
