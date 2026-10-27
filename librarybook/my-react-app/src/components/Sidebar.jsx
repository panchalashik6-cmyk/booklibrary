
import {
  FiBookOpen,
  FiGrid,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";

function Sidebar({
  activePage,
  setActivePage,
  isOpen,
  setIsOpen,
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
    },
    {
      name: "All Books",
      icon: <FiBook />,
    },
    {
      name: "Available Books",
      icon: <FiCheckCircle />,
    },
    {
      name: "Issued Books",
      icon: <FiClock />,
    },
  ];

  function handleMenuClick(menuName) {
    setActivePage(menuName);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <FiBookOpen />
          </div>

          <div className="logo-text">
            <h2>BookNest</h2>
            <p>Library Management</p>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        {/* Menu */}
        <div className="sidebar-section">
          <p className="sidebar-heading">
            MENU
          </p>

          <nav className="sidebar-navigation">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`sidebar-menu-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  handleMenuClick(item.name);
                }}
              >
                <span className="sidebar-menu-icon">
                  {item.icon}
                </span>

                <span className="sidebar-menu-text">
                  {item.name}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Library Information */}
        <div className="sidebar-bottom">
          <div className="sidebar-bottom-icon">
            <FiBookOpen />
          </div>

          <h3>Manage your library</h3>

          <p>
            Keep your books organized and your library up to date.
          </p>

          <div className="sidebar-version">
            <span className="version-dot"></span>
            <span>Library System v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
