import { memo } from 'react';

const OrdersComponent = () => {
  return <div>Orders</div>;
};

OrdersComponent.displayName = 'OrdersComponent';

export const Orders = memo(OrdersComponent);
