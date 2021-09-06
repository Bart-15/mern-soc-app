const express = require('express');

const router = express.Router();


router.get('/users/test', async (req, res) => {
    res.json({msg:"Test message"})
})

module.exports = router;