const Activity = require("../models/activity.model");

//create activity
const createActivity = async (req, res) => {
    const { name, user, type, duration, caloriesBurned, date, notes } =
        req.body;
    // Validate required fields
    if (!name || !user || !type || !duration || !date) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const activity = await Activity.create({
            name,
            user,
            type,
            duration,
            caloriesBurned,
            date,
            notes,
        });
        res.status(201).json({
            message: "Activity created successfully",
            activity,
        });
    } catch (error) {
        console.error("Error saving activity:", error);
        res.status(500).json({ error: "Server error while saving activity" });
    }
};

//get all activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().exec();
        res.status(200).json({
            message: "Activities fetched successfully",
            activities,
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({
            error: "Server error while fetching activities",
        });
    }
};
///get activities by user

const getActivitiesByUser = async (req, res) => {
    const { user } = req.params;
    // console.log(user);

    if (!user) {
        return res.status(400).json({ error: "User is required" });
    }

    try {
        // Perform a case-insensitive search for activities by the username
        const activities = await Activity.find({
            user: { $regex: new RegExp(user, "i") },
        }).exec();

        if (activities.length === 0) {
            return res.status(404).json({ error: "No activities found" });
        }

        res.status(200).json({
            message: "Activities fetched successfully",
            activities,
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({
            error: "Server error while fetching activities",
        });
    }
};

//get activities by type

const getActivitiesByType = async (req, res) => {
    const { type } = req.params;

    if (!type) {
        return res.status(400).json({ error: "Type is required" });
    }

    try {
        // Perform a case-insensitive search for activities by the username
        const activities = await Activity.find({
            type: { $regex: new RegExp(type, "i") },
        }).exec();

        if (activities.length === 0) {
            return res.status(404).json({ error: "No activities found" });
        }

        res.status(200).json({
            message: "Activities fetched successfully",
            activities,
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({
            error: "Server error while fetching activities",
        });
    }
};

///update duration
const updateDuration = async (req, res) => {
    const { duration, id } = req.body;

    if (!duration || !id) {
        return res.status(400).json({ error: "Duration and ID are required" });
    }

    try {
        const activity = await Activity.findByIdAndUpdate(
            id,
            { duration },
            { new: true },
        );

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        res.status(200).json({
            message: "Duration updated successfully",
            activity,
        });
    } catch (error) {
        console.error("Error updating duration:", error);
        res.status(500).json({ error: "Server error while updating duration" });
    }
};

//update type
const updateType = async (req, res) => {
    const { type, id } = req.body;

    if (!type || !id) {
        return res.status(400).json({ error: "Type and ID are required" });
    }

    try {
        const activity = await Activity.findByIdAndUpdate(
            id,
            { type },
            { new: true },
        );

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        res.status(200).json({
            message: "Type updated successfully",
            activity,
        });
    } catch (error) {
        console.error("Error updating type:", error);
        res.status(500).json({ error: "Server error while updating type" });
    }
};

//delete activity
const deleteActivity = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const activity = await Activity.findByIdAndDelete(id);

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        res.status(200).json({
            message: "Activity deleted successfully",
            activity,
        });
    } catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({ error: "Server error while deleting activity" });
    }
};

module.exports = {
    createActivity,
    getAllActivities,
    getActivitiesByUser,
    getActivitiesByType,
    updateDuration,
    updateType,
    deleteActivity,
};
