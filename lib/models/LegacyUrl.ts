import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose'

const LegacyUrlSchema = new Schema(
  {
    shortCode: { type: String, required: true, index: true, unique: true, trim: true, lowercase: true },
    slug: { type: String, index: true, trim: true, lowercase: true },
    originalUrl: { type: String, required: true, trim: true },
    clicks: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false, timestamps: true, collection: 'urls' }
)

export type LegacyUrlDocument = InferSchemaType<typeof LegacyUrlSchema>

const LegacyUrl =
  (mongoose.models.LegacyUrl as Model<LegacyUrlDocument>) ||
  mongoose.model<LegacyUrlDocument>('LegacyUrl', LegacyUrlSchema)

export default LegacyUrl
