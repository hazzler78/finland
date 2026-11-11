/** Norwegian (bokmål) display labels for persisted Finnish contract type values. */
const CONTRACT_TYPE_LABELS: Record<string, string> = {
  Kiinteä: 'Fastpris',
  Pörssisähkö: 'Spotpris',
}

export function contractTypeLabel(type: string): string {
  return CONTRACT_TYPE_LABELS[type] ?? type
}
