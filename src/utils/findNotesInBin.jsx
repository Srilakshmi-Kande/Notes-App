export const findNotesInBin = (bin, id) => {
  return Array.isArray(bin) && bin.some(note => note.id === id);
};
