import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface CustomTextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  inputValue?: string;
  label?: string;
  error?: string[] | null;
  inputClassName?: string;
  value?: any;
  setValue?: Dispatch<SetStateAction<any>>;
}

export default function TextArea({
  inputValue,
  label,
  error,
  inputClassName,
  value,
  setValue,
  ...props
}: CustomTextAreaProps) {
  return (
    <div className="col-span-2 flex flex-col gap-4">
      <label htmlFor={props.id}>{label ? label : inputValue}:</label>
      <textarea
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
        className={cn(
          'dark:text-mono-100 h-full min-h-[5lh] w-full grow resize-none justify-start rounded-md border border-main-400 bg-main-200 p-2 text-left text-base font-normal placeholder:text-main-200 focus:outline-none dark:border-main-400 dark:bg-main',
          inputClassName
        )}
        {...props}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
