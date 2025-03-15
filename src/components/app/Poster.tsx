"use client"

import Image from 'next/image';
import { useState } from 'react';

const Poster = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='w-full bg-gold'>
            {/* 移动端 */}
            <div className='lg:hidden container mx-auto px-4'>
                <div className='relative w-full max-w-[402px] aspect-[402/962] mx-auto'>
                    <Image
                        src="/Belinda-Banner-Coleccion-Mobile.jpg"
                        alt="poster"
                        fill
                        sizes="(max-width: 1024px) 402px"
                        className='object-cover'
                    />
                </div>
            </div>

            {/* PC端 */}
            <div
                className='hidden lg:block relative w-full aspect-[1440/800]'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src="/Poster.jpg"
                    alt="poster"
                    fill
                    sizes="(min-width: 1024px) 100vw"
                    className='object-cover'
                    priority
                />
                <Image
                    src="/PosterHover.jpg"
                    alt="poster hover"
                    fill
                    sizes="(min-width: 1024px) 100vw"
                    className={`object-cover absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
};

export default Poster;