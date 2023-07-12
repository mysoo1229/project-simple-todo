import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, tabArrayState, toDoState } from "../atoms";
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
`;

const ButtonCategory = styled.button<{ name: string }>`
  padding: 3px 6px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  background: ${(props) => 
    props.name === 'TO DO' ? '#ff6262'
    : props.name === 'DOING' ? '#deb034'
    : props.name === 'DONE' ? '#3bb98b'
    : '#444'
  };
  text-transform: uppercase;
  color: #fff;

  &:disabled {
    background: #ccc;
  }
`;

function ToDoItem({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const tabArray = useRecoilValue(tabArrayState);

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
        {tabArray.map((tab, index) => (
          <ButtonCategory
            key={index}
            name={tab}
            onClick={changeCategory}
            disabled={category === tab && true}
          >
            {tab}
          </ButtonCategory>
        ))}
      </ButtonWrap>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
