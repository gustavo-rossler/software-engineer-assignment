import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import CreateCandidate from "./pages/CreateCandidate"
import UpdateCandidate from "./pages/UpdateCandidate"
import SetDisposition from "./pages/SetDisposition"

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/candidates/create',
    element: <CreateCandidate />,
  },
  {
    path: '/candidates/edit/:id',
    element: <UpdateCandidate />,
  },
  {
    path: '/candidates/disposition/:id',
    element: <SetDisposition />,
  },
])
