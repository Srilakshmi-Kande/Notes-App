export const findNotesInArchive = (archive, id) => {
    return Array.isArray(archive) && archive.some(note => note.id === id);
};