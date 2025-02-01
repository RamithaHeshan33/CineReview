const rateModel = require('../Models/RateModel');

const getAllRates = async(req, res) => {
    try {
        const users = await rateModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No rates found' });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllRates = getAllRates;