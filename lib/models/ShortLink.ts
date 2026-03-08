import mongoose, { Schema, type Model, type InferSchemaType } from 'mongoose'

const ShortLinkSchema = new Schema(
  {
    shortCode: { type: String, required: true, unique: true, index: true },
    destinationUrl: { type: String, required: true },
    title: { type: String, default: '' },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
)

export type ShortLinkDocument = InferSchemaType<typeof ShortLinkSchema>

const ShortLink =
  (mongoose.models.ShortLink as Model<ShortLinkDocument>) ||
  mongoose.model<ShortLinkDocument>('ShortLink', ShortLinkSchema)

export default ShortLink
