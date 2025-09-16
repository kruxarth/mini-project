
import './App.css'
import NavLayout from './layouts/AppLayout'
import AppLayout from './layouts/NavLayout'
import DashBoard from './pages/dashboard'
import LandingPage from './pages/landingPage'
import LoginPage from './pages/loginPage'
import NewDonation from './pages/newDonation' 
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/profilePage'
import SignupPage from './pages/signupPage'
import {createBrowserRouter, RouterProvider} from "react-router-dom"


function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout/>,
      children: [
        {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
     {
      path: '/signup',
      element: <SignupPage/>
    },
      ]
    },


    {
      element: <NavLayout/>,
      children: [
        {
      path: '/new',
      element: <NewDonation/>
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/dashboard',
      element: <DashBoard/>
    },
   
      ]
    },
    
    {
      path: '*',
      element: <NotFoundPage/>
    }
  ])

  return (
   <div>
     <RouterProvider router={router}/>
   </div>
  )
}

export default App
