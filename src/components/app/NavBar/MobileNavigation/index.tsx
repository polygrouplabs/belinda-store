import Logo from '@/assets/Belinda-text-Icon-Colorway-Gold.svg';
import Link from 'next/link';
import MobileSearch from './MobileSearch';
import { MobileMenu } from './MobileMenu';
import ShoppingCart from '../ShoppingCart';
import { UIState } from '../types';

interface MobileNavigationProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export function MobileNavigation({ uiState, setUiState }: MobileNavigationProps) {
    return (
        <nav
            className='w-full z-[900] h-[82px] lg:hidden sticky top-[50px] bg-background'>
            <div className="h-full flex container px-5 mx-auto justify-between items-center">
                <Link href='/' className="w-[150px] h-[82px] overflow-hidden flex items-center justify-center"><Logo /></Link>
                <div className="flex items-center gap-4">
                    <MobileSearch uiState={uiState} setUiState={setUiState} />
                    <ShoppingCart />
                    <MobileMenu uiState={uiState} setUiState={setUiState} />
                </div>
            </div>
        </nav>
    );
} 