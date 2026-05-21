type LexicalRoot = {
  root?: {
    children?: unknown[]
  } | null
}

export function hasLexicalContent(content: LexicalRoot | string | null | undefined): boolean {
  if (!content || typeof content === 'string') {
    return false
  }

  const children = content.root?.children
  if (!Array.isArray(children) || children.length === 0) {
    return false
  }

  return children.some((node) => {
    if (!node || typeof node !== 'object' || !('type' in node)) {
      return false
    }

    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      return node.children.some(
        (child) =>
          child &&
          typeof child === 'object' &&
          'type' in child &&
          child.type === 'text' &&
          'text' in child &&
          typeof child.text === 'string' &&
          child.text.trim(),
      )
    }

    return node.type !== 'paragraph'
  })
}
