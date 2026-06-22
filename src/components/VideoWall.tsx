/**
 * VideoWall
 *
 * An animated background made of a "wall" of YouTube videos. The videos are
 * split into vertical columns that drift up/down at slightly different speeds,
 * creating a living, mosaic-like backdrop. Each tile is a muted, looping,
 * autoplaying YouTube embed.
 *
 * Notes:
 * - The wall is purely decorative: `pointer-events-none` lets clicks/scroll
 *   pass through to the hero content above it.
 * - To swap in real videos, replace the IDs in `DEFAULT_VIDEO_IDS` (or pass a
 *   `videoIds` prop). Use the 11-character YouTube video ID, e.g. the
 *   `dQw4w9WgXcQ` part of `https://www.youtube.com/watch?v=dQw4w9WgXcQ`.
 */

// 33 placeholder YouTube IDs — calm nature / movement / wellness themed.
// Replace with the brand's own footage when available.
const DEFAULT_VIDEO_IDS: string[] = [
  "5qap5aO4i9A", "DWcJFNfaw9c", "jfKfPfyJRdk", "rUxyKA_-grg", "lTRiuFIWV54",
  "21X5lGlDOfg", "n61ULEU7CO0", "BHACKCNDMW8", "1ZYbU82GVz4", "qH3fETPsqXU",
  "Cb6Qm3Yr9hM", "hHW1oY26kxQ", "bn9F19Hi1Lk", "Pf3jL7Qd0fU", "kgx4WGK0oNU",
  "WPni755-Krg", "C04Ua9DTb8A", "8jLOx1hD3_o", "fEvM-OUbaKs", "P6Segk8cr-c",
  "I8Ftm0wbV0M", "9bZkp7q19f0", "60ItHLz5WEA", "kXYiU_JCYtU", "RgKAFK5djSk",
  "OPf0YbXqDm0", "pRpeEdMmmQ0", "2vjPBrBU-TM", "fJ9rUzIMcZQ", "YQHsXMglC9A",
  "CevxZvSJLk8", "JGwWNGJdvx8", "hLQl3WQQoQ0",
];

interface VideoWallProps {
  videoIds?: string[];
  /** Number of columns on desktop. Mobile uses roughly half. */
  columns?: number;
}

function youTubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: id, // required for `loop` to work on a single video
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export default function VideoWall({
  videoIds = DEFAULT_VIDEO_IDS,
  columns = 6,
}: VideoWallProps) {
  // Distribute videos round-robin across the columns so each column gets a
  // balanced, varied slice rather than a contiguous chunk.
  const columnBuckets: string[][] = Array.from({ length: columns }, () => []);
  videoIds.forEach((id, i) => {
    columnBuckets[i % columns].push(id);
  });

  return (
    <div
      className="video-wall absolute inset-0 overflow-hidden bg-olive pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 grid gap-2 md:gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {columnBuckets.map((bucket, colIndex) => {
          const goesUp = colIndex % 2 === 0;
          // Vary the speed per column for an organic, non-synced feel.
          const duration = 38 + (colIndex % 4) * 9;

          // Duplicate the bucket so the vertical loop is seamless.
          const tiles = [...bucket, ...bucket];

          return (
            <div key={colIndex} className="relative h-full overflow-hidden">
              <div
                className="video-wall__track flex flex-col gap-2 md:gap-3"
                style={{
                  animationName: goesUp ? "wallScrollUp" : "wallScrollDown",
                  animationDuration: `${duration}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }}
              >
                {tiles.map((id, tileIndex) => (
                  <div
                    key={`${id}-${tileIndex}`}
                    className="relative w-full aspect-video overflow-hidden rounded-md bg-olive-light"
                  >
                    <iframe
                      src={youTubeEmbedUrl(id)}
                      title=""
                      tabIndex={-1}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      // Scale up slightly to crop YouTube's letterboxing / UI edges.
                      className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 border-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
