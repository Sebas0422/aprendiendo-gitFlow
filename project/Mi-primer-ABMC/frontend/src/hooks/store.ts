import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispacth: () => AppDispatch = useDispatch;