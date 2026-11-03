/**
 * Renders a JSON-LD <script>. Server component, so the markup is in the initial
 * HTML for crawlers. "<" is escaped to avoid breaking out of the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
