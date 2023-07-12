import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
};

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
};

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

export const tabState = atom<Categories>({
  key: "tabState",
  default: Categories.TODO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const tabs = get(tabState);

    return toDos.filter((toDo) => toDo.category === tabs);
  },
});
