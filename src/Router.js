import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Todo from "./pages/Todo/Todo";

const Router = () => {
  return (
    <BrowserRouter basename="/wanted-pre-onboarding-frontend">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
