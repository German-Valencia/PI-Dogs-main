import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Landing from "../components/Landing/Landing"
import { NavLink } from 'react-router-dom'; 

configure({ adapter: new Adapter() });

describe("<Landing />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  it("deberia renderizar e1 componente <NavLink />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});