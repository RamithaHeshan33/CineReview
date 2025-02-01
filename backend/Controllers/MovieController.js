const movieModel = require('../Models/MovieModels');
const multer = require('multer'); // Import Multer for file uploads

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded images in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage }); // Multer instance

// Get All Movies
const getAllMovies = async (req, res) => {
    let movie;
    try {
        movie = await movieModel.find();
    }
    catch(err) {
        console.log(err);
    }

    if (!movie || movie.length === 0) {
        return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json({ movie });
};

exports.getAllMovies = getAllMovies;

// Add Movie with Image
const addMovie = async (req, res) => {
    const { title, year, status } = req.body;
    let image = req.file ? req.file.path : ''; // Store uploaded image path

    let movie;
    try {
        movie = new movieModel({
            title,
            year,
            status,
            image // Save image path in the database
        });
        await movie.save();
    }
    catch (err) {
        console.log(err);
    }

    if (!movie) {
        return res.status(400).json({ message: 'Movie adding failed' });
    }
    return res.status(200).json({ movie });
};

// Wrap function with Multer middleware
exports.addMovie = [upload.single('image'), addMovie];

// Get Movie by ID
const getMovieById = async (req, res) => {
    const { id } = req.params;
    let movie;
    try {
        movie = await movieModel.findById(id);
    }
    catch (err) {
        console.log(err);
    }

    if (!movie) {
        return res.status(404).json({ message: 'No movie found' });
    }
    return res.status(200).json({ movie });
};

exports.getMovieById = getMovieById;

// Update Movie with Image
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, year, status } = req.body;
    let image = req.file ? req.file.path : null; // Get new image if uploaded

    let movie;
    try {
        movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.title = title;
        movie.year = year;
        movie.status = status;
        if (image) {
            movie.image = image; // Update image only if a new one is provided
        }

        await movie.save();
    }
    catch (err) {
        console.log(err);
    }

    if (!movie) {
        return res.status(400).json({ message: 'Movie updating failed' });
    }
    return res.status(200).json({ movie });
};

// Wrap function with Multer middleware
exports.updateMovie = [upload.single('image'), updateMovie];

// Delete Movie
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    let movie;
    try {
        movie = await movieModel.findByIdAndDelete(id);
    }
    catch (err) {
        console.log(err);
    }

    if (!movie) {
        return res.status(404).json({ message: 'Movie deleting failed!' });
    }
    return res.status(200).json({ movie });
};

exports.deleteMovie = deleteMovie;
