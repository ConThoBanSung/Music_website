const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');

router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const stream = ytdl(videoId, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
    res.setHeader('Content-Type', 'audio/mpeg');

    stream.pipe(res);
  } catch (error) {
    res.status(500).send('Error processing audio stream');
  }
});

module.exports = router;
