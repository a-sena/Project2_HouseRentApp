import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

/**
 * The Layout component wraps the main content of the application.
 * It includes the NavMenu component and a Container that holds the child components.
 * This component is used to define the common structure of the page layout.
 *
 * @extends Component
 * @returns A React element that renders the application's layout, including the navigation and content container.
 */

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
