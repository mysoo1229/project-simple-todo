import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { tabState, toDoState } from "../atoms";

const Form = styled.form`
  flex: 1;
  display: flex;
  gap: 4px;
  background: #fff;
  border-radius: 8px;
  padding: 2px;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 12px;
  border: none;
  background: none;
  color: #000;
`;

const AddButton = styled.button`
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.accentColor};
  font-size: 15px;
  line-height: 28px;
  font-weight: bold;
  color: #fff;
`;

interface IForm {
  toDoInput: string;
}

function ToDoForm() {
  const setToDos = useSetRecoilState(toDoState);
  const activeTab = useRecoilValue(tabState);
  const { register, handleSubmit, setValue} = useForm<IForm>();
  const onValid = ({ toDoInput }: IForm) => {
    setToDos((oldToDos) => [
      {
        id: Date.now(),
        text: toDoInput,
        category: activeTab,
      },
      ...oldToDos,
    ]);
    setValue("toDoInput", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("toDoInput", {
          required: "Please write a task",
        })}
        type="text"
        placeholder="Add your task !"
      />
      <AddButton>ADD</AddButton>
    </Form>
  );
}

export default ToDoForm;
