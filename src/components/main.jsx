import { React, useState, useEffect } from "react";
import Home from "./home";
import Vehicle from "./vehicles";
import VehicleForm from "./vehicles/form";
import { Route, Routes } from 'react-router-dom';
import { NotFound } from "../views/notFound";
import supabase from "../lib/helper/supabaseClient";
const Main = () => {
    const loader = async ({ params }) => {
        console.log('passando pelo loader');
        await supabase.from('Car').select().filter('carId', 'in', params.id).then((r) => {console.log(r)});
    }
    const actions = async (params, request) => {
        let formData = await request.formData();
        console.log(formData)
        return formData;
    }
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login"/>
            <Route path="*" element={<NotFound />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/vehicle/new" element={<VehicleForm crudState="c" />} />
            <Route path="/vehicle/:id" element={<VehicleForm crudState="u" />} />
        </Routes>
    )
}

export default Main