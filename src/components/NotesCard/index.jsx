import { useState } from "react";
import { useNotes } from "../../context/notes_context";
import { findNotesInArchive } from "../../utils/findNotesInArchive";
import { findNotesInBin } from "../../utils/findNotesInBin";
import { findNotesInImportant } from "../../utils/findNotesInImportant";

export const NotesCard = ({ id, title, text, isPinned, location }) => {
  const { notesDispatch, archive, bin, important } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editText, setEditText] = useState(text);

  const isNotesInArchive = findNotesInArchive(archive, id);
  const isNotesInBin = findNotesInBin(bin, id);
  const isNotesInImportant = findNotesInImportant(important, id);

  const onPinClick = () => notesDispatch({
    type: isPinned ? "UNPIN" : "PIN",
    payload: { id }
  });

  const onArchiveClick = () => notesDispatch({
    type: isNotesInArchive ? "REMOVE_FROM_ARCHIVE" : "ADD_TO_ARCHIVE",
    payload: { id }
  });

  const onRestoreClick = () => notesDispatch({
    type: "RESTORE_NOTE",
    payload: { id }
  });

  const onDeleteClick = () => {
    if (location === "bin") {
      const confirmDelete = window.confirm("Delete this note permanently?");
      if (confirmDelete) notesDispatch({ type: "PERMANENT_DELETE", payload: { id } });
    } else {
      notesDispatch({ type: "DELETE_NOTE", payload: { id } });
    }
  };

  const onSaveEdit = () => {
    notesDispatch({
      type: "EDIT_NOTE",
      payload: { id, title: editTitle, text: editText }
    });
    setIsEditing(false);
  };

  const onImportantClick = () => notesDispatch({
    type: "TOGGLE_IMPORTANT",
    payload: { id }
  });

  return (
    <div className="border border-neutral-800 rounded-md w-[250px] sm:w-[300px] overflow-hidden">
      <div className="flex justify-between items-center border-b border-neutral-800 p-2">
        {isEditing && location !== "bin" ? (
          <input
            className="w-full p-1 focus:outline-none"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <p className="font-medium text-sm sm:text-base md:text-lg">{title}</p>
        )}

        {location !== "bin" && (
          <button onClick={() => setIsEditing(!isEditing)} className="cursor-pointer">
            <span className="material-symbols-outlined">edit</span>
          </button>
        )}
      </div>

      <div className="p-2 min-h-[100px]">
        {isEditing && location !== "bin" ? (
          <textarea
            className="w-full h-full p-1 border border-neutral-800 rounded focus:outline-none resize-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <p>{text}</p>
        )}
      </div>

      <div className="flex justify-between items-center p-2 gap-2">
        {isNotesInImportant && location === "important" && (
          <span className="text-neutral-800 bg-gray-300 text-sm font-semibold border px-2 py-0.5 rounded-xl">
            Important
          </span>
        )}

        <div className="flex gap-2 ml-auto">
          {isEditing && location !== "bin" ? (
            <>
              <button
                className="px-2 py-1 bg-green-600 text-white rounded cursor-pointer sm:px-3 sm:py-2 text-xs sm:text-sm"
                onClick={onSaveEdit}
              >
                Save
              </button>
              <button
                className="px-2 py-1 bg-gray-600 text-white rounded cursor-pointer sm:px-3 sm:py-2 text-xs sm:text-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {location === "notes" && !isNotesInArchive && (
                <button onClick={onPinClick} className="cursor-pointer">
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: `'FILL' ${isPinned ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                    }}
                  >
                    push_pin
                  </span>
                </button>
              )}

              {(location === "notes" || location === "archive") && (
                <>
                  <button onClick={onArchiveClick} className="cursor-pointer">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontVariationSettings: `'FILL' ${isNotesInArchive || location === "archive" ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                      }}
                    >
                      archive
                    </span>
                  </button>
                  <button onClick={onDeleteClick} className="cursor-pointer">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </>
              )}

              {location === "important" && (
                <>
                  <button onClick={onDeleteClick} className="cursor-pointer">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </>
              )}

              {location === "bin" && (
                <>
                  <button onClick={onRestoreClick} className="cursor-pointer">
                    <span className="material-symbols-outlined">restore_from_trash</span>
                  </button>
                  <button onClick={onDeleteClick} className="cursor-pointer">
                    <span className="material-symbols-outlined">delete_forever</span>
                  </button>
                </>
              )}

              {location !== "important" && location !== "bin" && location !== "archive" && (
                <button onClick={onImportantClick} className="cursor-pointer">
                  <span className="material-symbols-outlined">label_important</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
