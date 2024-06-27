const dbCon = require('../../Config/connection.js');

const getRestaurant = (req, res) => {
    try {
        let query = `select * from restoaddress`;
        dbCon.query(query, (error, result) => {
            if (error) {
                res.json({ success: false, message: error.message })
            }
            else {
                res.json({
                    success: true,
                    data: result
                })
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
const addNewRestaurant = async (restaurantData) => {
    return new Promise((resolve, reject) => {
        const { name, description, location, city } = restaurantData;
        const sql = 'INSERT INTO restoaddress ( name, description, location, city) VALUES ( ?, ?, ?, ?)';
        dbCon.query(sql, [name, description, location, city], (error, results) => {
            if (error) {
                console.error('Error adding restaurant:', error);
                reject({ success: false, message: 'Failed to add restaurant' });
            } else {
                resolve({ success: true, message: 'Restaurant added successfully' });
            }
        });
    });
};


//update Enquiry
const updateRestaurant = async (id, restaurantData) => {
    return new Promise((resolve, reject) => {
        const { id, name, description, location, city } = restaurantData;
        const sql = 'UPDATE restoaddress SET name=?, description=?, location=?, city=? WHERE id=?';
        dbCon.query(sql, [name, description, location, city, id], (error, results, fields) => {
            if (error) {
                console.error('Error updating restaurant:', error);
                reject({ success: false, message: 'Failed to update restaurant' });
            } else {
                resolve({ success: true, message: 'Restaurant updated successfully' });
            }
        });
    });
};
const deleteRestaurant = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM restoaddress WHERE id=?';
        dbCon.query(sql, [id], (error, results, fields) => {
            if (error) {
                console.error('Error deleting restaurant:', error);
                reject({ success: false, message: 'Failed to delete restaurant' });
            } else {
                resolve({ success: true, message: 'Restaurant deleted successfully' });
            }
        });
    });
};

const getRestaurantById = (req, res) => {
    try {
        const id = req.params.id; // Assuming the ID is passed as a route parameter

        let query = `SELECT * FROM restoaddress WHERE id = ?`;
        dbCon.query(query, [id], (error, result) => {
            if (error) {
                res.json({ success: false, message: error.message });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ success: false, message: 'Restaurant not found' });
                } else {
                    res.json({
                        success: true,
                        data: result[0] // Assuming you expect only one restaurant for the given ID
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getRestaurant,
    addNewRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantById
}