import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Todos = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("TOKEN")) {
      navigate("/");
      alert("❌로그인을 먼저 해주세요.");
    }
  }, []);

  return <TodoWrap>to do list</TodoWrap>;
};

export default Todos;

const TodoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
