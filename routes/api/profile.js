const express = require('express');

const router = express.Router();


router.get('/profile/test', async (req, res) => {
    res.json({msg:"Test message"})
})

module.exports = router;
