//import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'

export default function Router(){
    const Layout = () =>{
        return (
            <>
            <Outlet/>
            </>
        )
    }

    // const BrowserRoutes = ()=>{
    //     return (
    //         <BrowserRouter>
    //         <Routes>
    //             <Route path="/" element={<Layout />}>
    //             <Route path="/" element={<Home />} />
    //             <Route path="/signup" element={<SignUp />} />
    //             <Route path="/product/:id" element={<Product/>}/>
    //             </Route>
    //         </Routes>
    //         </BrowserRouter>
    //     )
    // }

    const BrowserRoutes = createBrowserRouter([
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                path: "/",
                element:<Home/>
                },
                {
                path: "/signup",
                element:<SignUp/>
                },
                {
                path: "/signin",
                element: <SignIn/>
                },
            ]
        }
    ])

    return (
        //<BrowserRoutes/>
        <RouterProvider router={BrowserRoutes}/>
        
    )
}