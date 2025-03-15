import { UIState } from "../types";
import { BsSearch } from "react-icons/bs";

interface DesktopSearchProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function DesktopSearch({ uiState, setUiState }: DesktopSearchProps) {

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUiState(prev => ({
            ...prev,
            searchVisible: false,
            keyword: ''
        }));
    };

    return (
        <form
            onSubmit={handleSubmitSearch}
            className='flex items-center hover:text-gold'
        >
            <input
                type="text"
                value={uiState.keyword}
                onChange={(e) => setUiState(prev => ({ ...prev, keyword: e.target.value }))}
                className={`h-[42px] ${uiState.searchVisible ? 'w-[240px]' : 'w-[0px]'} border-b-2 border-current outline-none transition-[width] duration-300`}
            />
            <button
                type="button"
                onClick={() => setUiState(prev => ({ ...prev, searchVisible: !prev.searchVisible }))}
                aria-label="Buscar" // 搜索"
            >
                <BsSearch size={22} />
            </button>
        </form>
    );
}
