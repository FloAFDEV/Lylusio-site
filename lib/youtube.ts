/**
 * Utility functions for fetching YouTube video information
 * Uses YouTube oEmbed API (no API key required)
 */

export interface YouTubeVideoInfo {
	title: string;
	author: string;
	thumbnailUrl: string;
	width?: number;
	height?: number;
}

/**
 * Fetch video information from YouTube oEmbed API
 * @param videoId - YouTube video ID (e.g., "Qo10SGie2wE")
 * @returns Video information or default values if fetch fails
 */
export async function getYouTubeVideoInfo(
	videoId: string
): Promise<YouTubeVideoInfo> {
	try {
		const response = await fetch(
			`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
			{
				next: { revalidate: 86400 }, // Cache for 24 hours
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch video info: ${response.statusText}`);
		}

		const data = await response.json();

		return {
			title: data.title || "Vidéo YouTube",
			author: data.author_name || "Émilie Perez",
			thumbnailUrl:
				data.thumbnail_url ||
				`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
			width: data.width,
			height: data.height,
		};
	} catch (error) {
		console.error(`Error fetching YouTube video ${videoId}:`, error);
		// Return default values if fetch fails
		return {
			title: "Vidéo YouTube",
			author: "Émilie Perez",
			thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
		};
	}
}

/**
 * Extract video ID from YouTube URL
 * @param url - Full YouTube URL
 * @returns Video ID or null if invalid URL
 */
export function extractVideoId(url: string): string | null {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
}
