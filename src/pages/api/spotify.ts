
import { getAccessToken, getCurrentlyPlaying, getLastPlayed } from "../../lib/spotify";

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 30_000;

export async function GET() {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return Response.json(cache.data);
    }

    try {
        const { access_token } = await getAccessToken();

        try {
            const current = await getCurrentlyPlaying(access_token);
            if (current) {
                cache = { data: current, timestamp: Date.now() };
                return Response.json(current);
            }
        } catch { }

        try {
            const last = await getLastPlayed(access_token);
            cache = { data: last, timestamp: Date.now() };
            return Response.json(last);
        } catch { }

    } catch { }

    return Response.json(
        { title: "No disponible", artist: "", isPlaying: false },
        { status: 200 }
    );
}