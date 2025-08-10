import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type SwitchFieldProps<T extends FieldValues> = {
	name: Path<T>;
	label?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	column?: boolean;
	longGap?: boolean;
	reverse?: boolean;
	gap?: '2' | '4' | '6' | '8';
};

/**
 * SwitchField
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param className - The class name of the field.
 * @param disabled - The disabled state of the field.
 * @param required - The required state of the field.
 * @param column - The column state of the field.
 * @param longGap - The long gap state of the field.
 * @param reverse - The reverse state of the field.
 * @param gap - The gap state of the field.
 *
 * @returns The SwitchField component.
 */

export const SwitchField = <T extends FieldValues>({
	name,
	label,
	className,
	required = false,
	disabled = false,
	column = false,
	longGap = false,
	reverse = false,
	gap = '2',
}: SwitchFieldProps<T>) => {
	const { control } = useFormContext<T>();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className={className}>
					<FormControl>
						<div
							className={cn(
								'relative flex items-center',
								`gap-${gap}`,
								column ? 'flex-col items-start' : '',
								longGap ? 'justify-between' : ''
							)}
						>
							<Switch
								className={cn(reverse ? 'order-1' : 'order-0')}
								onCheckedChange={field.onChange}
								id={name}
								checked={field.value}
								disabled={disabled}
							/>
							{label && (
								<FormLabel
									htmlFor={name}
									className={cn(reverse ? 'order-0' : 'order-1')}
								>
									<span>{label}</span>
									{required && <span className="ml-1 text-red-500">*</span>}
								</FormLabel>
							)}
						</div>
					</FormControl>
					<FormMessage className="line-clamp-1 text-xs" />
				</FormItem>
			)}
		/>
	);
};

SwitchField.displayName = 'SwitchField';
