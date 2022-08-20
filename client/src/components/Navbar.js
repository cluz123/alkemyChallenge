import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

export default function Navbar () {
    return (
        <div className="div-main-nav">
            <span>Alkemy Challenge</span>
            <ul>
                <li><Link className="nav-link" to='./'>Home</Link></li>
                <li><Link className="nav-link" to='./abm'>Abm</Link></li>
            </ul>
        </div>
    )
}