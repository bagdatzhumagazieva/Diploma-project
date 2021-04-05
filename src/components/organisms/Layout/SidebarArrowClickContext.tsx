import React from 'react';

const SidebarArrowClickContext =
  React.createContext({ showSidebar: false, setShowSidebar: (showSidebar: boolean) => {} });

export default SidebarArrowClickContext;
