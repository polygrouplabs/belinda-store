import { motion } from 'framer-motion';
import { MenuItem } from '@/config/menu';
import { BsChevronDown } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UIState } from '../types';

interface MenuItemProps {
    className?: string;
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
    item: MenuItem;
}

export default function DesktopMenuItem({
    uiState,
    setUiState,
    item,
    className
}: MenuItemProps) {
    const router = useRouter();
    const isExpanded = uiState.expandedItem === item.label;

    const handleMenuItemClick = () => {
        if (item.type === 'link') {
            router.push(item.href!);
            setUiState(prev => ({ ...prev, menuVisible: false }));
        } else if (item.type === 'action') {
            switch (item.action) {
                case 'trackOrder': {
                    setUiState(prev => ({
                        ...prev,
                        menuVisible: false,
                        trackOrderVisible: true
                    }));
                    break;
                }
                case 'login': {
                    router.push('/login');
                    setUiState(prev => ({ ...prev, menuVisible: false }));
                    break;
                }
            }
        } else if (item.type === 'category') {
            setUiState(prev => ({
                ...prev,
                expandedItem: isExpanded ? null : item.label
            }));
        }
    };

    // 空元素用于布局
    if (item.type === 'action' && item.action === 'layout') {
        return <div className='flex-1' />;
    }

    // 普通链接
    if (item.type === 'link') {
        return (
            <Link
                href={item.href!}
                className={cn("hover:text-gold text-center", className)}
            >
                {item.label}
            </Link>
        );
    }

    // 带下拉菜单的项
    return (
        <div className="relative">
            <button
                onClick={handleMenuItemClick}
                className="flex items-center gap-2 cursor-pointer hover:text-gold"
                aria-expanded={isExpanded}
                aria-controls={`submenu-${item.label}`}
            >
                <span className="text-center">{item.label}</span>
                {item.children && (
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <BsChevronDown size={14} />
                    </motion.div>
                )}
            </button>

            {item.children && (
                <div
                    id={`submenu-${item.label}`}
                    className={`w-[131px] absolute left-1/2 -translate-x-1/2 top-full pt-4 ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
                        } transition-all duration-300`}
                >
                    <div className="bg-background py-2 flex flex-col items-center gap-2 text-sm">
                        {item.children.map((child, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    router.push(child.href);
                                    setUiState(prev => ({ ...prev, expandedItem: null }));
                                }}
                                className="w-[81px] h-[44px] hover:text-gold"
                            >
                                {child.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}