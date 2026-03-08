import mongoose, { Schema, type Document } from 'mongoose'

export interface IShortLink extends Document {
  shortCode: string
  destinationUrl: string
  title?: string
  clicks: number
  createdAt: Date
}

const ShortLinkSchema = new Schema<IShortLink>(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    destinationUrl: { type: String, required: true, trim: true },
    title: { type: String, default: '' },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
)

export default mongoose.models.ShortLink || mongoose.model<IShortLink>('ShortLink', ShortLinkSchema)
