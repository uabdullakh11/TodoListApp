"use client"
import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    function toggle(): void {
        setIsShowing(!isShowing)
    }
    return [
        isShowing,
        toggle
    ] as const;
}

export default useModal;