import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { useNotes } from "../../context/notes_context"
import { NotesCard } from "../../components/NotesCard"
import { useState } from "react"

export const Bin = () => {

  const [showSidebar, setShowSidebar] = useState(false);

  const { bin, notesDispatch } = useNotes();

  const onRestoreAll = () => {
    if (bin.length === 0) return;
    const confirmRestore = window.confirm("Restore all notes?");
    if (confirmRestore) {
      notesDispatch({ type: "RESTORE_ALL" });
    }
  };

  const onEmptyBin = () => {
    if (bin.length === 0) return;
    const confirmDelete = window.confirm("Permanently delete all notes in Bin?");
    if (confirmDelete) {
      notesDispatch({ type: "EMPTY_BIN" });
    }
  };

  return (
    <>
      <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
      <main className="flex gap-3">
        <Sidebar className={`${showSidebar ? "block" : "hidden"} md:block fixed md:static bg-white w-60 h-full z-50`}/>
        <div className="flex-1 mt-4 px-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              {bin.length > 0 && (
                <>
                  <button
                    onClick={onRestoreAll}
                    className="bg-green-600 text-white px-4 py-1 rounded-md"
                  >
                    Restore All
                  </button>
                  <button
                    onClick={onEmptyBin}
                    className="bg-red-600 text-white px-4 py-1 rounded-md"
                  >
                    Empty Bin
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {bin?.length > 0 ? (
              bin.map(({ id, title, text, isPinned }) => (
                <NotesCard
                  key={id}
                  id={id}
                  title={title}
                  text={text}
                  isPinned={isPinned}
                  location={"bin"}
                />
              ))
            ) : (
              <p className="text-gray-500">No notes in Bin</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
