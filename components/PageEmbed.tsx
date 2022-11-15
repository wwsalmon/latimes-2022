export default function PageEmbed({url, height}: { url: string, height?: number }) {
    return (
        <iframe
            src={url}
            className="relative border-4 rounded-lg shadow-2xl my-16"
            style={{height: height || 800, width: "calc(100vw - 64px)", left: "calc(-50vw + 50% + 32px)"}}
        ></iframe>
    )
}