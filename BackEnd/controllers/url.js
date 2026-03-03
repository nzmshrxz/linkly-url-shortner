const { nanoid } = require('nanoid');
const URL = require('../models/url');
const redis = require('../config/redis')

// Generate Short URL (requires login)
async function handleGenerateUrl(req, res) {
  try {
    let { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Ensure protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const shortid = nanoid(8);

    // calculate expiry
    const now = Date.now();
    let expiresAt = null;

    if (req.user) {
      // logged user → 7 days
      expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000);
    } else {
      // guest → 24 hours
      expiresAt = new Date(now + 24 * 60 * 60 * 1000);
    }

    if (req.user) {
      // ✅ Logged-in user → unlimited links
      const newUrl = new URL({
        shortid,
        redirectUrl: url,
        userId: req.user.id,
        expiresAt
      });

      await newUrl.save();

      return res.status(201).json({
        message: 'Short URL created successfully',
        shortUrl: `${process.env.FRONTEND_URL}/${shortid}`,
        shortId: shortid
      });
    } else {
      // ✅ Guest user → max 5 links
      const ip = req.ip;
      // const count = await URL.countDocuments({ ipAddress: ip, userId: { $exists: false } });

      // if (count >= 5) {
      //   return res.status(403).json({
      //     error: 'Guest users can create up to 5 links. Please login for unlimited access.'
      //   });
      // }

      const newUrl = new URL({
        shortid,
        redirectUrl: url,
        ipAddress: ip, // 👈 store guest’s IP
        expiresAt
      });

      await newUrl.save();

      return res.status(201).json({
        message: 'Short URL created successfully',
        shortUrl: `${process.env.FRONTEND_URL}/${shortid}`,
        shortId: shortid
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}


// Redirect handler (public)
async function handleRedirect(req, res) {
  try {
    const { shortid } = req.params;

    // 🔥 1. Check Redis cache first
    const cachedUrl = await redis.get(shortid);

    if (cachedUrl) {
      // non-blocking analytics (fire and forget)
      console.log("⚡ Cache hit:", shortid);
      URL.updateOne(
        { shortid },
        { $push: { visitedAt: { timestamp: new Date() } } }
      ).exec();

      return res.redirect(cachedUrl);
    }
    console.log("🐢 Cache miss:", shortid);
    // 🧠 2. Fallback to Mongo
    const url = await URL.findOne({ shortid });

    if (!url) return res.status(404).send("URL not found");

    // 🔥 3. Cache it for future hits (1 hour is perfect)
    await redis.set(shortid, url.redirectUrl, "EX", 3600);

    // 📊 4. Record analytics (non-blocking)
    URL.updateOne(
      { _id: url._id },
      { $push: { visitedAt: { timestamp: new Date() } } }
    ).exec();

    // 🚀 5. Redirect
    return res.redirect(url.redirectUrl);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}

// Get all links for logged-in user
async function handleGetUserUrls(req, res) {
  try {
    const urls = await URL.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}


// delete user by id
async function deleteUrlbyID(req, res) {
  try {
    const { shortid } = req.params;
    const userId = req.user.id

    const url = await URL.findOne({ shortid, userId })
    if (!url) return res.status(404).json({ message: "URL not found or unauthorized" })

    await url.deleteOne()

    res.json({ message: "Url deleted sucessfully" })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { handleGenerateUrl, handleRedirect, handleGetUserUrls, deleteUrlbyID };
