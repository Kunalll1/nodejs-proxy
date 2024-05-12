const express = require("express");
const axios = require("axios");
const app = express();

// Define a route to handle video requests dynamically
app.get("/video/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  try {
    // Make a request to the third-party service to fetch the video content
    const videoResponse = await axios.get(
      `https://dash.animaker.com/a/u/cmyhl07210/video/${videoId}.mp4`,
      {
        responseType: "stream",
      }
    );

    // Stream the video content back to the client
    videoResponse.data.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
