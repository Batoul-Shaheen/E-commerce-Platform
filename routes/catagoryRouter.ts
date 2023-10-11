import express from "express";
import { Category } from "../DB/entities/Category.entity.js";
import { getCategoryByName, insertCategory } from "../controllers/category.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).send({ success: false })
    }
    res.status(200).send(categoryList);
});

router.get('/:name', async (req, res) => {
    const name = req.params.name
    const category = await getCategoryByName(name);
    if (!category) {
        res.status(500).send('The category with the given ID was not found.')
    }
    res.status(200).send(category);
});

router.post('/', (req, res) => {
    insertCategory(req.body).then((data) => {
        res.status(201).send(data)
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

router.put('/:name', async (req, res) => {
    const name = req.params.name;
    const category = await Category.findOneBy({ name });
    if (category) {
        category.status = 'done'
        category.save();
        res.send('category Updated');
    }
    else {
        res.status(404).send('category not found!');
    }
});

router.delete('/:name', async (req, res) => {
    const name = req.params.name;
    const category = await Category.findOneBy({name });
    if (category) {
        category.remove();
        res.send('category Deleted');
    } else {
        res.status(404).send('category not found!');
    }
});