import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: string;
  label?: string;
  error?: string[] | null;
  inputClassName?: string;
  value?: any;
  setValue?: Dispatch<SetStateAction<any>>;
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
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
        className={cn(
          'dark:text-mono-100 h-10 w-full justify-start rounded-md border border-main-400 bg-main-200 px-2 text-left text-base font-normal placeholder:text-main-200 focus:outline-none dark:border-main-400 dark:bg-main',
          inputClassName
        )}
        {...props}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
