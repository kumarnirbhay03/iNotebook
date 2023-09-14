const express = require('express');
const router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//Router 1: fetch all notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        // catch error
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Router 2: add note using: POST "/api/notes/addnote"
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "enter valid title").isLength({ min: 3 }),
        body("description", "Enter valid desc").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            success = true;
            res.json({ success, savedNote });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);

//Router 3: update note using: PATCH "/api/notes/updatenote/:id"
router.patch(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            let newNote = {};
            if (title) { newNote.title = title; }
            if (tag) { newNote.tag = tag; }
            if (description) { newNote.description = description; }
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("not found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            let success = true;
            res.json({ success, note });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);

//Router 4: delete note using: DELETE "/api/notes/deletenote/:id"
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("not found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ success: true, note: note });
        } catch (error) {
            console.error(error.massage);
            res.status(500).send("errror occured");
        }
    }
);
module.exports = router;