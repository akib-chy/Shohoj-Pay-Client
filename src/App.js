import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Authentication/Login/Login";
import NotFound from "./Components/Shared/NotFound/NotFound";
import SignUp from "./Components/Pages/Authentication/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./Components/Pages/Authentication/ResetPassword/ResetPassword";
import Services from "./Components/Pages/Services/Services/Services";
import AddMoney from "./Components/Pages/Services/AddMoney/AddMoney";
import Settings from "./Components/Pages/Settings/Settings";
import SendMoney from "./Components/Pages/Services/SendMoney/SendMoney";
import SaveMoney from "./Components/Pages/Services/SaveMoney/SaveMoney";
import RequireAuth from "./Components/Pages/Authentication/RequireAuth/RequireAuth";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import SupportEngine from "./Components/Pages/SupportEngine";
import AllTransaction from "./Components/Pages/Dashboard/AllTransaction";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services"
          element={
            <RequireAuth>
              <Services />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        {/* Pages for each services */}
        <Route
          path="/services/addMoney"
          element={
            <RequireAuth>
              <AddMoney />
            </RequireAuth>
          }
        />
        <Route
          path="/services/sendMoney"
          element={
            <RequireAuth>
              <SendMoney />
            </RequireAuth>
          }
        />
        <Route
          path="/services/saveMoney"
          element={
            <RequireAuth>
              <SaveMoney />
            </RequireAuth>
          }
        />
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/allTransAction"
          element={
            <RequireAuth>
              <AllTransaction />
            </RequireAuth>
          }
        />
        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SupportEngine />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
