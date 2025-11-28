// Project Type опции
export const projectTypeOptions = [
    {
        id: 'replacing-existing',
        label: 'Replacing Existing',
    },
    {
        id: 'partial-renovation',
        label: 'Partial Renovation',
    },
    {
        id: 'full-renovation',
        label: 'Full Renovation',
    },
    {
        id: 'new-build',
        label: 'New Build',
    },
] as const;

// Goals опции
export const goalsOptions = [
    {
        id: 'optimizing-storage',
        label: 'Optimizing Storage',
    },
    {
        id: 'improve-functionality',
        label: 'Improve Functionality',
    },
    {
        id: 'maximizing-space',
        label: 'Maximizing Space',
    },
    {
        id: 'customization',
        label: 'Customization',
    },
    {
        id: 'modernization',
        label: 'Modernization',
    },
    {
        id: 'timelessness',
        label: 'Timelessness',
    },
    {
        id: 'durability',
        label: 'Durability',
    },
    {
        id: 'accessible-design',
        label: 'Accessible Design',
    },
    {
        id: 'increase-property-value',
        label: 'Increase Property Value',
    },
    {
        id: 'eco-friendly-solution',
        label: 'Eco-Friendly Solution',
    },
] as const;

// Challenges опции
export const challengesOptions = [
    {
        id: 'limited-space',
        label: 'Limited Space',
    },
    {
        id: 'room-limitations',
        label: 'Room Limitations',
    },
    {
        id: 'clashing-styles',
        label: 'Clashing Styles',
    },
    {
        id: 'finding-adaptable-solutions',
        label: 'Finding Adaptable Solutions',
    },
    {
        id: 'dated-designs',
        label: 'Dated Designs',
    },
    {
        id: 'plumbing-relocation-issues',
        label: 'Plumbing Relocation Issues',
    },
    {
        id: 'ineffective-lighting-design',
        label: 'Ineffective Lighting Design',
    },
    {
        id: 'project-timeline',
        label: 'Project Timeline',
    },
    {
        id: 'budget',
        label: 'Budget',
    },
] as const;

export const PROJECT_TYPE_OPTIONS_IDS = projectTypeOptions.map((option) => option.id);
export const GOALS_OPTIONS_IDS = goalsOptions.map((option) => option.id);
export const CHALLENGES_OPTIONS_IDS = challengesOptions.map((option) => option.id);
