import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import StartingPage from "./pages/StartingPage";
import PendriveUnlockPage from "./pages/PendriveUnlockPage";
import UserDataPage from "./pages/UserDataPage";
import FileInputPage from "./pages/FileInputPage";
import SubmitionPage from "./pages/SubmitionPage";
import DownloadPage, {loader as filesLoader } from "./pages/DownloadPage";
import VerficationPage from "./pages/VerificationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <StartingPage />,
      },
      {
        path: "sign",
        children:[
          {
            path: "pin",
            element: <PendriveUnlockPage />,
          },
          {
            path: "data",
            element: <UserDataPage />,
          },
          {
            path: "file",
            element: <FileInputPage />
          },
          {
            path: "submit",
            element: <SubmitionPage />
          },
          {
            path: "download",
            id: "download",
            loader: filesLoader, 
            element: <DownloadPage />
          }
        ]
      },
      {
        path: "verify",
        children: [
          {
            path: "start",
            element: <VerficationPage />
          }
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
