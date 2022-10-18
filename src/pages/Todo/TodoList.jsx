import React, { useState } from "react";
import styled, { css } from "styled-components";
import API from "../API/api";
import { RiPencilFill } from "react-icons/ri";

const TodoList = ({ todo, completed, id, setTodoList, getTodos }) => {
  const [update, setUpdate] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState(todo);
  const [updateCompleted, setUpdateCompleted] = useState(completed);

  const deleteTodo = () => {
    fetch(`${API.TODOS}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    }).then(() => getTodos());
  };

  const updateTodo = () => {
    fetch(`${API.TODOS}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: updateTodoInput,
        isCompleted: updateCompleted,
      }),
    })
      .then(() => getTodos())
      .then(() => setUpdate(false));
  };

  const updateCancel = () => {
    setUpdateTodoInput(todo);
    setUpdateCompleted(completed);
    setUpdate(false);
  };

  return (
    <>
      {update ? (
        <TodoListWrap>
          <RiPencilFill className="editIcon" />
          <TodoCompleted
            type="checkbox"
            defaultChecked={updateCompleted}
            onChange={() => setUpdateCompleted(!updateCompleted)}
          />
          <TodoListInput
            type="text"
            onChange={(e) => setUpdateTodoInput(e.target.value)}
            value={updateTodoInput}
            autoFocus
          />

          <UpdateTodo onClick={updateTodo}>확인</UpdateTodo>
          <DeleteTodo onClick={updateCancel}>취소</DeleteTodo>
        </TodoListWrap>
      ) : (
        <TodoListWrap>
          <TodoCompleted type="checkbox" checked={completed} readOnly />
          <TodoListText updateCompleted={updateCompleted}>{todo} </TodoListText>
          <UpdateTodo onClick={() => setUpdate(true)}>수정</UpdateTodo>
          <DeleteTodo onClick={deleteTodo}>삭제</DeleteTodo>
        </TodoListWrap>
      )}
    </>
  );
};

export default TodoList;

const TodoListWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px;

  .editIcon {
    position: absolute;
    left: 41px;
  }
`;

const TodoCompleted = styled.input`
  width: 25px;
  height: 25px;
  accent-color: #27a727;
`;

const TodoListInput = styled.input`
  width: 230px;
  height: 30px;
  margin-right: 5px;
  padding: 0 10px 0 30px;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: #486c4813;
  font-size: 13px;
  font-weight: bold;
  outline: none;
`;
const TodoListText = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 30px;
  margin-right: 5px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid lightgray;
  font-size: 13px;
  font-weight: bold;
  ${({ updateCompleted }) =>
    updateCompleted &&
    css`
      color: gray;
      text-decoration: line-through;
    `}
`;
const UpdateTodo = styled.button`
  width: 40px;
  height: 35px;
  margin-right: 5px;
  border: none;
  border-radius: 10px;
  background-color: #68ab68;
  color: white;
  :active {
    background-color: #68ab68be;
  }
`;
const DeleteTodo = styled(UpdateTodo)`
  background-color: #db6161;
  :active {
    background-color: #db6161c6;
  }
`;
