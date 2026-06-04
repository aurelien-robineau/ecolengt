/**
 * Le Train metronome — self-contained feature embedded on `/le-train-metronome`.
 * Import from this module only; avoid reaching into `lib/` or `ui/` from the rest of the app.
 */
export { LE_TRAIN_METRONOME_API_PATH } from './constants'
export { handleLeTrainMetronomePost, maxDuration, runtime } from './server/handle-post'
export { LeTrainMetronomeEmbed } from './ui/embed'
