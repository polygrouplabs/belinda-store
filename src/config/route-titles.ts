type RouteTitle = {
    title: string;
    description: string;
}

export const ROUTE_TITLES: Record<string, RouteTitle> = {
    '/store': {
        title: 'Ropa para Mujer',
        description: 'Siente el estilo que Belinda trae para ti en la nueva colección de ropa para mujer con texturas, prints y acabados que se adaptan a todos los estilos.'
    },
    '/store/dress': {
        title: 'Vestidos',
        description: 'Descubre nuestra colección de vestidos elegantes y modernos, diseñados para realzar tu belleza en cualquier ocasión.'
    },
    '/store/blouse': {
        title: 'Blusas',
        description: 'Explora nuestra selección de blusas versátiles y elegantes, perfectas para completar tu look diario con estilo.'
    },
    '/store/pants': {
        title: 'Pantalones',
        description: 'Descubre nuestra colección de pantalones cómodos y versátiles, ideales para cualquier ocasión.'
    },
    '/store/accessory': {
        title: 'Accesorios',
        description: 'Encuentra los accesorios perfectos para complementar tu look, desde bolsos elegantes hasta joyas que realzan tu estilo.'
    },
    '/store/new-collection': {
        title: 'Nueva Colección',
        description: 'Descubre las últimas tendencias en moda femenina en Belinda.'
    },
    '/store/discount': {
        title: 'Ofertas',
        description: 'Aprovecha nuestras ofertas exclusivas en ropa de alta calidad. Encuentra tu estilo favorito a precios increíbles.'
    }
};

export function getRouteTitle(pathname: string): RouteTitle {
    return ROUTE_TITLES[pathname] || {
        title: 'Belinda',
        description: 'Belinda Shop'
    };
} 