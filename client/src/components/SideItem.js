import React, { Component } from 'react';
import Home from './Home';


//Style with CSS
const nameStyle = {
    margin: "20px",
    fontWeight: "600",
    border: "none",
};

const sideItemStyle = {
    height: "auto",
    minHeight: "50px",
    width: "250px",
    borderTop: "1px solid #CBCBCB",
    color: "#fff",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
};

const buttonStyle = {
    margin: "10px",
    fontWeight: "600",
    border: "none",
    marginLeft: "30px",
    width: "200px",
    textAlign: "left",
    backgroundColor: "#fafafa",
};

const SideItem = ({items}) => {
    const {name, links, open} = items;
    const [isOpen, setOpen] = React.useState(open);
    
    const openSideNav = () => {
        setOpen(!isOpen)
    }
    return (
        <div onClick={ () => openSideNav() } style = {sideItemStyle}>
           
            <p style={nameStyle}> {name} </p>
            {isOpen && links.map((link, index) => {
                const {title, value} = link;
                return (
                    <div className= "btns" key = {index}>
                        <button style={buttonStyle} 
                        value={value}
                        >{title}</button>
                    </div>
                    
                )
            })}
        </div>
    );
};

export default SideItem;