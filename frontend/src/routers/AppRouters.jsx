import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { History, Home } from "@/pages/Pages";

const AppRouters = () => {
  return (
    <>
      
      <Router>

        <Routes>
          <Route element={<MainLayout/>}>

            <Route path="/" element={<Home/>} />
            <Route path="/history" element={<History/>} />

          </Route>
        </Routes>

      </Router>

    </>
  );
};

export default AppRouters;