import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Wishlist",
        "Applied",
        "Interview",
        "Offer Received",
        "Rejected",
        "Accepted",
      ],
      required: true,
    },
    applicationDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    openingUrl: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          const urlRegex =
            /^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}(\/\S*)?$/i;
          return urlRegex.test(v);
        },
        message: "Provided URL is not valid",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
