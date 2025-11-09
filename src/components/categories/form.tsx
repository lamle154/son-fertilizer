import { useEffect, useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/animate-ui/components/radix/sheet';
import { TooltipIconButton } from '@/components/common/tooltip-icon-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Category } from '@/generated/types';
import { usePrevious } from '@/hooks/use-previous';

interface CategoriesFormProps {
  onSubmit: (data: Category) => Promise<void>;
  saving: boolean;
  error: Record<string, string> | null;
}

export function CategoriesForm(props: CategoriesFormProps) {
  const { onSubmit, saving, error } = props;

  const [open, setOpen] = useState(false);
  const previousSaving = usePrevious(saving);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Category>({
    defaultValues: {
      name: '',
      detail: '',
    },
  });

  const handleFormSubmit: SubmitHandler<Category> = async data => {
    await onSubmit(data);
  };

  useEffect(() => {
    if (error) {
      Object.entries(error).forEach(([fieldName, message]) => {
        setError(fieldName as keyof Category, { message: message as string, type: 'manual' });
      });
    }
  }, [error, setError]);

  useEffect(() => {
    if (!saving && previousSaving && !Object.keys(errors).length) {
      setOpen(false);
    }
  }, [errors, saving, previousSaving]);

  return (
    <Sheet open={open}>
      <TooltipIconButton
        icon={<PlusIcon />}
        tooltip="Thêm phân loại"
        onClick={() => setOpen(true)}
      />
      <SheetContent className="w-1/2">
        <SheetHeader>
          <SheetTitle>Thêm mới phân loại</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Tên phân loại</Label>
            <Input
              {...register('name', { required: 'Tên phân loại là bắt buộc' })}
              id="name"
              required
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="detail">Chi tiết</Label>
            <Textarea {...register('detail')} id="detail" />
          </div>
        </div>
        <SheetFooter>
          <Button
            loading={isSubmitting || saving}
            type="submit"
            onClick={handleSubmit(handleFormSubmit)}
          >
            Lưu
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Đóng
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
