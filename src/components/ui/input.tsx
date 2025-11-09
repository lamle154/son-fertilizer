import * as React from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  clearable,
  ...props
}: React.ComponentProps<'input'> & { clearable?: boolean }) {
  return (
    <div className="relative">
      <input
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          clearable && 'pr-9',
          className,
        )}
        data-slot="input"
        type={type}
        {...props}
      />

      {clearable && (
        <Button
          className="absolute right-0 top-0"
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => {
            props.onChange?.({
              target: {
                value: '',
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}

export { Input };
