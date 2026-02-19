import mongoose from 'mongoose';

const resetTokenCollection = 'resetTokens';

const resetTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Borrado automático en 1h
});

export const ResetTokenModel = mongoose.model(resetTokenCollection, resetTokenSchema);