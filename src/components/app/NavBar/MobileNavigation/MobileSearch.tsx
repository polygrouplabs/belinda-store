import { FormEvent, RefObject, useRef } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { useOnClickOutside } from 'usehooks-ts';
import { UIState } from '../types';
import { BsSearch } from 'react-icons/bs';
interface MobileSearchProps {
    uiState: UIState;
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function MobileSearch({ uiState, setUiState }: MobileSearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = () => {
        setUiState((prev: UIState) => ({ ...prev, searchVisible: false }));
    }

    useOnClickOutside(searchRef as RefObject<HTMLDivElement>, handleClickOutside, 'touchstart');

    const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("search keyword", uiState.keyword);
        setUiState((prev: UIState) => ({
            ...prev,
            searchVisible: false,
            keyword: ''
        }));
    };

    return (
        <div ref={searchRef}>
            <button
                aria-label="Buscar"
                onClick={() => setUiState((prev: UIState) => ({ ...prev, searchVisible: true }))}
                className="flex items-center justify-center"
            >
                <BsSearch size={26} />
            </button>
            <form
                onSubmit={handleSubmitSearch}
                className={`w-full absolute z-20 left-0 top-full px-5 ${uiState.searchVisible ? 'h-[63px]' : 'h-[0px]'
                    } bg-background transition-[height] overflow-hidden duration-300`}
            >
                <div className='gap-2 h-full flex justify-between items-center'>
                    <input
                        value={uiState.keyword}
                        onChange={(e) => setUiState((prev: UIState) => ({
                            ...prev,
                            keyword: e.target.value
                        }))}
                        type="text"
                        placeholder="Buscar..."
                        className='h-[42px] flex-1 border-b-2 border-grey-dark outline-none'
                    />
                    <button
                        type="submit"
                        aria-label="Enviar búsqueda"
                        className="flex w-10 h-10"
                    >
                        <HiOutlineSearch size={18} className="m-auto" />
                    </button>
                </div>
            </form>
        </div>
    );
} 