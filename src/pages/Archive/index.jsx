import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { useNotes } from "../../context/notes_context"
import { NotesCard } from "../../components/NotesCard"
import { useState } from "react"

export const Archive = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const { archive } = useNotes();

    return (
        <>
            <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
            <main className="flex gap-3">
                <Sidebar className={`${showSidebar ? "block" : "hidden"} md:block fixed md:static bg-white w-60 h-full z-50`}/>
                <div>
                <div className="flex flex-wrap gap-6 mt-7 px-6">
                {
                    archive && archive.length > 0 ? (
                        archive.map(({ id, title, text, isPinned }) => (
                        <NotesCard
                            key={id}
                            id={id}
                            title={title}
                            text={text}
                            isPinned={isPinned}
                            location="archive"
                        />
                        ))
                    ) : (
                        <p className="text-gray-500">No notes in archive</p>
                    )
                }
                </div>
                </div>
            </main>
        </>
    )
}