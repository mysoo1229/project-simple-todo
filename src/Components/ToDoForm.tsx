import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  flex: 1;
  display: flex;
  gap: 4px;
  background: #fff;
  border-radius: 12px;
  padding: 2px;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  background: none;
  color: #000;
`;

const AddButton = styled.button`
  padding: 0 10px;
  border: none;
  border-radius: 10px;
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
  const { register, handleSubmit, setValue} = useForm<IForm>();
  const onValid = ({ toDoInput }: IForm) => {
    setToDos((oldToDos) => [
      {
        id: Date.now(),
        text: toDoInput,
        category: "TODO",
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
        placeholder="What to do?"
      />
      <AddButton>ADD</AddButton>
    </Form>
  );
}

export default ToDoForm;
