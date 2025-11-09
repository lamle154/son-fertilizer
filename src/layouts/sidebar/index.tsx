import { useCallback } from 'react';

import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/animate-ui/components/radix/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import { Avatar } from '@/components/ui/avatar';
import { MENU_TITLE, MENUS } from '@/constants/menu';

export const Sidebar = () => {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const handleNavigate = useCallback((url: string) => navigate(url), []);

  return (
    <SidebarComponent collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-accent-foreground" size="lg">
              <div className="flex aspect-square items-center justify-center rounded-sm bg-sidebar-transparent text-sidebar-primary-foreground">
                <Avatar className={`${open ? 'rounded-lg' : 'rounded-full'}`}>
                  <AvatarImage src="/icon.svg" />
                  <AvatarFallback className="rounded-sm">TS</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Thanh Sơn</span>
                <span className="truncate text-xs">Phân bón & Hạt giống</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Nav Main */}
        {Object.entries(MENUS).map(([key, value]) => (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{MENU_TITLE[key as keyof typeof MENU_TITLE]}</SidebarGroupLabel>
            <SidebarMenu>
              {value.map(item => (
                <Collapsible className="group/collapsible" key={item.url} asChild>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleNavigate(item.url)}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  );
};
