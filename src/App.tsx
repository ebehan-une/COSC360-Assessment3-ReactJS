import { Routes, Route, Navigate } from "react-router-dom";


import { Footer, NavigationBar } from './components';
import { useAuth } from "./context/AuthContext";
import { CategoryCreate, CategoryEdit, CategoriesList, PostCreate, PostDetail, PostEdit, PostsList, RegisterPage } from './pages';

/**
 * Single-Page Application.
 * @name App
 * @description
 * @returns { JSX.Element } Single Page Layout Design.
 */
export default function App() {

  const { authenticated } = useAuth();

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/category" element={
          authenticated ? <CategoriesList /> : <Navigate to="/" replace /> } />

        <Route path="/post/create" element={
          authenticated ? <PostCreate /> : <Navigate to="/" replace /> } />
        <Route path="/category/create" element={
          authenticated ? <CategoryCreate /> : <Navigate to="/" replace /> } />

        <Route path="/post/edit/:id" element={
          authenticated ? <PostEdit /> : <Navigate to="/" replace /> } />
        <Route path="/category/edit/:id" element={
          authenticated ? <CategoryEdit /> : <Navigate to="/" replace /> } />
        
      </Routes>
      <Footer text="Created by Ethan Behan using Laravel and ReactJS." />
    </>
  );
}