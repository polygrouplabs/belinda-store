"use client"

import { useState } from 'react';
import { DesktopNavigation } from './DesktopNavigation';
import TrackOrder from './TrackOrder';
import { MobileNavigation } from './MobileNavigation';

export default function NavBar() {
    const [uiState, setUiState] = useState({
        searchVisible: false,
        menuVisible: false,
        trackOrderVisible: false,
        keyword: '',
        expandedItem: null as string | null
    });

    return (
        <>
            <MobileNavigation uiState={uiState} setUiState={setUiState} />
            <DesktopNavigation uiState={uiState} setUiState={setUiState} />
            <TrackOrder uiState={uiState} setUiState={setUiState} />
        </>
    );
} 