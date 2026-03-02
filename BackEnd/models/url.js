const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },

    redirectUrl: {
      type: String,
      required: true,
    },

    visitedAt: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    ipAddress: {
      type: String,
      required: false,
    },

    // 🔥 expiry field
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt + updatedAt automatically
  }
);

// 🔥 Mongo auto-delete expired docs
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;