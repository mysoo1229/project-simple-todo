import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";
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

const ButtonDelete = styled.button`
  position: relative;
  width: 18px;
  height: 18px;
  margin-left: auto;
  background: #ccc;
  border-radius: 9px;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 8px;
    left: 4px;
    width: 10px;
    height: 2px;
    background: #fff;
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

function ToDoItem({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

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

  const deleteToDo = () => {
    setToDos((toDos) => {
      return toDos.filter((toDo) => toDo.id !== id);
    })
  };

  return (
    <Item>
      <ButtonWrap>
        {categories.map((item, index) => (
          <ButtonCategory
            key={index}
            name={item}
            onClick={changeCategory}
            disabled={item === category && true}
          >
            {item}
          </ButtonCategory>
        ))}
        <ButtonDelete onClick={deleteToDo} aria-label="Delete task" />
      </ButtonWrap>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
