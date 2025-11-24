import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const Button = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> & {
    asChild?: boolean;
}) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp data-slot="button" className={cn({ className })} {...props} />;
};

export { Button };
