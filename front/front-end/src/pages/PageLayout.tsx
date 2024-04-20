import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-content-container">
        <Outlet />
      </div>
    </>
  );
};

export default PageLayout;
