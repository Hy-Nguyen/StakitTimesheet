import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import ErrorMessage from './ErrorMessage';
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: string;
  label?: string;
  error?: string[] | undefined;
  inputClassName?: string;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}

export default function Input({
  inputValue,
  label,
  error,
  inputClassName,
  value,
  setValue,
  ...props
}: CustomInputProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={props.id}>{label ? label : inputValue}:</label>
      <input
        value={value ?? ''}
        id={props.id}
        name={props.id}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'h-10 w-full justify-start rounded-md border border-border bg-secondary px-2 text-left text-base font-normal text-secondary-foreground focus:outline-none',
          inputClassName
        )}
        {...props}
      />
      <ErrorMessage error={error} />
    </div>
  );
}
