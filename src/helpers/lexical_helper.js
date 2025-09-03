import { $isListItemNode, $isListNode } from "@lexical/list"

export function getNearestListItemNode(node) {
  let current = node
  while (current !== null) {
    if ($isListItemNode(current)) return current
    current = current.getParent()
  }
  return null
}

export function getListType(node) {
  let current = node
  while (current) {
    if ($isListNode(current)) {
      return current.getListType()
    }
    current = current.getParent()
  }
  return null
}
