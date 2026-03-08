import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose'

const LegacyUrlSchema = new Schema(
  {
    shortCode: { type: String, index: true },
    slug: { type: String, index: true },
    originalUrl: { type: String },
    clicks: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, collection: 'urls' }
)

export type LegacyUrlDocument = InferSchemaType<typeof LegacyUrlSchema>

const LegacyUrl =
  (mongoose.models.LegacyUrl as Model<LegacyUrlDocument>) ||
  mongoose.model<LegacyUrlDocument>('LegacyUrl', LegacyUrlSchema)

export default LegacyUrl
