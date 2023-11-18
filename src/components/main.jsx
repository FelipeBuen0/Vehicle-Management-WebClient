import { React, useState, useEffect } from "react";
import Home from "./home";
import Vehicle from "./vehicles";
import VehicleNew from "./vehicles/new";
import { Route, Routes, redirect, useNavigate } from 'react-router-dom';
import { NotFound } from "../views/notFound";
const Main = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login"/>
            <Route path="*" element={<NotFound />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/vehicle/new" element={<VehicleNew />} />
        </Routes>
    )
}

export default Main