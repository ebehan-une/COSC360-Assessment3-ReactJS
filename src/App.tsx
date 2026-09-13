import { Routes, Route, Link } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";


import { NavigationBar } from './components/NavigationBar';

export default function App() {

  // SPA HTML Structure.
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
      </Routes>
    </>
  );

}