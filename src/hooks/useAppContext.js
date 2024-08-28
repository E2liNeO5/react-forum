import { useContext } from "react";
import { AppContext } from "../components/default/AppContext";

export function useAppContext() {
  return useContext(AppContext)
}