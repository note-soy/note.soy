import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./components/pages/HomePage";
import {FaqPage} from "./components/pages/FaqPage";
import {EditorPage} from "./components/pages/EditorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/faq",
    element: <FaqPage/>,
  },
  {
    path: "/note/:id",
    element: <EditorPage/>,
  }
]);

export const Router = () => <RouterProvider router={router} />