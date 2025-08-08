import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Button> & {
	label?: string;
};

/**
 * ResetButton component
 *
 * @param resetLabel - The label for the reset button.
 * @param disabled - Whether the button is disabled.
 * @param className - The class name for the button.
 * @returns The ResetButton component.
 */

export const ResetButton = ({
	label = 'Reset',
	disabled = false,
	className,
	onClick,
	...props
}: Props) => {
	const form = useFormContext();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		form.reset();
		onClick?.(e);
	};

	return (
		<Button
			type="reset"
			variant={'outline'}
			size={'sm'}
			disabled={disabled}
			className={cn(className)}
			onClick={handleClick}
			{...props}
		>
			{label}
		</Button>
	);
};

ResetButton.displayName = 'ResetButton';
