import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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

const { persistAtom } = recoilPersist({
  key: "toDoStorage",
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
  effects_UNSTABLE: [persistAtom],
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
