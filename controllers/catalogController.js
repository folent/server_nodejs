const Category = require("../models/Category");
const Brand = require("../models/Brand")
const CatalogItem = require("../models/CatalogItem")

class catalogController {
    async getCategories(req, res) {
        try {
            const categories = await Category.find()
            res.status(200).json(categories)
        } catch (e) {
            console.log(e)
        }
    }

    async getBrands(req, res) {
        try {
            const brands = await Brand.find()
            res.status(200).json(brands)
        } catch (e) {
            console.log(e)
        }
    }

    async getCatalogItems(req, res) {
        try {
            const currentPage = req.params.currentPage
            const pageSize = Number(req.params.pageSize)

            const skip = (currentPage - 1) * pageSize;

            const catalogItems = await CatalogItem.find().skip(skip).limit(pageSize)
            res.status(200).json(catalogItems)
        } catch (e) {
            console.log(e)
        }
    }

    async getCatalogItemsByCategory(req, res) {
        try {
            const categoryID = req.params.id

            const category = await Category.findOne( { _id:  categoryID }) ;

            if(!category) {
                return res.status(400).json({ message: "Категория не найдена" })
            }
            const catalogItems = await CatalogItem.find({ category: category.name })
            res.status(200).json(catalogItems)
        } catch (e) {
            console.log(e)
        }
    }

    async getCatalogItemByID(req, res) {
        try {
            const catalogItemID = req.params.id

            const catalogItem = await CatalogItem.findOne( {_id:  catalogItemID });

            if(!catalogItem) {
                return res.status(400).json({ message: "Товар не найден" })
            }
            res.status(200).json(catalogItem)
        } catch (e) {
            console.log(e)
        }
    }
    async getSortCatalogItems(req, res) {
        try {
            const currentPage = req.params.currentPage
            const pageSize = Number(req.params.pageSize)
            const sort = req.params.sort
            const skip = (currentPage - 1) * pageSize;

            let sortBy;
            if(sort === "expensive") {
                sortBy = {price: -1}
            }
            else if(sort === "cheap") {
                sortBy = {price: 1}
            }
            else if(sort === "name") {
                sortBy = {title: 1}
            }

            const catalogItems = await CatalogItem.find().skip(skip).limit(pageSize).sort(sortBy)
            res.status(200).json(catalogItems)
        } catch (e) {
            console.log(e)
        }
    }
    
    async getCatalogItemsCount(req, res) {
        try {
            const catalogItemsCount = await CatalogItem.find().count()
            res.status(200).json(catalogItemsCount)
        } catch (e) {
            console.log(e)
        }
    }

    async getCatalogItemsByBrand(req, res) {
        try {
            const brandId = req.params.id
            const brand = await Brand.findById(brandId);

            if(!brand) {
                return res.status(400).json({ message: "Бренд не найден" });
            }
            const CatalogItems = await CatalogItem.find({ brand: brand.name })

            res.status(200).json(CatalogItems)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new catalogController()