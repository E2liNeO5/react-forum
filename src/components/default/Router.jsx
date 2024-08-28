import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../UI/Home";
import { Header } from "../UI/Header/Header";
import { PostById } from "../UI/PostById/PostById";
import { ErrorPage } from "../UI/ErrorPage";
import { LoginForm } from "../UI/Forms/LoginForm";
import { RegisterForm } from "../UI/Forms/RegisterForm";
import { Profile } from "../UI/Profile/Profile";
import { Modal } from "../UI/Modal/Modal";
import { Hint } from "../UI/Hint/Hint";

export function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostById />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage text="Ошибка 404: страница не найдена" />} />
      </Routes>
      <Modal />
      <Hint />
    </BrowserRouter>
  )
}