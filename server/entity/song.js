export default function post({
  title,
  artist,
  createdAt,
  genre,
  albumID,
}) {
  return {
    getTitle: () => title,
    getArtist: () => artist,
    getCreatedAt: () => createdAt,
    getGenre: () => genre,
    getAlbumId: () => albumID,
  };
}
