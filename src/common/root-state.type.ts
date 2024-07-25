import { store } from "@/redux/store";

type RootState = ReturnType<typeof store.getState>;

export { type RootState };
