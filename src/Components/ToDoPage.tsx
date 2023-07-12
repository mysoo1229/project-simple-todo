import { useRecoilState, useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import { styled } from "styled-components";
import { Categories, tabState, toDoSelector } from "../atoms";

const Container = styled.div`
  max-width: 460px;
  margin: 0 auto;
  padding: 4dvb 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 32px;
  letter-spacing: 3px;
  font-weight: bold;
`;

const TabWrap = styled.div`
  display: flex;
  margin: 30px 0 16px;
  padding: 2px;
  border-radius: 8px;
  background: #fff;

  button {
    flex: 1;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    background: none;
    font-size: 15px;
    color: #999;

    &:disabled {
      background: ${(props) => props.theme.accentColor};
      box-shadow: 0 0 7px 3px rgba(0, 0, 0, .15);
      font-weight: bold;
      color: #fff;
    }
  }
`;

const ResultList = styled.ul`
  margin-top: 30px;
`;


function ToDoPage() {
  const toDos = useRecoilValue(toDoSelector);
  const [activeTab, setActiveTab] = useRecoilState(tabState);
  const changeTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(event.currentTarget.name as any);
  };

  return (
    <Container>
      <Title>TO DO LIST</Title>
      <TabWrap>
        <button
          name={Categories.TODO}
          onClick={changeTab}
          disabled={activeTab === Categories.TODO ? true : false}
        >TO DO</button>
        <button
          name={Categories.DOING}
          onClick={changeTab}
          disabled={activeTab === Categories.DOING ? true : false}
        >DOING</button>
        <button
          name={Categories.DONE}
          onClick={changeTab}
          disabled={activeTab === Categories.DONE ? true : false}
        >DONE</button>
      </TabWrap>
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
