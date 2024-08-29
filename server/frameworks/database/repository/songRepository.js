import SongModel from "../models/song"

export default function songRepository(){
    const findAll = (params) => {
      const query = {};

      // Construct query based on available parameters
      if (params.title) query.title = params.title;
      if (params.artist) query.artist = params.artist;
      if (params.album) query.album = params.album;
      if (params.genre) query.genre = params.genre;

      return SongModel.find(query);
    };

    const countAll = (params) => {
        const query = {}

        if (params.title) query.title = params.title;
        if (params.artist) query.artist = params.artist;
        if (params.album) query.album = params.album;
        if (params.genre) query.genre = params.genre;

        return SongModel.countDocuments(query);
    }

    const findById = (id) => SongModel.findById(id);

    const add = (songEntity) => {
        const newSong = new SongModel({
          title: songEntity.getTitle(),
          artist: songEntity.getArtist(),
          album: songEntity.getAlbum(),
          genre: songEntity.getGenre(),
          createdAt: new Date(),
        });

        return newSong.save()
    }

    const updateById = (id, songEntity) => {
        const updatedSong = {
        title: songEntity.getTitle(),
        artist: songEntity.getArtist(),
        album: songEntity.getAlbum(),
        genre: songEntity.getGenre(),
        };

        return SongModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedSong },
        { new: true }
        );
    };

    const deleteById = (id) => SongModel.findByIdAndRemove(id);

    const getStatistics = async () => {
      const totalSongs = await SongModel.countDocuments();
      const totalArtists = await SongModel.distinct("artist").countDocuments();
      const totalAlbums = await SongModel.distinct("album").countDocuments();
      const totalGenres = await SongModel.distinct("genre").countDocuments();

      return {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
      };
    };
    
    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById,
        getStatistics
    }
}