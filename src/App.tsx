
import './App.css'
import DashBoard from './pages/dashboard'
import LandingPage from './pages/landingPage'
import LoginPage from './pages/loginPage'
import NewDonation from './pages/newDonation' 
import ProfilePage from './pages/profilePage'
import SignupPage from './pages/signupPage'
import {createBrowserRouter, RouterProvider} from "react-router-dom"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: '/new',
      element: <NewDonation/>
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/signup',
      element: <SignupPage/>
    },
    {
      path: '/dashboard',
      element: <DashBoard/>
    }
  ])

  return (
   <div>
     <RouterProvider router={router}/>
   </div>
  )
}

export default App
