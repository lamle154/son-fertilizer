import { BrowserRouter, Route, Routes } from 'react-router';

import { SidebarProvider } from '@/components/animate-ui/components/radix/sidebar';
import { Inset } from '@/layouts/inset';
import { Sidebar } from '@/layouts/sidebar';
import { Home } from '@/pages/home-page';
import { Categories } from '@/pages/masters/categories';
import { Orders } from '@/pages/masters/orders';

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Sidebar />

        <Routes>
          <Route element={<Inset />}>
            <Route element={<Home />} index />
            <Route element={<Orders />} path="/orders" />
            <Route element={<Categories />} path="/categories" />
            <Route element={<Orders />} path="/products" />
            <Route element={<Orders />} path="/customers" />
            <Route element={<Orders />} path="/inventory" />
            <Route element={<Orders />} path="/imports" />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
};
