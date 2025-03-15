export interface UIState {
  searchVisible: boolean;
  menuVisible: boolean;
  trackOrderVisible: boolean;
  keyword: string;
  expandedItem: string | null;
}

type BaseMobileMenuItem = {
  label: string;
  children?: MenuItem[];
};

type LinkMenuItem = BaseMobileMenuItem & {
  type: 'link';
  href: string;
};

type ActionMenuItem = BaseMobileMenuItem & {
  type: 'action';
  action: 'trackOrder' | 'login' | 'shop' | 'empty';
};

export type MenuItem = LinkMenuItem | ActionMenuItem;