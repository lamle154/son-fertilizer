import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/animate-ui/components/animate/tooltip';
import { Button } from '@/components/ui/button';

export const Home = () => {
  return (
    <TooltipProvider openDelay={0}>
      <Tooltip side='right' align='center'>
        <TooltipTrigger asChild>
          <Button>
            <span>Tooltip</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
