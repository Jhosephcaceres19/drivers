import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { App } from "../App"

const Routes =() =>{
    const reoutesPublic= [
        {
            path: '/',
            element: <App/>
        }
    ]

    const router = createBrowserRouter(reoutesPublic);
    return <RouterProvider router={router}/>
}

export default Routes;