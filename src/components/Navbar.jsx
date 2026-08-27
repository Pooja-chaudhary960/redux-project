import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../features/cart/cartSlice";
import { setSearchQuery } from "../features/products/productSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold font-display">S</span>
            </div>
            <span className="font-display font-bold text-xl text-stone-900 tracking-tight">Shop.</span>
          </Link>

          {/* Search bar — only on home */}
          {isHome && (
            <div className="flex-1 max-w-sm hidden sm:block">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === "/" ? "text-stone-900 bg-stone-100" : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"}`}
            >
              Shop
            </Link>
            <Link
              to="/wishlist"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === "/wishlist" ? "text-stone-900 bg-stone-100" : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"}`}
            >
              Wishlist
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === "/admin" ? "text-stone-900 bg-stone-100" : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"}`}
            >
              Admin
            </Link>
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative ml-1 p-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4l1-7z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile search */}
        {isHome && (
          <div className="sm:hidden pb-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
