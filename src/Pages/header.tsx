import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link to="/reports">Reports</Link>,
    key: "reports",
  },
  {
    label: <Link to="/cities">Cities</Link>,
    key: "cities",
  },
];

function Header() {
  return (
    <div className="header">
      <h2>Weather App</h2>
      <Menu className="menu" mode="horizontal" items={items} />
    </div>
  );
}

export default Header;
