import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
  category: string;
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

export const initialCategories = ["TO DO", "DOING", "DONE"];

export const categoryState = atom<string>({
  key: "categoryState",
  default: initialCategories[0],
});

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: initialCategories,
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const activeCategory = get(categoryState);

    return toDos.filter((toDo) => toDo.category === activeCategory);
  },
});
