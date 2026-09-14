import { Routes, Route, Link } from "react-router-dom";
import { PostCreate, PostDetail, PostEdit, PostsList } from './pages';
import { Footer, NavigationBar } from './components';

/**
 * Single-Page Application.
 * @name App
 * @description
 * @returns { JSX.Element } Single Page Layout Design.
 */
export default function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
      </Routes>
      <Footer text="Created by Ethan Behan using Laravel and ReactJS." />
    </>
  );
}