const express = require('express');
const Document = require('../models/Document');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Get all documents for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        //const documents = await Document.find({ owner: req.user.id });
        const documents = await Document.find({});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single document by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        // if (document.owner.toString() !== req.user.id) {
        //     return res.status(403).json({ message: 'Not authorized' });
        // }
        res.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new document
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newDocument = await Document.create({
            title,
            content,
            owner: req.user.id,
        });
        res.json(newDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a document
router.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a document
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const Document = require("../models/Document");
// const { verifyToken } = require("../middleware/auth");

// const router = express.Router();

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Get all documents for the logged-in user
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const documents = await Document.find({ owner: req.user.id });
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // Get a single document by ID
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) {
//       return res.status(404).json({ message: "Document not found" });
//     }
//     if (document.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }
//     res.json(document);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // Create a new document with optional file uploads
// router.post("/", verifyToken, upload.array("files"), async (req, res) => {
//   const { title, content } = req.body;
//   try {
//     const files = req.files.map((file) => ({
//       filename: file.filename,
//       path: file.path,
//     }));

//     const newDocument = await Document.create({
//       title,
//       content,
//       files,
//       owner: req.user.id,
//     });

//     res.status(201).json({ message: "Document created successfully", document: newDocument });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating document", error });
//   }
// });

// // Update a document
// router.put("/:id", verifyToken, upload.array("files"), async (req, res) => {
//   const { title, content } = req.body;
//   try {
//     const files = req.files.map((file) => ({
//       filename: file.filename,
//       path: file.path,
//     }));

//     const updatedDocument = await Document.findByIdAndUpdate(
//       req.params.id,
//       { title, content, $push: { files } },
//       { new: true }
//     );

//     if (!updatedDocument) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     res.json({ message: "Document updated successfully", document: updatedDocument });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating document", error });
//   }
// });

// // Delete a document
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const document = await Document.findById(req.params.id);
//     if (!document) {
//       return res.status(404).json({ message: "Document not found" });
//     }
//     if (document.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // Optionally, remove uploaded files from the file system
//     // (You'd need to use `fs.unlinkSync` or similar)

//     await document.remove();
//     res.json({ message: "Document deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting document", error });
//   }
// });

// // Get all documents without authentication (optional)
// router.get("/public", async (req, res) => {
//   try {
//     const documents = await Document.find({});
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching documents", error });
//   }
// });

// module.exports = router;





