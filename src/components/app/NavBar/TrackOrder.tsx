"use client"

import { UIState } from "./types";
import { Button } from "@/components/ui/button";
import { TfiClose } from "react-icons/tfi";
import { Input } from "@/components/ui/input";

interface TrackOrderProps {
    uiState: {
        trackOrderVisible: boolean;
    };
    setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function TrackOrder({ uiState, setUiState }: TrackOrderProps) {
    if (!uiState.trackOrderVisible) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 实现查询逻辑
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
            <div className="w-full relative max-w-[425px] lg:max-w-[unset] lg:w-[600px] bg-background rounded-lg lg:rounded-xl overflow-hidden">
                <div className="p-6 lg:px-10 lg:py-20">

                    <button
                        onClick={() => setUiState(prev => ({ ...prev, trackOrderVisible: false }))}
                        className="absolute top-2 right-2 text-grey hover:text-grey-dark"
                    >
                        <TfiClose size={26} />
                    </button>

                    <div className="text-h3 lg:text-h2 text-center font-bold text-grey-dark">
                        Consultar pedido
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 mt-6 lg:mt-8">
                        <div className="space-y-4 w-full lg:max-w-[350px]">
                            <p className="text-center text-h5 text-grey-dark lg:text-h4">
                                Ingresa el número del pedido
                            </p>
                            <Input
                                type="text"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="form-solid"
                            className="w-full lg:max-w-[480px] h-[68px] text-[14px] leading-[28px] font-bold lg:w-[174px]"
                        >
                            Consultar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
} 