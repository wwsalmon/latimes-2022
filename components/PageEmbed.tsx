export default function PageEmbed({url, height, inline}: { url: string, height?: number, inline?: boolean }) {
    return (
        <iframe
            src={url}
            className="relative border-4 rounded-lg shadow-2xl my-16"
            style={{height: height || 800, width: inline ? "100%" : "calc(100vw - 64px)", left: inline ? 0 : "calc(-50vw + 50% + 32px)"}}
        ></iframe>
    )
}