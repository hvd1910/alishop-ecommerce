import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./routers/AdminRouter";
import CustomerRouter from "./routers/CustomerRouter";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <ToastContainer/>
      <Routes>
        <Route path="/*" element={<CustomerRouter />}></Route>
        <Route path="/admin/*" element={<AdminRouter />}></Route>
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
