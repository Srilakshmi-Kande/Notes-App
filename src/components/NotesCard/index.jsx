import { useNotes } from "../../context/notes_context"
import { findNotesInArchive } from "../../utils/findNotesInArchive";

export const NotesCard = ({id,title,text,isPinned}) => {

    const { notesDispatch, archive } = useNotes();

    const isNotesInArchive = findNotesInArchive(archive, id);

    const onPinClick = (id) => {
        !isPinned ? notesDispatch({
            type: 'PIN',
            payload: { id }
        }) : notesDispatch({
            type: 'UNPIN',
            payload: { id }
        })
    }

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ADD_TO_ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_ARCHIVE',
            payload: { id }
        })
    }


    return (
        <div key={id} className="border border-neutral-800 p-2 rounded-md w-[300px]">
            <div className="flex justify-between border-b-2">
                <p>{title}</p>
                {
                    !isNotesInArchive ? <button onClick={() => onPinClick(id)}>
                <span
                    className="material-symbols-outlined"
                    style={{
                    fontVariationSettings: `'FILL' ${isPinned ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
                    }}
                >
                    push_pin
                </span>
                </button> : <></>
                }
            </div>
            <div className="flex flex-col">
                <p>{text}</p>
                <div className="ml-auto">
                    <button onClick={() => onArchiveClick(id)}>
                   <span
                    className="material-symbols-outlined"
                    style={{
                        fontVariationSettings: `'FILL' ${isNotesInArchive ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
                    }}
                    >
                    archive
                    </span>
                    </button>
                    <button><span className="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        </div>
    )
}