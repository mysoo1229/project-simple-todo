import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
};

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);

    return [
      toDos.filter((toDo) => toDo.category === "TODO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
