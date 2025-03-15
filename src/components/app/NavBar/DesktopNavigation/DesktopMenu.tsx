import { UIState } from '../types';
import { MENU_ITEMS } from '@/config/menu';
import DesktopMenuItem from './DesktopMenuItem';

interface DesktopMenuProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function DesktopMenu({ uiState, setUiState }: DesktopMenuProps) {
    return (
        <div className="h-full flex flex-1 items-center gap-6">
            {MENU_ITEMS.filter(item => !item.mobileOnly).map((item, index) => (
                <DesktopMenuItem key={index} item={item} uiState={uiState} setUiState={setUiState} />
            ))}
        </div>
    );
} 