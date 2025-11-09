import { ArrowDownToLine, Box, List, Package, ReceiptText, Users } from 'lucide-react';

export const MENU_TITLE = {
  sales: 'Bán hàng',
  products: 'Sản phẩm',
  customers: 'Khách hàng',
  inventory: 'Kho',
} as const;

export const MENUS: Record<
  keyof typeof MENU_TITLE,
  { title: string; url: string; icon: React.ComponentType }[]
> = {
  sales: [
    {
      title: 'Đơn hàng',
      url: '/orders',
      icon: ReceiptText,
    },
  ],
  products: [
    {
      title: 'Phân loại',
      url: '/categories',
      icon: List,
    },
    {
      title: 'Sản phẩm',
      url: '/products',
      icon: Package,
    },
  ],
  customers: [
    {
      title: 'Khách hàng',
      url: '/customers',
      icon: Users,
    },
  ],
  inventory: [
    {
      title: 'Kho',
      url: '/inventory',
      icon: Box,
    },
    {
      title: 'Nhập hàng',
      url: '/imports',
      icon: ArrowDownToLine,
    },
  ],
};

export const MENU_INFORMATION = Object.entries(MENUS).reduce(
  (acc, [key, value]) => {
    value.forEach(item => {
      acc[item.url] = {
        title: item.title,
        parent: MENU_TITLE[key as keyof typeof MENU_TITLE],
      };
    });

    return acc;
  },
  {} as Record<string, { title: string; parent: string }>,
);
