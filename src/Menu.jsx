import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 4px;
`;

const MenuItem = styled.li`
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
`;

const ActiveMenuItem = styled(MenuItem)`
  font-weight: bold;
  color: blue;
`;

const InactiveMenuItem = styled(MenuItem)`
  font-weight: normal;
  color: inherit;
`;

const Menu = ({ activePage, handleMenuClick }) => {
  const menuItems = [
    { id: 'fetcher', label: 'Fetcher' },
    { id: 'history', label: 'History' },
    { id: 'page1', label: 'Page 1' },
  ];

  return (
    <MenuContainer>
      {menuItems.map((item) => {
        const isActive = activePage === item.id;
        const MenuItemComponent = isActive ? ActiveMenuItem : InactiveMenuItem;

        return (
          <MenuItemComponent
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
          >
            {item.label}
          </MenuItemComponent>
        );
      })}
    </MenuContainer>
  );
};

Menu.propTypes = {
  activePage: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default Menu;
