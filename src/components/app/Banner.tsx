"use client"

import Image from 'next/image';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlSocialInstagram } from 'react-icons/sl';
import { TfiArrowDown } from 'react-icons/tfi';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const bannerImages = {
    mobile: [
        '/Belinda-Banner-Home-Mobile-1.jpg',
        '/Belinda-Banner-Home-Mobile-2.jpg',
        '/Belinda-Banner-Home-Mobile-3.jpg',
        '/Belinda-Banner-Home-Mobile-4.jpg'
    ],
    desktop: [
        '/Belinda-Banner-Home-Deskt-1.jpg',
        '/Belinda-Banner-Home-Deskt-2.jpg',
        '/Belinda-Banner-Home-Deskt-3.jpg',
        '/Belinda-Banner-Home-Deskt-4.jpg',
    ],
    color: ['#bbac99', '#c7b3ac', '#d7cab5', '#eee4e2']
};

const Banner = () => {
    const router = useRouter();
    return (
        <div className='relative'>
            {/* H5端 */}
            <div className='lg:hidden'>
                <Swiper
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    slidesPerView={1}
                    allowTouchMove={false}
                    speed={800}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        stopOnLastSlide: false,
                    }}
                >
                    {
                        bannerImages.mobile.map((image, index) => {
                            return <SwiperSlide key={index} className='relative w-full h-[800px]'
                                style={{ backgroundColor: bannerImages.color[index] }}>
                                <div className='relative w-full max-w-[460px] aspect-[1/2] mx-auto'>
                                    <Image
                                        alt='image'
                                        src={image}
                                        fill
                                        priority={index === 0}
                                        sizes='460px'
                                    />
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* PC端 */}
            <div className='hidden lg:block'>
                <Swiper
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    slidesPerView={1}
                    allowTouchMove={false}
                    speed={800}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        stopOnLastSlide: false,
                    }}
                >
                    {
                        bannerImages.desktop.map((image, index) => {
                            return <SwiperSlide key={index} className='relative w-full aspect-[1440/800]'>
                                <Image
                                    alt='image'
                                    src={image}
                                    fill
                                    priority={index === 0}
                                    sizes="(min-width: 1024px) 100vw"
                                />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* 文字区域 */}
            <div className='w-full h-full absolute inset-0 z-10 flex justify-center items-center lg:justify-between lg:px-[160px]'>
                <div className='flex flex-col items-center lg:items-start gap-4 text-white absolute lg:static top-[300px]'>
                    <span className='text-[14px] leading-[30px] tracking-[5px] lg:text-h4 select-none'>New Colecction</span>
                    <span className='text-6xl lg:text-9xl select-none tracking-[0.2px]'>Snow</span>
                    <span className='text-6xl lg:text-9xl select-none tracking-[0.2px]'>Season</span>
                    <Button variant="poster" onClick={() => router.push('/productos/nueva-coleccion')} className='w-[194px] h-[68px] flex'>
                        <span className='text-sm lg:text-[14px] leading-[28px] m-auto'>Ver lo nuevo</span>
                    </Button>
                </div>
                <div className='hidden lg:flex flex-col items-center gap-4'>
                    <span className='text-h6 text-white [writing-mode:vertical-rl] select-none'>Follow us</span>
                    <Link href='/' className='w-[35px] h-[35px] rounded-full bg-white flex'>
                        <SlSocialInstagram className='m-auto text-gold' size={20} />
                    </Link>
                </div>
            </div>

            <Link href="#main" className="hidden lg:inline">
                <TfiArrowDown className='absolute z-10 left-1/2 -translate-x-1/2 bottom-[100px] text-white' size={30} />
            </Link>
        </div>
    )
};

export default Banner;