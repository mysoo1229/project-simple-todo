import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
};

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});
