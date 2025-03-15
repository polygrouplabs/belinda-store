export type MenuLink = {
    label: string;
    href: string;
}

export type MenuItem = {
    label: string;
    type: 'link' | 'category' | 'action';
    href?: string;
    action?: 'trackOrder' | 'login' | 'search' | 'cart' | 'layout';
    children?: MenuLink[];
    mobileOnly?: boolean;
    desktopOnly?: boolean;
}

// 面包屑映射
export const BREADCRUMB_MAPPING: Record<string, string> = {
    'new-collection': 'Nueva colección',
    'dress': 'Vestidos',
    'blouse': 'Blusas',
    'pants': 'Pantalones',
    'accessory': 'Accesorios',
    'store': 'Tienda',
    'discount': 'Ofertas'
};

export const MENU_ITEMS: MenuItem[] = [
    {
        label: "Home",
        type: "link",
        href: "/",
        mobileOnly: true
    },
    {
        label: "Nueva colección",
        type: "link",
        href: "/store/new-collection"
    },
    {
        label: "Tienda",
        type: "category",
        children: [
            {
                label: "Vestidos",
                href: "/store/dress"
            },
            {
                label: "Blusas",
                href: "/store/blouse"
            },
            {
                label: "Pantalones",
                href: "/store/pants"
            },
            {
                label: "Accesorios",
                href: "/store/accessory"
            },
            {
                label: "Ver todo",
                href: "/store"
            }
        ]
    },
    {
        label: "Ofertas",
        type: "link",
        href: "/store/discount"
    },
    {
        label: "",
        type: "action",
        action: "layout",
        desktopOnly: true
    },
    {
        label: "Rastrear pedido",
        type: "action",
        action: "trackOrder"
    },
    {
        label: "Perfil",
        type: "action",
        action: "login"
    }
];