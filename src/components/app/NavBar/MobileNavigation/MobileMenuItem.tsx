import { motion } from 'framer-motion';
import { MenuItem } from '@/config/menu';
import { useRouter } from 'next/navigation';
import { UIState } from '../types';
import { FaChevronRight } from 'react-icons/fa';

interface MenuItemProps {
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
  item: MenuItem;
}

export default function MobileMenuItem({
  uiState,
  setUiState,
  item
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
  }

  if (!item.children) {
    return (
      <button
        onClick={handleMenuItemClick}
        className='w-full h-[95px] text-center text-[30px] leading-[95px] select-none hover:bg-grey active:bg-grey-dark hover:text-white active:text-white'
      >
        {item.label}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={handleMenuItemClick}
        className='w-full h-[95px] text-center text-[30px] select-none flex justify-center items-center gap-2 hover:bg-grey active:bg-grey-dark hover:text-white active:text-white'
        aria-expanded={isExpanded}
        aria-controls={`submenu-${item.label}`}
      >
        <span>{item.label}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronRight size={20} />
        </motion.div>
      </button>
      <div
        id={`submenu-${item.label}`}
        className='bg-grey/10 transition-[height] duration-300 overflow-hidden'
        style={{ height: isExpanded ? item.children.length * 95 : 0 }}
        role="menu"
      >
        {item.children.map((child, index) => (
          <button
            key={index}
            onClick={() => {
              router.push(child.href);
              setUiState(prev => ({ ...prev, menuVisible: false }));
            }}
            className="w-full leading-[95px] text-center text-[30px] hover:bg-grey active:bg-grey-dark hover:text-white active:text-white"
          >
            {child.label}
          </button>
        ))}
      </div>
    </>
  )
}