const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: 'AIzaSyCfw8zkuT8uk2poDv_8kwJ9gg98uifzMrs'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
