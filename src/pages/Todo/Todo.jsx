import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../API/api";

import TodoList from "./TodoList";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  const getTodos = () => {
    fetch(`${API.TODOS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.reverse());
      });
  };

  const createTodo = (e) => {
    e.preventDefault();
    fetch(`${API.TODOS}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todoInput }),
    }).then(() => {
      getTodos();
      setTodoInput("");
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("TOKEN")) {
      navigate("/");
      alert("❌ 로그인을 먼저 해주세요.");
    }
    navigate("/todo");
    getTodos();
  }, [navigate]);

  return (
    <TodoWrap>
      <TodoTitle>투 두 리스트</TodoTitle>
      <TodoInputWrap onSubmit={createTodo}>
        <TodoInput
          value={todoInput}
          autoFocus
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <CreateTodoBtn>추가</CreateTodoBtn>
      </TodoInputWrap>

      {todoList.map((item) => {
        return (
          <TodoList
            key={item.id}
            todo={item.todo}
            id={item.id}
            completed={item.isCompleted}
            setTodoList={setTodoList}
            getTodos={getTodos}
          />
        );
      })}
    </TodoWrap>
  );
};

export default Todo;

const TodoWrap = styled.div`
  position: relative;
  top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const TodoInputWrap = styled.form``;

const TodoTitle = styled.h1`
  color: #486c48;
`;

const TodoInput = styled.input`
  width: 250px;
  height: 30px;
  padding: 0 10px;
  margin-right: 10px;
  margin-bottom: 30px;
  border-radius: 10px;
  border: 1px solid lightgray;
  outline: none;
  font-weight: bold;

  :focus {
    border: 1px solid darkgray;
    background-color: #486c4813;
  }
`;

const CreateTodoBtn = styled.button`
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: #68ab68;
  color: white;
  font-weight: bold;
  :active {
    background-color: #68ab68be;
  }
`;
