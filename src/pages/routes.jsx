import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage";
import { Page } from "./Page";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route exact path='/pokemon/:id' element={<Page />} />
        </Routes>
    </BrowserRouter>
);

export { AppRoutes }