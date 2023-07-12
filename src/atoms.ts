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

export let tabArray = ["TO DO", "DOING", "DONE"];

export const tabState = atom<string>({
  key: "tabState",
  default: tabArray[0],
});

export const tabArrayState = atom<string[]>({
  key: "tabArrayState",
  default: tabArray,
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const tabs = get(tabState);

    return toDos.filter((toDo) => toDo.category === tabs);
  },
});
