import { ClipboardIcon } from '@/assets/icons/steps/ClipboardIcon';
import { EyeIcon } from '@/assets/icons/steps/EyeIcon';
import { MessageIcon } from '@/assets/icons/steps/MessageIcon';
import { MessagesListIcon } from '@/assets/icons/steps/MessagesListIcon';

export const STEPS_ITEMS = [
    {
        title: 'Your designs, delivered',
        description: 'Sit back, relax and receive tailored designs in your inbox in 48 hours',
        icon: <ClipboardIcon />,
    },
    {
        title: 'Provide your feedback',
        description:
            'Leave notes directly in your curated solution document or schedule dedicated time with your designer',
        icon: <MessageIcon />,
    },
    {
        title: 'Unlimited revisions',
        description: 'Your designer dials in your designs and works on additional rooms based on your project scope',
        icon: <EyeIcon />,
    },
    {
        title: 'Expert designer insights',
        description: 'Get one-on-one design support and answers to all your questions at every stage ',
        icon: <MessagesListIcon />,
    },
];
