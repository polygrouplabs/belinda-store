import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineMenuAlt3 } from "react-icons/hi";
import { UIState } from '../types';
import MobileMenuItem from './MobileMenuItem';
import { MENU_ITEMS } from '@/config/menu';

interface MobileMenuProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export function MobileMenu({ uiState, setUiState }: MobileMenuProps) {
    return (
        <>
            <AnimatePresence mode="wait" initial={false}>
                {uiState.menuVisible ? (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            aria-label="Cerrar menú"
                            onClick={() => setUiState((prev: UIState) => ({ ...prev, menuVisible: false }))}
                            className='flex items-center justify-center'
                        >
                            <HiOutlineMenuAlt3 size={26} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            aria-label="Abrir menú"
                            onClick={() => setUiState(prev => ({ ...prev, menuVisible: true }))}
                            className='flex items-center justify-center'
                        >
                            <HiOutlineMenu size={26} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className={`w-full bg-background left-0 top-full absolute z-10 px-2 grid ${uiState.menuVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    } transition-[grid-template-rows] duration-300`}
            >
                <div className='flex text-xl overflow-hidden'>
                    <div className='w-full max-h-[calc(100vh_-132px)] overflow-auto'>
                        {MENU_ITEMS.filter(item => !item.desktopOnly).map((item, index) => (
                            <MobileMenuItem
                                key={index}
                                item={item}
                                uiState={uiState}
                                setUiState={setUiState}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}