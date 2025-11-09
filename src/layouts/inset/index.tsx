import { Outlet } from 'react-router';

import { Header } from '../header';

import { SidebarInset } from '@/components/animate-ui/components/radix/sidebar';

export const Inset = () => {
  return (
    <SidebarInset>
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Outlet />
      </div>
    </SidebarInset>
  );
};
