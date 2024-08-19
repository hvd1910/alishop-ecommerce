import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";


import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/images/logo-shop.png"
import AuthModal from "../Auth/AuthModal";
import { GetUser, addUser, removeUser } from "../../../State/Auth/authCustomerSlice";
import All_API from "../../../State/Auth/All_API";
import { ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";
import { getCart } from "../Cart/CartAction";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const user = useSelector(GetUser)
  const location = useLocation();
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false); 
  const numberItemCart = getCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const [categories, setCategories] = useState([]);

  
  const currentPath = location.pathname;


  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpenAuthModal(true);
    navigate("/login")
  };

  const handleClose = () => {
    setOpenAuthModal(false);
    navigate('/')
  };

  const handleCategoryClick = (id) => {
    navigate(`/shop?categoryId=${id}`);
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

   async function getAllCategory() {
    try {
      const response = await All_API.getAllCategory();
      setCategories(response.data);
    } catch {}
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
      navigate(`/shop?keyword=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };


  async function getUser(token) {
    try{
      const data = await All_API.getUserAPI(token)
      dispatch(addUser(data.data.data))
      if(data.data?.data.role.id === 1) {
        setUserLoaded(false)
      }else {
        setUserLoaded(true)
      }
    }catch {
      setUserLoaded(true)
      localStorage.removeItem('jwt')
    } 
  }


  useEffect(()=> {
    getAllCategory()
    if(jwt) {
      getUser(jwt)
    }
    

  },[jwt, userLoaded])


  useEffect(()=>{
    
    if(location.pathname==="/login" || location.pathname==="/register") {
      if(user !== null) {
        handleClose()
        navigate(-1);
      }
      handleOpen()
    }
  },[user])

  const handleLogout= ()=> {
    localStorage.removeItem("jwt")
    dispatch(removeUser())
    ToastSuccess("Logout in successfully.")
    handleCloseUserMenu()

  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="bg-white z-50 ">
      {/* Mobile menu */}
      

      <header className="relative bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        24/7 ONLINE STORE - FAST DELIVERY
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 "

        >
          <div className="border-b border-gray-200 w-[100%]">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a onClick={()=> navigate("/")} className="cursor-pointer">
                  <img style={{width: "100%", height:"60px"}} 
                    className="h-8 logo-img-cs"
                    src={Logo}
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8 items-center">
        <a
          onClick={() => navigate('/')}
          className={`flex items-center text-sm font-medium ${currentPath === '/' ? 'text-gray-800 border-b-2 border-blue-500' : 'text-gray-700'} hover:text-gray-800 cursor-pointer`}
        >
          HOME
        </a>
        <div className="relative group nav-btn-2">
          <a
            onClick={() => navigate('/shop')}
            className={`flex items-center text-sm font-medium ${currentPath === '/shop' ? 'text-gray-800 border-b-2 border-blue-500' : 'text-gray-700'} hover:text-gray-800 cursor-pointer`}
          >
            SHOP
            <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" aria-hidden="true" />
          </a>
          <div className="absolute z-1000 left-0 top-full mt-3 w-[140px] bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 opacity-0 transition-opacity duration-300">
            <div className="py-1 bg-white">
              {categories.map((category) => (
                <a
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <a
          onClick={() => navigate('/company')}
          className={`flex items-center text-sm font-medium ${currentPath === '/company' ? 'text-gray-800 border-b-2 border-blue-500' : 'text-gray-700'} hover:text-gray-800 cursor-pointer`}
        >
          COMPANY
        </a>
        <a
          onClick={() => navigate('/contact')}
          className={`flex items-center text-sm font-medium ${currentPath === '/contact' ? 'text-gray-800 border-b-2 border-blue-500' : 'text-gray-700'} hover:text-gray-800 cursor-pointer`}
        >
          CONTACT
        </a>
      </div>
    </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user?.fullname ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {user?.fullname[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={()=> {
                          window.location.href  = "/account"
                          handleCloseUserMenu()
                        }}>
                           Profile & Orders
                        </MenuItem>
                       
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Signin
                    </Button>
                  )}

                
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://hatscripts.github.io/circle-flags/flags/gb.svg"
                      alt=""
                      className="block w-5 flex-shrink-0 h-auto"
                    />
                    <span className="ml-2 block text-sm font-medium">ENG</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="relative flex lg:ml-4 items-center" ref={searchRef}>
      <button
        onClick={toggleSearch}
        className="p-2 text-gray-400 hover:text-gray-500"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-6 w-6 " aria-hidden="true"  />
      </button>
      {isSearchOpen && (
        <div className="absolute top-full mt-4 right-0 w-[280px]  bg-white border border-gray-300 rounded-lg shadow-lg transform -translate-y-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>

                {/* Cart */}
                <div className="ml-3 flow-root lg:ml-4 cursor-pointer">
                  <a onClick={()=> navigate("/cart")} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon 
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="mt-1 ml-0.5 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {numberItemCart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}/>
    </div>
  );
}
