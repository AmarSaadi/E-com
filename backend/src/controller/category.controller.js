import categoryModel from "../model/category.model.js";


async function category(req,res) {
    try {
    const {name, description} = req.body;

    const category  = await categoryModel.create({name,description});
    return res.status(201).json({message:"Category Submit Successfully",category});
    
} catch (error) {
    return res.status(500).json({message:"Internal Server Error"});
}
}

export default {category};