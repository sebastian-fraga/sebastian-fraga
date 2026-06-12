const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

export async function getAccessToken() {
    const basic = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Spotify auth error ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
}

export async function getCurrentlyPlaying(access_token: string) {
    const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (response.status === 204) return null;
    if (!response.ok) throw new Error(`Spotify error ${response.status}`);

    const data = await response.json();
    return {
        title: data.item.name,
        artist: data.item.artists.map((a: any) => a.name).join(", "),
        isPlaying: data.is_playing,
    };
}

export async function getLastPlayed(access_token: string) {
    const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!response.ok) throw new Error(`Spotify error ${response.status}`);

    const data = await response.json();
    const track = data.items[0].track;
    return {
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        isPlaying: false,
    };
}