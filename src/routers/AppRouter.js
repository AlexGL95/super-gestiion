// Router imports
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../components/login/Login";
import { DashBoardRoutes } from "./DashboardRouter";


export const AppRouter = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<DashBoardRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}
