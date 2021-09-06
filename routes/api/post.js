const express = require('express');

const router = express.Router();


router.get('/post/test', async (req, res) => {
    res.json({msg:"Test message"})
})

module.exports = router;