import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Badge, Divider, Drawer, Menu, MenuItem } from "@mui/material";
import logo from "../../../assets/LOGO.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../../../utils/verifyUser.js";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [user, setUser] = useState();
  const [cartCount, setCartCount] = useState(0);

  const loguser = getUser();
  const navigate = useNavigate();

  // to add user and its cart count
  useEffect(() => {
    if (loguser) {
      setUser(loguser);
      setCartCount(loguser.carts.length)
      console.log("user in home page");
    }
  }, []);

  // for testing whether user is logged in or not
  useEffect(() => {
    console.log("logged in user in home page");
    console.log(user);
  }, [user && user.length > 0]);

  const toggleOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  // for handling menu after login
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    console.log("logout");
    try {
      const res = await Axios.post(
        "http://localhost:8000/api/v1/user/logout",
        { token: user.tokens[0].token },
        {
          headers: {
            "Content-Type": "application/json", // Ensuring the content type is set to JSON
          },
          withCredentials: true, // If you need to include cookies
        }
      );
      console.log(res);

      if (res.status >= 200 && res.status <= 300) {
        localStorage.removeItem("user");
        setUser();
        toast.success("User logged out", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      console.log("could not logout due to ", error.message);
      toast.error("Could not logout please try again", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-around items-center bg-slate-950  p-3 w-full text-white shadow-2xl">
        <div className="cursor-pointer mr-20 mb-4 lg:mr-0 lg:mb-0">
          <img src={logo} alt="LOGO" width={"100"} />
        </div>
        <div className="flex gap-5">
          <NavLink
            to={"/"}
            className="cursor-pointer font-medium text-lg hover:text-orange-500 lg:block hidden"
          >
            Home
          </NavLink>
          <div className="cursor-pointer font-medium text-lg hover:text-orange-500 lg:block hidden">
            About Us
          </div>
          <div className="cursor-pointer text-lg font-medium hover:text-orange-500 lg:block hidden">
            Contact Us
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <input
              type="text"
              name="search"
              id="search"
              className="py-2 px-1 text-black rounded-lg"
            />
            <button className="border p-2 outline-none rounded-md relative right-[4rem] box-border bg-orange-600 text-black mx-0 font-semibold hover:text-white">
              Search
            </button>
          </div>
          {!user ? (
            <NavLink
              to={"/login"}
              className="font-semibold text-lg border p-2 box-border rounded-xl cursor-pointer lg:block hidden bg-orange-500 text-black"
            >
              Login
            </NavLink>
          ) : (
            <div className=" font-medium mt-2 cursor-pointer hidden lg:flex lg:gap-10">
              <Avatar
                style={{ backgroundColor: "blue", color: "white" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {user && user.first_name[0].toUpperCase()}
                {user && user.last_name[0].toUpperCase()}
              </Avatar>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <div onClick={logout}>
                    <LogoutIcon />
                    Logout
                  </div>
                </MenuItem>
              </Menu>

              <NavLink to={"/carts"}>
                {cartCount != 0 ? (
                  <Badge
                    badgeContent={`${cartCount || null}`}
                    color="primary"
                  >
                    <ShoppingCartIcon style={{ fontSize: "30px" }} />
                  </Badge>
                ) : (
                  <Badge
                  color="primary"
                >
                  <ShoppingCartIcon style={{ fontSize: "30px" }} />
                </Badge>
                )}
              </NavLink>
            </div>
          )}

          <div className="lg:hidden block mt-1  cursor-pointer text-2xl">
            <button onClick={toggleOpen}>
              <MenuIcon />
            </button>
            <Drawer onClose={toggleOpen} open={drawerOpen} anchor="right">
              <ul className="list-none flex flex-col gap-4 p-14">
                <NavLink
                  to={"/"}
                  className="font-semibold cursor-pointer hover:text-orange-500"
                >
                  Home
                </NavLink>
                <li className="font-semibold cursor-pointer hover:text-orange-500">
                  About Us
                </li>
                <li className="font-semibold cursor-pointer hover:text-orange-500">
                  Contact Us
                </li>
              </ul>
              <Divider />

              {!user ? (
                <NavLink
                  to={"/login"}
                  className="text-center rounded-md mx-12 p-3 mt-4 text-white font-semibold bg-orange-600 "
                >
                  Login
                </NavLink>
              ) : (
                <button
                  className="bg-orange-600 mx-12 mt-2 p-2 text-white rounded-md"
                  onClick={logout}
                >
                  <LogoutIcon />
                  Logout
                </button>
              )}
            </Drawer>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
