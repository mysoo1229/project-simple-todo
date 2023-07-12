import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import { styled } from "styled-components";

const Item = styled.li`
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: #fff;

  span {
    display: block;
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.3;
    color: #222;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  button {
    padding: 3px 6px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;

    + button {
    }

    &:disabled {
      background: #ccc;
    }
  }
`;

const ButtonToDo = styled.button`
  background: #ff6262;
`;

const ButtonDoing = styled.button`
  background: #deb034;
`;

const ButtonDone = styled.button`
  background: #3bb98b;
`;

function ToDoItem({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;

    setToDos((oldToDos) => {
      const currentIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const currentToDo = {
        id,
        text,
        category: name as any
      }

      return [
        ...oldToDos.slice(0, currentIndex),
        currentToDo,
        ...oldToDos.slice(currentIndex + 1),
      ];
    });
  };

  return (
    <Item>
      <ButtonWrap>
        <ButtonToDo
          name={Categories.TODO}
          onClick={changeCategory}
          disabled={category === Categories.TODO && true}
        >
          To Do
        </ButtonToDo>
        <ButtonDoing
          name={Categories.DOING}
          onClick={changeCategory}
          disabled={category === Categories.DOING && true}
        >
          Doing
        </ButtonDoing>
        <ButtonDone
          name={Categories.DONE}
          onClick={changeCategory}
          disabled={category === Categories.DONE && true}
        >
          Done
        </ButtonDone>
      </ButtonWrap>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
