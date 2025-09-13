import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes_context";
import { NotesCard } from "../../components/NotesCard";

export const Important = () => {
  const { important } = useNotes();

  return (
    <>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div className="flex-1 mt-7 px-6">
          <div className="flex flex-wrap gap-6">
            {important?.length > 0 ? (
              important.map(({ id, title, text, isPinned, location}) => (
                <NotesCard
                  key={id}
                  id={id}
                  title={title}
                  text={text}
                  isPinned={isPinned}
                  location="important"
                />
              ))
            ) : (
              <p className="text-gray-500">No important notes</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
