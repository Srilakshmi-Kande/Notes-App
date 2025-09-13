import logo from "../../assets/notesimg.png"

export const Navbar = () => {
    return (
        <header className="flex px-5 py-2 gap-3 border-b-2 border-gray-200">
            <div className="w-15 h-12">
                <img className="w-full h-full" src={logo} alt="my logo" />
            </div>
            <h1 className="text-indigo-800 text-4xl font-bold">NoteIt</h1>
        </header>
    )
}