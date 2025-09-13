import logo from "../../assets/notesimg.png"

export const Navbar = ({onMenuClick}) => {
    return (
        <header className="flex justify-between items-center p-4 border-b-2 border-gray-200">
            <div className="flex gap-3">
                <div className="w-15 h-12">
                    <img className="w-full h-full" src={logo} alt="my logo" />
                </div>
                <h1 className="text-indigo-800 text-4xl font-bold">NoteIt</h1>
            </div>
            <button
            className="md:hidden p-2 max-[400px]:p-1 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition"
            onClick={onMenuClick}
            >
            <span className="material-symbols-outlined text-3xl max-[400px]:text-2xl">menu</span>
            </button>
        </header>
    )
}