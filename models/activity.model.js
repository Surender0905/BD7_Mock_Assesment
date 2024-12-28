const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Cardio", "Strength", "Flexibility", "Balance"],
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        caloriesBurned: {
            type: Number,
            required: false,
        },
        date: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
