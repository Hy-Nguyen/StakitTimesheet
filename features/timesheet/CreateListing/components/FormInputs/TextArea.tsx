import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import ErrorMessage from './ErrorMessage';

interface CustomTextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  inputValue?: string;
  label?: string;
  error?: string[] | undefined;
  inputClassName?: string;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
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
    <div className="col-span-2 flex min-h-fit flex-col gap-4">
      <label htmlFor={props.id}>{label ? label : inputValue}:</label>
      <textarea
        value={value ?? ''}
        id={props.id}
        name={props.id}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'w-full grow resize-none justify-start rounded-md border border-main-400 bg-main-200 p-2 text-left text-base font-normal placeholder:text-main-200 focus:outline-none dark:border-main-400 dark:bg-main dark:text-mono-100',
          inputClassName
        )}
        {...props}
      />

      <ErrorMessage error={error} />
    </div>
  );
}
