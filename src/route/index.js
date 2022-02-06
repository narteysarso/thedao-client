import { Route, Routes } from "react-router";
import Proposal from "../component/page/Proposal";
import { Welcome } from "../component/page/Welcome";

export function RouteController(){
    return(
        <Routes>
            <Route path="/">
                <Route index element={<Welcome />} />
            </Route>
            <Route path="/proposals">
                <Route index element={<Proposal />} />
            </Route>
        </Routes>
    )
}