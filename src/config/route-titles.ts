type RouteTitle = {
    title: string;
    description: string;
}

export const ROUTE_TITLES: Record<string, RouteTitle> = {
    '/productos': {
        title: 'Ropa para Mujer',
        description: 'Siente el estilo que Belinda trae para ti en la nueva colección de ropa para mujer con texturas, prints y acabados que se adaptan a todos los estilos.'
    },
    '/productos/vestidos': {
        title: 'Vestidos',
        description: 'Descubre nuestra colección de vestidos elegantes y modernos, diseñados para realzar tu belleza en cualquier ocasión.'
    },
    '/productos/blusas': {
        title: 'Blusas',
        description: 'Explora nuestra selección de blusas versátiles y elegantes, perfectas para completar tu look diario con estilo.'
    },
    '/productos/pantalones': {
        title: 'Pantalones',
        description: 'Descubre nuestra colección de pantalones cómodos y versátiles, ideales para cualquier ocasión.'
    },
    '/productos/accesorios': {
        title: 'Accesorios',
        description: 'Encuentra los accesorios perfectos para complementar tu look, desde bolsos elegantes hasta joyas que realzan tu estilo.'
    },
    '/productos/nueva-coleccion': {
        title: 'Nueva Colección',
        description: 'Descubre las últimas tendencias en moda femenina en Belinda.'
    },
    '/productos/ofertas': {
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