import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

const Button = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> & {
    asChild?: boolean;
}) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp data-slot="button" className={clsx('cursor-pointer', className)} {...props} />;
};

export { Button };
