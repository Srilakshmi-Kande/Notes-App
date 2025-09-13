import { NavLink } from "react-router-dom"

export const Sidebar = () => {

    const getstyles = ({ isActive }) => {
        const styles = 'flex align-center gap-1 px-2 py-1 rounded-tr-full rounded-br-full';
        return isActive ? `bg-indigo-800 text-slate-50 ${styles}` : `hover:bg-indigo-800 hover:text-slate-50 ${styles}`;
    }
    return (
        <aside className="flex flex-col gap-3 border-r-2 border-gray-200 w-[150px] h-screen p-3">
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
    )
}