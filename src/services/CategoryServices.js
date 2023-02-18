const Categories = require("../models/Categories/Categories")

/** 
 * @function
 * _**getAllCategories**_
 * 
 * @argument
 * Might be accept in future, Currently no arguments.
 * 
 * @description
 * It will get you all categories from database those are active & not deleted by Admin.
 *  
*/
exports.getAllCategories = async () => {
    return await Categories.find({ active: true }).then((response) => {
        let result = [];
        response.map((cat) => {
            result.push({
                label: cat.categoryName,
                value: cat._id,
                selected: false
            });
        });
        return [{
            code: 200,
            status: "OK",
            message: "Fetched all categories.",
            data: result
        }];
    }).catch((error) => {
        return [{
            code: 100,
            status: "ERROR",
            message: error.message
        }];
    })
};

/** 
 * @function
 * _**addCategory**_
 * 
 * @argument
 * Accepting new category body object.
 * 
 * @param
 * categoryName String
 * 
 * @description
 * Add new category.
 *  
*/
exports.addCategory = async (newCategory) => {
    const category = await Categories.find({ categoryName: newCategory.categoryName });
    if(category.length === 0) {
        return await new Categories(newCategory).save()
            .then((response) => {
                if(response._id) {
                    let res = [{
                        code: 200,
                        status: "OK",
                        message: "Category added successfully.",
                        data: response
                    }];
                    return res;
                }
            }).catch((error) => {
                let res = [{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }];
                return res;
            });
    } else {
        return [{
            code: 300,
            status: "OK",
            message: "Category already exist."
        }];
    }
};

/** 
 * @function
 * _**updateCategory**_
 * 
 * @argument
 * Accepting updated category name and id of existing category within the object.
 * 
 * @param
 * `id` String/ObjectId
 * `categoryName` String
 * 
 * @description
 * Update existing category.
 *  
*/
exports.updateCategory = async (_id, body) => {
    const category = await Categories.find({ categoryName: body.categoryName });
    if(category.length === 0) {
        return await Categories.findByIdAndUpdate(_id, body)
            .then(async (response) => {
                let res;
                if(response._id) {
                    return await Categories.findById({ _id: response._id }).then((result) => {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Category updated successfully.",
                            data: result
                        }];
                        return res;
                    }).catch((error) => {
                        res = [{
                            code: 100,
                            status: "ERROR",
                            message: error.message
                        }];
                        return res;
                    });
                }
            }).catch((error) => {
                let res = [{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }];
                return res;
            });
    } else {
        return [{
            code: 300,
            status: "OK",
            message: "Category already exist."
        }];
    }
};