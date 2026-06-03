import { generateWavBuffer, DEFAULT_SAMPLE_RATE } from '@/lib/metronome/audioGenerator'
import { buildSequence } from '@/lib/metronome/sequenceBuilder'
import { validateGeneratePayload, validateMetronomeConfig } from '@/lib/metronome/validate'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Corps JSON invalide.' }, { status: 400 })
  }

  const directPayload = validateGeneratePayload(body)
  const config = directPayload ? null : validateMetronomeConfig(body)

  if (!directPayload && !config) {
    return Response.json({ error: 'Paramètres invalides.' }, { status: 400 })
  }

  const sampleRate = directPayload?.sampleRate ?? config?.sampleRate ?? DEFAULT_SAMPLE_RATE
  const subdivision = directPayload?.subdivision ?? config!.subdivision
  const accentFirst = directPayload?.accentFirst ?? config!.accentFirst
  const sequence = directPayload?.sequence ?? buildSequence(config!)

  try {
    const wav = generateWavBuffer(sequence, subdivision, accentFirst, sampleRate)
    return new Response(new Uint8Array(wav), {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': String(wav.length),
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return Response.json({ error: 'Échec de la génération du fichier audio.' }, { status: 500 })
  }
}
