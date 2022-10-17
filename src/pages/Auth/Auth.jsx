import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../API/api";

const Auth = () => {
  const navigate = useNavigate();
  const [changeSign, setChangeSign] = useState(false);
  const [signInValue, setSignInValue] = useState({ id: "", pw: "", rePw: "" });
  const signInHandle = (e) => {
    const { value, name } = e.target;
    setSignInValue({ ...signInValue, [name]: value });
  };

  const idValid = signInValue.id.includes("@");
  const pwValid = signInValue.pw.length >= 8;
  const rePwValid = signInValue.pw === signInValue.rePw;
  const signInValid = idValid && pwValid;
  const signUpValid = idValid && pwValid && rePwValid;

  const signUpCertify = (e) => {
    e.preventDefault();
    fetch(`${API.SIGNUP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signInValue.id, password: signInValue.pw }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          alert("✅회원가입 성공");
          setChangeSign(false);
        } else {
          alert("❌회원가입 실패");
        }
      });
  };

  const signInCertify = (e) => {
    e.preventDefault();
    fetch(`${API.SIGNIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signInValue.id, password: signInValue.pw }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          localStorage.setItem("TOKEN", data.access_token);
          alert("✅로그인 성공");
          navigate("/todo");
        } else {
          alert("❌로그인 실패");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      navigate("/todo");
      alert("✅이미 로그인 상태입니다.");
    }
  }, []);

  return (
    <SignInWrap>
      <SignInBox onSubmit={changeSign ? signUpCertify : signInCertify}>
        <SignInTitle>{changeSign ? "회원가입" : "로그인"}</SignInTitle>
        <IdInput
          name="id"
          type="email"
          onChange={signInHandle}
          placeholder="이메일을 입력하세요."
        />
        <PwInput
          name="pw"
          type="password"
          onChange={signInHandle}
          placeholder="비밀번호를 입력하세요."
        />
        {changeSign && (
          <PwInput
            name="rePw"
            type="password"
            onChange={signInHandle}
            placeholder="비밀번호를 다시 입력하세요."
          />
        )}
        <SignInBtn disabled={changeSign ? !signUpValid : !signInValid}>
          {changeSign ? "회원가입" : "로그인"}
        </SignInBtn>
        <SignUpBtn onClick={() => setChangeSign(!changeSign)}>
          {changeSign ? "로그인" : "회원가입"} 하러가기
        </SignUpBtn>
      </SignInBox>
    </SignInWrap>
  );
};

export default Auth;

const SignInWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const SignInBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 300px;
  padding-bottom: 20px;
  border: 1px solid lightgray;
  border-radius: 12px;
`;

const SignInTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const IdInput = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const PwInput = styled(IdInput)``;

const SignInBtn = styled.button`
  width: 200px;
  height: 35px;
  background-color: #68ab68;
  border: none;
  border-radius: 4px;
  &:disabled {
    background-color: #68ab6844;
  }
`;
const SignUpBtn = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #305230;
  cursor: pointer;
`;
