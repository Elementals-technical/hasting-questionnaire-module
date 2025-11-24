export const BATHROOM_SELECTABLE_IDS = ['masterBath', 'guestBath1', 'guestBath2'] as const;

export type BathroomSelectableId = (typeof BATHROOM_SELECTABLE_IDS)[number];
