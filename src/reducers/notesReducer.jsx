import { v4 as uuid } from "uuid";

export const notesReducer = (state, {type, payload}) => {
    switch(type) {
        case 'TITLE':
            return {
                ...state,
                title: payload
            }
        case 'TEXT':
            return {
                ...state,
                text: payload
            }
        case 'ADD_NOTE':
            return{
                ...state,
                notes: [...state.notes, { text: state.text, title: state.title, id: uuid(), isPinned: false}]
            }
        case 'CLEAN_INPUT':
            return{
                ...state,
                title:'',
                text:'',
            }
        case 'PIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? {...note, isPinned: !note.isPinned} : note)
            }
        case 'UNPIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? {...note, isPinned: !note.isPinned} : note)
            }
        case 'ADD_TO_ARCHIVE':
            return {
                ...state,
                archive: [...state.archive, state.notes.find(({id}) => id == payload.id)],
                notes: state.notes.filter(({id}) => id !== payload.id)
            }
        case 'REMOVE_FROM_ARCHIVE':
            return {
                ...state,
                notes: [...state.notes, state.archive.find(({id}) => id === payload.id)],
                archive: state.archive.filter(({id}) => id !== payload.id),
            }
        case "EDIT_NOTE": {
        return {
            ...state,
            notes: state.notes.map(note =>
            note.id === payload.id
                ? { ...note, title: payload.title, text: payload.text }
                : note
            ),
            archive: state.archive.map(note =>
            note.id === payload.id
                ? { ...note, title: payload.title, text: payload.text }
                : note
            ),
        };
        }
        case "TOGGLE_IMPORTANT": 
        {
            const noteToToggle = state.notes.find(note => note.id === payload.id);
            if (!noteToToggle) return state;

            const isAlreadyImportant = state.important.some(n => n.id === payload.id);

            return {
                ...state,
                important: isAlreadyImportant
                ? state.important.filter(n => n.id !== payload.id)
                : [...state.important, noteToToggle],
                notes: !isAlreadyImportant
                ? state.notes.filter(n => n.id !== payload.id)
                : state.notes,
                archive: state.archive,
            };
        }
        case "DELETE_NOTE": {
            const noteFromNotes = state.notes.find(note => note.id === payload.id);
            const noteFromArchive = state.archive.find(note => note.id === payload.id);
            const noteFromImportant = state.important.find(note => note.id === payload.id);

            let noteToBin = null;

            if (noteFromNotes) noteToBin = { ...noteFromNotes, from: "notes" };
            else if (noteFromArchive) noteToBin = { ...noteFromArchive, from: "archive" };
            else if (noteFromImportant) noteToBin = { ...noteFromImportant, from: "important" };

            return {
                ...state,
                bin: [...state.bin, noteToBin],
                notes: state.notes.filter(note => note.id !== payload.id),
                archive: state.archive.filter(note => note.id !== payload.id),
                important: state.important.filter(note => note.id !== payload.id),
            };
            }
        case "PERMANENT_DELETE": {
            return {
                ...state,
                bin: state.bin.filter(note => note.id !== payload.id),
            };
        }

        case "RESTORE_NOTE": {
            const noteToRestore = state.bin.find(note => note.id === payload.id);

            if (!noteToRestore) return state;

            return {
                ...state,
                bin: state.bin.filter(note => note.id !== payload.id),
                notes:
                noteToRestore.from === "notes"
                    ? [...state.notes, { ...noteToRestore, from: undefined }]
                    : state.notes,
                archive:
                noteToRestore.from === "archive"
                    ? [...state.archive, { ...noteToRestore, from: undefined }]
                    : state.archive,
                important:
                noteToRestore.from === "important"
                ? [...state.important, { ...noteToRestore, from: undefined }]
                : state.important,
            };
        }
        case "RESTORE_ALL": {
            const restoredNotes = state.bin.filter(note => note.from === "notes");
            const restoredArchive = state.bin.filter(note => note.from === "archive");
            const restoredImportant = state.bin.filter(note => note.from === "important");

            return {
                ...state,
                notes: [
                ...state.notes,
                ...restoredNotes.map(note => ({ ...note, from: undefined }))
                ],
                archive: [
                ...state.archive,
                ...restoredArchive.map(note => ({ ...note, from: undefined }))
                ],
                important: [
                ...state.important,
                ...restoredImportant.map(note => ({ ...note, from: undefined }))
                ],
                bin: [] 
            };
        }
        case "EMPTY_BIN": {
            return {
                ...state,
                bin: [] 
            };
        }
        default:
            return state;
    }
}