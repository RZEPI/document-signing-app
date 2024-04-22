import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import StartingPage from "./pages/StartingPage";
import PendriveUnlockPage, {action as pinVerificationAction} from "./pages/PendriveUnlockPage";
import UserDataPage, {action as UserDataSaveAction } from "./pages/UserDataPage";
import FileInputPage, { action as fileSavingAction } from "./pages/FileInputPage";
import SubmitionPage, {action as fileSigningAction} from "./pages/SubmitionPage";
import DownloadPage, {loader as filesLoader } from "./pages/DownloadPage";
import VerficationPage, {action as verifySignatureAction} from "./pages/VerificationPage";

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
            action: pinVerificationAction
          },
          {
            path: "data",
            element: <UserDataPage />,
            action: UserDataSaveAction
          },
          {
            path: "file",
            element: <FileInputPage />,
            action: fileSavingAction
          },
          {
            path: "submit",
            element: <SubmitionPage />,
            action: fileSigningAction
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
        element: <VerficationPage />,
        action: verifySignatureAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
