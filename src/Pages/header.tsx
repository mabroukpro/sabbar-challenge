import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "/",
  },
  {
    label: <Link to="/reports">Reports</Link>,
    key: "/reports",
  },
  {
    label: <Link to="/cities">Cities</Link>,
    key: "/cities",
  },
];

function Header() {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <div className="header">
      <h2>Weather App</h2>
      <Menu
        selectedKeys={[currentRoute]}
        className="menu"
        mode="horizontal"
        items={items}
      />
    </div>
  );
}

export default Header;
