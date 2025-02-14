const mongoose = require('mongoose');
const RateModel = require('../Models/RateModel');

const getAllRates = async (req, res) => {
    let rate;
    try {
        rate = await RateModel.find();
    }

    catch(err) {
        console.log(err);
    }

    if(!rate) {
        return res.status(404).json({ message: 'No rates found!' });
    }

    return res.status(200).json(rate);

}

exports.getAllRates = getAllRates;

const rateMovie = async (req, res) => {
    const { comment, user, movie } = req.body;

    // Validate ObjectId fields
    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(movie)) {
        return res.status(400).json({ message: 'Invalid user or movie ID' });
    }

    try {
        const rate = new RateModel({ comment, user, movie});
        const savedRate = await rate.save();

        return res.status(201).json({ rate: savedRate });
    } catch (err) {
        console.error('Error saving rate:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.rateMovie = rateMovie;


const getRatesByMovieID = async (req, res) => {
    const { movieID } = req.params;

    let rate;
    try {
        rate = await RateModel.find({ movie: movieID });
    }

    catch(err) {
        console.log(err);
    }

    if(!rate) {
        return res.status(404).json({ message: 'No rates found for this movie!' });
    }

    return res.status(200).json(rate);
}

exports.getRatesByMovieID = getRatesByMovieID;

const getRatesByUserID = async (req, res) => {
    const { userID } = req.params;

    let rate;
    try {
        rate = await RateModel.find({ user: userID });
    }

    catch(err) {
        console.log(err);
    }

    if(!rate) {
        return res.status(404).json({ message: 'No rates found for this user!' });
    }

    return res.status(200).json(rate);
}

exports.getRatesByUserID = getRatesByUserID;