import { Navbar } from "../../components/Navbar/index";
import { NotesCard } from "../../components/NotesCard";
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes_context";
import { useState } from "react";

export const Home = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const {title,text,notes,notesDispatch} = useNotes();

    const onTitleChange = (e) => {
        notesDispatch({
            type: 'TITLE',
            payload: e.target.value
        })
    }

    const onTextChange = (e) => {
        notesDispatch({
            type: 'TEXT',
            payload: e.target.value
        })
    }

    const onAddClick = () => {
        notesDispatch({
            type: 'ADD_NOTE',
        })
        notesDispatch({
            type: 'CLEAN_INPUT'
        })
    }

    const pinnedNotes = notes?.length > 0 && notes.filter(({isPinned}) => isPinned);
    const unpinnedNotes = notes?.length > 0 && notes.filter(({isPinned}) => !isPinned);

    return (
        <>
            <Navbar onMenuClick={() => setShowSidebar(!showSidebar)} />
            <main className="flex gap-3">
                <Sidebar className={`${showSidebar ? "block" : "hidden"} md:block fixed md:static bg-white w-60 h-full z-50`}/>
                <div className="flex flex-col w-screen mt-7">
                    <div className="flex flex-col w-[300px] relative self-center sm:w-[450px]">
                        <input value={title} onChange={onTitleChange} className="border border-neutral-800 rounded-t-md focus:outline-none border-b p-1" placeholder="Enter title" />
                        <textarea value={text} onChange={onTextChange} className="h-[100px] border border-neutral-800 rounded-b-md focus:outline-none border-t-0 p-1" placeholder="Enter text" />
                        <button disabled={title.length == 0} 
                            onClick={onAddClick} className="w-7 h-7 absolute bottom-0 right-0 bg-indigo-800 text-slate-50 m-1 p-0.5 rounded-full hover:bg-indigo-600 flex align-center gap-1 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    <div className="mt-10 ml-7 flex flex-col gap-5 sm:mt-14 sm:ml-10">
                        {
                            pinnedNotes?.length > 0 && (
                                <div>
                                    <h3 className="">Pinned Notes</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {
                                            pinnedNotes?.length > 0 && pinnedNotes.map(({id,title,text, isPinned}) => {
                                                return <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} location={"notes"} />
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div>
                            {
                                pinnedNotes?.length > 0 && <h3>Other Notes</h3>
                            }
                            <div className="flex flex-wrap gap-6">
                                {
                                    unpinnedNotes?.length > 0 && unpinnedNotes.map(({id,title,text, isPinned}) => {
                                        return <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} location={"notes"} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}