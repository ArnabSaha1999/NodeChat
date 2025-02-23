export const handleFileValidation = (file, setError) => {
  setError("");
  if (!file) return "No file was choosen! Please choose an avatar!";
  const validImageTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg",
    "image/webp",
  ];
  if (!validImageTypes.includes(file.type))
    return "Invalid file type! Only image files are allowed!";
  if (file.size > 10 * 1024 * 1024)
    return "File size exceeds the 10MB limit! Please upload a smaller file!";
  return null;
};
