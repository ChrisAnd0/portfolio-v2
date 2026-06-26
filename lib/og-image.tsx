export const ogImageSize = { width: 1200, height: 630 };

export function ogImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#141414",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#845ef7",
        }}
      >
        Software Engineer
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: "white",
          marginTop: 12,
        }}
      >
        Chris Omahen
      </div>
    </div>
  );
}
