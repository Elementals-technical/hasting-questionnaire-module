export const stageOptions = [
    {
        id: 'just-getting-started',
        label: 'Just Getting Started',
        hasTooltip: false,
    },
    {
        id: 'need-ideas-and-inspo',
        label: 'I Need Ideas And Inspo',
        hasTooltip: false,
    },
    {
        id: 'need-help-planning-space',
        label: 'I Need Help Planning My Space',
        hasTooltip: true, // для иконки (i)
        tooltipText:
            'Our space planning service includes layout recommendations, room conceptualization, footprint optimization, and solution ideation and curation. This offer does not include the creation of CAD, Rivet or 3D asset files; however, our team will utilize our proprietary, interactive room planner to visualize your space.',
    },
    {
        id: 'need-help-crafting-solutions',
        label: 'I Need Help Crafting Solutions',
        hasTooltip: false,
    },
    {
        id: 'at-the-finish-line',
        label: 'I’m At The Finish Line!',
        hasTooltip: false,
    },
] as const;

export const STAGE_OPTIONS_IDS = stageOptions.map((option) => option.id) as [string, ...string[]];
