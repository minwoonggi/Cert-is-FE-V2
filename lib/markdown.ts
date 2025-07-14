export function renderMarkdown(content: string): string {
  // Basic markdown parsing with improved styling
  const html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')

    // Code blocks
    .replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-gray-100 border border-gray-200 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-gray-800 font-mono">$2</code></pre>',
    )

    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')

    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')

    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')

    // Links
    .replace(
      /\[([^\]]+)\]$$([^)]+)$$/g,
      '<a href="$2" class="text-cert-red hover:text-cert-red/80 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    // Unordered lists
    .replace(/^- (.*$)/gim, '<li class="text-gray-800 mb-2">$1</li>')
    .replace(
      /(<li class="text-gray-800 mb-2">.*<\/li>)/s,
      '<ul class="list-disc list-inside space-y-2 my-4 ml-4 text-gray-800">$1</ul>',
    )

    // Ordered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="text-gray-800 mb-2">$1</li>')

    // Checkboxes
    .replace(
      /^- \[ \] (.*$)/gim,
      '<li class="flex items-center gap-2 text-gray-800 mb-2"><input type="checkbox" disabled class="rounded"> $1</li>',
    )
    .replace(
      /^- \[x\] (.*$)/gim,
      '<li class="flex items-center gap-2 text-gray-800 mb-2"><input type="checkbox" checked disabled class="rounded"> $1</li>',
    )

    // Blockquotes
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-cert-red pl-4 py-2 my-4 bg-gray-50 text-gray-800 italic">$1</blockquote>',
    )

    // Horizontal rules
    .replace(/^---$/gim, '<hr class="border-t border-gray-300 my-8">')

    // Line breaks
    .replace(/\n/g, "<br>")

  return html
}
