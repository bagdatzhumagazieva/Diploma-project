import React from 'react';
import { NavTypes } from 'src/components/molecules/Nav/types';

const Nav = (props: NavTypes.IProps) => <div>{props.children}</div>;

export default Nav;
