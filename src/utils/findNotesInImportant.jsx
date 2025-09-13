export const findNotesInImportant = (important, id) => {
    return Array.isArray(important) && important.some(note => note.id === id);
};