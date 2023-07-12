import { useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import { styled } from "styled-components";
import { toDoSelector } from "../atoms";
import ToDoTabs from "./ToDoTabs";

const Container = styled.div`
  max-width: 460px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 32px;
  letter-spacing: 3px;
  font-weight: bold;
`;

const ResultList = styled.ul`
  margin-top: 30px;
  padding-top: 12px;
  border-top: 1px dashed #fff;
`;


function ToDoPage() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Container>
      <Title>TO DO LIST</Title>
      <ToDoTabs />
      <ToDoForm />
      <ResultList>
        {toDos.map((toDo) => (
          <ToDoItem
            key={toDo.id}
            {...toDo}
          />
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoPage;
