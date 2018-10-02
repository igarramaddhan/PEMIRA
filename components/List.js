import React from 'react';

type ListPropTypes = {
  items: Array<any>,
  renderItem(item: any): React.ReactNode
};

export default ({ items, renderItem }: ListPropTypes) => (
  <div>{items.map((val, index) => renderItem(val))}</div>
);
