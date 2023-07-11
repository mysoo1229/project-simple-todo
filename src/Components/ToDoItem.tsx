import { IToDo } from "../atoms";
import { styled } from "styled-components";

const Item = styled.li`
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;

  span {
    display: block;
    font-size: 15px;
    line-height: 1.3;
    color: #222;
  }
`;

function ToDoItem({ id, text, category }: IToDo) {
  return (
    <Item>
      <span>{text}</span>
    </Item>
  );
}

export default ToDoItem;
