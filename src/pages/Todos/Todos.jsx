import React from "react";
import styled from "styled-components";

const Todos = () => {
  return <TodoWrap>to do list</TodoWrap>;
};

export default Todos;

const TodoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
