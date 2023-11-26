import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

/**
 * NavMenu component creates a responsive navigation bar for the application.
 * It includes links to navigate through the app and a toggler for collapsing the navbar on smaller screens.
 * This component manages its collapsed state to toggle the visibility of the navigation items.
 *
 * @extends Component
 * @property {boolean} collapsed - Indicates whether the navbar is collapsed or expanded.
 */
export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }
    /**
    * Toggles the navbar's collapsed state, which controls the visibility of the navigation items.
    */

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/" style={{ fontFamily: 'Monoton, cursive' }}>HouseRentApp</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow" >
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home Page</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/create">Publish A Post</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
