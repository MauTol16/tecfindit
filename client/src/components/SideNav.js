import React, { Component } from 'react';
import SideItem from "./SideItem";
import { NavItems } from "../data/NavItemsData";


//Style with CSS
const sideNavStyle = {
    height: "100vh",
    width: "350px",
    background: "rgb(55,82,131)",
    background:
        "linear-gradient(135deg, rgba(55,82,131,1), rgba(20,96,194, 190)",
    position: "absolute",
    border: "1px solid transparent",
    left: 0,
    textAlign: "left",
};

const headerStyle = {
    fontWeight: "600",
    padding: "0px 20px",
    color: "#fff",
};

const SideNav = () => {

    return (
        <div className="sidebar" > 
            <h3 className = "text">Alt Search</h3>
            {NavItems.map((navItem, index) => {
                return  <SideItem key = {index} items={navItem}/>;
            })}
        </div>
    )
}

export default  SideNav;
