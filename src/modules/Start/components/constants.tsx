import { BadgeQuestionIcon } from '@/assets/icons/steps/BadgeQuestionIcon';
import { HeartCircleIcon } from '@/assets/icons/steps/HeartCircleIcon';
import PackageIcon from '@/assets/icons/steps/PackageIcon';

export const STEPS_ITEMS = [
    {
        title: 'Take your style quiz',
        description:
            'Tell us about your likes/dislikes, goals, rooms you’re working on, and your solution needs. The more we know, the better your Designer can tailor the ideal solutions to fit your needs. ',
        icon: <BadgeQuestionIcon />,
    },
    {
        title: 'Tailored designs delivered, fast',
        description:
            'A dedicated (human!) designer reviews and curates design solutions catered to your unique project. You’ll have your designs in your inbox within 48 hours.',
        icon: <PackageIcon />,
    },
    {
        title: 'Collab with your Designer',
        description:
            'Let your Designer know what you think! Collaborate with your Designer via notes, email, or virtual meetings (completely your call) to dial in your design with unlimited revisions.',
        icon: <HeartCircleIcon />,
    },
];
