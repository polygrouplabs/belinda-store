export type MenuLink = {
  label: string;
  href: string;
};

export type MenuItem = {
  label: string;
  type: "link" | "category" | "action";
  href?: string;
  action?: "trackOrder" | "login" | "search" | "cart" | "layout";
  children?: MenuLink[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
};

// 面包屑映射
export const BREADCRUMB_MAPPING: Record<string, string> = {
  "nueva-coleccion": "Nueva colección",
  vestidos: "Vestidos",
  blusas: "Blusas",
  pantalones: "Pantalones",
  accesorios: "Accesorios",
  productos: "Tienda",
  ofertas: "Ofertas",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    type: "link",
    href: "/",
    mobileOnly: true,
  },
  {
    label: "Nueva colección",
    type: "link",
    href: "/productos/nueva-coleccion",
  },
  {
    label: "Tienda",
    type: "category",
    children: [
      {
        label: "Vestidos",
        href: "/productos/vestidos",
      },
      {
        label: "Blusas",
        href: "/productos/blusas",
      },
      {
        label: "Pantalones",
        href: "/productos/pantalones",
      },
      {
        label: "Accesorios",
        href: "/productos/accesorios",
      },
      {
        label: "Ver todo",
        href: "/productos",
      },
    ],
  },
  {
    label: "Ofertas",
    type: "link",
    href: "/productos/ofertas",
  },
  {
    label: "",
    type: "action",
    action: "layout",
    desktopOnly: true,
  },
  {
    label: "Rastrear pedido",
    type: "action",
    action: "trackOrder",
  },
  {
    label: "Perfil",
    type: "action",
    action: "login",
  },
];
