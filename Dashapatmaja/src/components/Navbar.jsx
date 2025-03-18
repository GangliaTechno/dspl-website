import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about", hasDropdown: true },
  { name: "Product & Service", path: "/ourproducts", hasDropdown: true },
  { name: "Contact Us", path: "/contact" },
];

const aboutDropdown = [
  { name: "Our Company", path: "/about" },
  { name: "Our Leadership Team", path: "/ourteam" },
  { name: "Our Intern Team", path: "/our-intern-team" }
];

const productDropDown = [
  { name: "Gen-Alpha", path: "/gen-alpha" },
  { name: "Raw Radicals", path: "/raw-radicals" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Home");

  useEffect(() => {
        let currentTab = tabs.find((tab) => tab.path === location.pathname);

        // If no main tab matches, check dropdowns
        if (!currentTab) {
          if (aboutDropdown.some((item) => item.path === location.pathname)) {
            currentTab = tabs.find((tab) => tab.name === "About Us");
          } else if (productDropDown.some((item) => item.path === location.pathname)) {
            currentTab = tabs.find((tab) => tab.name === "Product & Service");
          }
          setSelected(currentTab?.name);
    }
  }, [location.pathname]);

  return (
    <nav className="bg-white p-4 text-black fixed top-0 left-0 w-full shadow-md z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex flex-row gap-2" to={"/"}>
          <img src="/assets/icon_orange.png" className="h-16" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex text-lg relative space-x-6">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className="relative group"
              onMouseEnter={() => {
                if (tab.name === "About Us") setAboutDropdownOpen(true);
                if (tab.name === "Product & Service") setProductDropdownOpen(true);
              }}
              onMouseLeave={() => {
                setAboutDropdownOpen(false);
                setProductDropdownOpen(false);
              }}
            >
              <Link
                to={tab.path}
                onClick={() => setSelected(tab.name)}
                className="relative text-black px-4 py-2 rounded-md flex items-center"
              >
                <span className="z-10">{tab.name}</span>
                {tab.hasDropdown && (
                  <FontAwesomeIcon icon={faCaretDown} className="pl-2 z-10" />
                )}
                {selected === tab.name && (
                  <span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 bg-gray-400 rounded-md z-0"
                  ></span>
                )}
              </Link>

              {/* Dropdown for About Us */}
              {tab.name === "About Us" && aboutDropdownOpen && (
                <div className="absolute left-0 w-48 mt-0.5 bg-white shadow-lg rounded border border-gray-600 text-base">
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-400"
                      onClick={() => setAboutDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Dropdown for Product & Service */}
              {tab.name === "Product & Service" && productDropdownOpen && (
                <div className="absolute left-0 w-48 mt-0.5 bg-white shadow-lg rounded border border-gray-600 text-base">
                  {productDropDown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-400"
                      onClick={() => setProductDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white py-4 space-y-4 absolute top-full left-0 w-full border-b border-gray-600">
          {tabs.map((tab) => (
            <div key={tab.name} className="relative">
              <Link
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className="block py-2"
              >
                {!tab.hasDropdown?tab.name:''}
              </Link>

              {/* Mobile Dropdown for About Us */}
              {tab.name === "About Us" && (
                <div className="text-center -mt-5 space-y-4">
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Dropdown for Product & Service */}
              {tab.name === "Product & Service" && (
                <div className="text-center -mt-4 space-y-4">
                  {productDropDown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
