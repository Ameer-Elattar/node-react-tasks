import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainLayouts } from "./layouts/MainLayouts";
import { Signup } from "./components/Sginup";
import { Signin } from "./components/Signin";
import { Images } from "./components/Images";
import { Favorite } from "./components/Favorite";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<MainLayouts />}>
          <Route path="/images" element={<Images />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
