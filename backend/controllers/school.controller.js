import School from "../models/school.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { schema } from "../utils/validation.js";
export const addSchool = async (req, res) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { name, address, city, state, contact, email_id } = req.body;
    

        let image = null;
        if (req.file) {
            image = await uploadOnCloudinary(req.file); 
        }

        const newSchool = await School.create({
            name,
            address,
            city,
            state,
            contact,
            email_id,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            data: newSchool,
        });
    } catch (error) {
        console.error(" Error while adding school:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getAllSchools = async (req, res) => {
    try {
        let schools;
        schools = await School.findAll();
        const { q } = req.query;
        schools = await School.search(q || "");
        return res.status(200).json({ success: true, data: schools });
    } catch (error) {
        console.error(" Error fetching schools:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

