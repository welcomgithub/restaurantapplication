const express = require('express');
var path = require('path');


const router = express.Router();

const restaurantController = require('../controllers/restaurant.controlletr');

router.post('/add', async (req, res) => {
    try {
        const restaurantData = req.body;
        let result = await restaurantController.addNewRestaurant(restaurantData);

        if (result.success) {
            res.json({ success: true, message: "Restaurant added successfully." });
        } else {
            res.json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id; // Ensure id is correctly extracted
        const restaurantData = req.body;
        let result = await restaurantController.updateRestaurant(id, restaurantData);

        if (result.success) {
            res.json({ success: true, message: "Restaurant updated successfully." });
        } else {
            res.json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let result = await restaurantController.deleteRestaurant(id);

        if (result.success) {
            res.json({ success: true, message: "Restaurant deleted successfully." });
        } else {
            res.json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
 router.get('/',restaurantController.getRestaurant);

 router.get('/:id',restaurantController.getRestaurantById);




 module.exports =router