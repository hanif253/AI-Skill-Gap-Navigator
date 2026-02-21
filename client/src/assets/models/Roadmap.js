
const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
    skills: [String],
    targetRole: String,
    gapAnalysis: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);