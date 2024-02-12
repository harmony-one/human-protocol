import { Link, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./pages/welcome";
import { HomePage } from "./pages/home";
import { AppLayout } from "./components/layout";
import { FeedPage } from "./pages/feed";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'welcome'} element={<WelcomePage />} />
      <Route element={<AppLayout />}>
        {/*<Route path={'/'} element={<Navigate to={'/home'} />} />*/}
        <Route path={'/feed'} element={<FeedPage />} />
        <Route path={'/auth'} element={<HomePage />} />
      </Route>
    </Routes>
  );
}
