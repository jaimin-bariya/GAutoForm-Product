import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { History, Home } from "@/pages/Pages";
import { FAIntroduction, FAHistory, FANewForm, FASettings, DGFormAuto, DIntro, DOther, SBilling, SGeneral, SAll } from "@/pages/Pages";

const AppRouters = () => {
  return (
    <>
      
      <Router>

        <Routes>
          <Route element={<MainLayout/>}>

            <Route path="/" element={<Home/>} />

            {/* Routers for Form Auto  */}
            <Route path="/form-auto" element={<FAIntroduction/>} />
            <Route path="/form-auto/history" element={<FAHistory/>} />
            <Route path="/form-auto/settings" element={<FASettings/>} />
            <Route path="/form-auto/new-form" element={<FANewForm/>} />

            {/* For Class Arranger  */}
            <Route path="/documentation/introduction" element={<DIntro/>} />
            <Route path="/documentation/gformauto" element={<DGFormAuto/>} />
            <Route path="/documentation/more" element={<DOther/>} />

            {/* For Settings  */}
            <Route path="/settings/general" element={<SGeneral/>} />
            <Route path="/settings/billing" element={<SAll/>} />
            <Route path="/settings/all" element={<SBilling/>} />



          </Route>
        </Routes>

      </Router>

    </>
  );
};

export default AppRouters;