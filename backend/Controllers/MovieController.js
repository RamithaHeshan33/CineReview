const movieModel = require('../Models/MovieModels');

//Get All Movies
const getAllMovies = async (req, res) => {
    let movie;
    try {
        movie = await movieModel.find();
    }
    catch(err) {
        console.log(err);
    }

    if(!movie) {
        return res.status(404).json({
            message: 'No movies found'
        });
    }
    return res.status(200).json({movie});
};

exports.getAllMovies = getAllMovies;


//Add Movies
const addMovie = async(req, res) => {
    const {title, year, status} = req.body;
    let movie;
    try {
        movie = new movieModel({
            title, year, status
        });
        await movie.save();
    }
    catch(err) {
        console.log(err);
    }

    if(!movie) {
        return res.status(404).json({
            message: 'Movie adding failed'
        });
    }
    return res.status(200).json({movie});
}

exports.addMovie = addMovie;