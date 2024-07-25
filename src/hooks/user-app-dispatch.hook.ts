import { useDispatch } from "react-redux";

import { AppDispatch } from "@/common/app-dispatch-type";

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
