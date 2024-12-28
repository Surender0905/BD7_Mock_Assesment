const express = require("express");
const {
    createActivity,
    getAllActivities,
    getActivitiesByUser,
    getActivitiesByType,
    updateDuration,
    updateType,
    deleteActivity,
} = require("../controllers/activities.controller");

const router = express.Router();

///routes
router.route("/activities").post(createActivity).get(getAllActivities);

router.get("/activities/:user", getActivitiesByUser);

router.get("/activities/type/:type", getActivitiesByType);

router.post("/activities/update-duration", updateDuration);

router.post("/activities/update-type", updateType);

router.post("/activities/delete", deleteActivity);

module.exports = router;
