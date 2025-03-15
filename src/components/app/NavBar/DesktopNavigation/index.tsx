import Logo from '@/assets/Belinda-text-Icon-Colorway-Gold.svg';
import Link from 'next/link';
import { UIState } from '../types';
import ShoppingCart from '../ShoppingCart';
import DesktopSearch from './DesktopSearch';
import DesktopMenu from './DesktopMenu';

interface DesktopNavigationProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export function DesktopNavigation({ uiState, setUiState }: DesktopNavigationProps) {
    return (
        <nav
            className='w-full mx-auto hidden lg:block z-[900] h-[90px] sticky top-[50px] bg-background text-gold-light'>
            <div className='container h-full mx-auto px-4 flex items-center gap-4 justify-between'>
                <Link href='/' className="w-[150px] h-[90px] overflow-hidden flex items-center justify-center hover:text-gold"><Logo /></Link>
                <div className='flex flex-1 items-center gap-6'>
                    <DesktopMenu uiState={uiState} setUiState={setUiState} />
                    <DesktopSearch uiState={uiState} setUiState={setUiState} />
                    <ShoppingCart />
                </div>
            </div>
        </nav>
    );
}