"use client"
import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    function toggle(isShow:boolean): void {
        setIsShowing(isShow)
    }
    return [
        isShowing,
        toggle
    ] as const;
}

export default useModal;