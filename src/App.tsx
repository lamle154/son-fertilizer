import { BrowserRouter, Routes, Route } from 'react-router';

import { Inset } from '@/layouts/inset';
import { Sidebar } from '@/layouts/sidebar';

import { Home } from '@/pages/home-page';

import { SidebarProvider } from '@/components/animate-ui/components/radix/sidebar';

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Sidebar />

        <Routes>
          <Route element={<Inset />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
};
