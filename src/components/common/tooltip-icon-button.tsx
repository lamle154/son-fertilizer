import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/animate-ui/components/animate/tooltip';
import { Button, type ButtonVariantProps } from '@/components/animate-ui/components/buttons/button';
import { type ButtonProps as ButtonPrimitiveProps } from '@/components/animate-ui/primitives/buttons/button';

type TooltipIconButtonProps = {
  icon: React.JSX.Element;
  tooltip: string;
} & ButtonPrimitiveProps &
  ButtonVariantProps;

export const TooltipIconButton = ({
  icon,
  tooltip,
  children: _,
  ...props
}: TooltipIconButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button {...props}>{icon}</Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};
