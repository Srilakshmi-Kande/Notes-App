import { NavLink } from "react-router-dom";

export const Sidebar = ({ className = "" }) => {
  const getstyles = ({ isActive }) => {
    const styles =
      "flex items-center gap-1 px-3 py-2 max-[400px]:m-0.5 rounded-tr-full rounded-br-full md:my-2 md:mr-2";
    return isActive
      ? `bg-indigo-800 text-slate-50 ${styles}`
      : `hover:bg-indigo-800 hover:text-slate-50 ${styles}`;
  };

  return (
    <aside
        className={`
            flex flex-col gap-3 
            w-44 sm:w-56 md:w-60
            h-screen 
            p-6 max-[400px]:p-4
            bg-white 
            border-r border-gray-200 
            shadow-lg
            transition-all duration-300
            ${className}
        `}
        >
      <NavLink to="/" className={getstyles}>
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/archive" className={getstyles}>
        <span className="material-symbols-outlined">archive</span>
        <span>Archive</span>
      </NavLink>
      <NavLink to="/important" className={getstyles}>
        <span className="material-symbols-outlined">label_important</span>
        <span>Important</span>
      </NavLink>
      <NavLink to="/bin" className={getstyles}>
        <span className="material-symbols-outlined">delete</span>
        <span>Bin</span>
      </NavLink>
    </aside>
  );
};
