import { useRecoilState,  } from "recoil";
import { categoriesState, categoryState } from "../atoms";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const TabAddButton = styled.button`
  position: relative;
  width: 28px;
  height: 28px;
  margin-left: auto;
  border: 2px solid #fff;
  border-radius: 14px;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  color: #fff;
  transition: background-color .3s ease;

  &:hover {
    background: ${(props) => props.theme.accentColor};
  }

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 11px;
    left: 7px;
    width: 10px;
    height: 2px;
    background: #fff;
  }

  &:after {
    transform: rotate(90deg);
  }
`;

const TabWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px 0;
  margin-top: 10px;
  padding: 2px;
  border-radius: 8px;
  background: #fff;

  button {
    flex: 1;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    background: none;
    text-transform: uppercase;
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

const LayerWrap = styled.div`
  z-index: 99;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .7);
`;

const LayerInner = styled.div`
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  padding: 36px 24px;
  background: #fff;
  border-radius: 16px;
  text-align: center;
`;

const LayerCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 11px;
    left: 5px;
    width: 16px;
    height: 2px;
    background: #666;
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const LayerTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const LayerForm = styled.form`
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 13px;

    &::placeholder {
      color: #999;
    }
  }
`;

interface ITabForm {
  tabInput: string;
};

function ToDoTabs() {
  const [activeCategory, setActiveCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<ITabForm>();
  const [layerOpen, setLayerOpen] = useState(false);

  const changeTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(event.currentTarget.name as any);
  };

  const onValid = ({ tabInput }: ITabForm) => {
    if (categories.includes(tabInput)) {
      alert("This category is already present! Add something else.");
      return;
    };

    setCategories((oldTabs) => {
      return [
        ...oldTabs,
        tabInput as any
      ];
    });

    setValue("tabInput", "");
    setLayerOpen((prev) => !prev);
    setActiveCategory(tabInput);
  };

  const toggleLayer = () => {
    setLayerOpen((prev) => !prev);
  };

  return (
    <>
      <TabContainer>
        <TabAddButton onClick={toggleLayer} aria-label="Add a category" />
        <TabWrap>
          {categories.map((category, index) => (
            <button
              key={index}
              name={category}
              onClick={changeTab}
              disabled={activeCategory === category ? true : false}
            >{category}</button>
          ))}
        </TabWrap>
      </TabContainer>

      {layerOpen ? (
        <LayerWrap>
          <LayerInner>
            <LayerCloseButton onClick={toggleLayer} aria-label="Close layer" />
            <LayerTitle>ADD A NEW CATEGORY</LayerTitle>
              <LayerForm onSubmit={handleSubmit(onValid)}>
                <input
                  {...register("tabInput", {
                    required: "Pleaase write a new category name",
                  })}
                  type="text"
                  placeholder="What's the category called?"
                />
              </LayerForm>
          </LayerInner>
        </LayerWrap>
      ) : null}
    </>
  );
}

export default ToDoTabs;
