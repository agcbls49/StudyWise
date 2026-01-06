"use client"

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';

export default function Timer() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const intervalIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = window.setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
            }
        }

    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        // Hours and Minutes in ms for displaying
        const origHours = 3600000;
        const origMinutes = 60000;

        // Time conversion (ms to whole number)
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        const seconds = Math.floor(elapsedTime / (1000) % 60);
        const milliseconds = Math.floor(elapsedTime % 1000 / 10);

        // Add 0 before the number for display
        const displayHours = String(hours).padStart(2, "0");
        const displayMinutes = String(minutes).padStart(2, "0");
        const displaySeconds = String(seconds).padStart(2, "0");
        const displayMilliseconds = String(milliseconds).padStart(2, "0");

        if (elapsedTime >= origHours) {
            return `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
        }
        else if(elapsedTime >= origMinutes){
            return `${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
        }
        else {
            return `${displaySeconds}:${displayMilliseconds}`;
        }
    }

    return(
        <div>
            <div className='h-80 w-80 rounded-full bg-white shadow-2xl flex items-center justify-center'>
                <div className='text-center text-5xl'>
                    {formatTime()}
                </div>
            </div>
            <div className="mt-15 space-x-5">
                <button className="bg-[#28A745] hover:bg-[#1E7E34] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-2 px-4 rounded-lg cursor-pointer"
                onClick={start}>
                    Start
                </button>
                <button className="bg-[#DC3545] hover:bg-[#A71D2A] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-2 px-4 rounded-lg cursor-pointer"
                onClick={reset}>
                    Stop
                </button>
                <Link href={"/history"}>
                    <button className="bg-[#6F4E37] hover:bg-[#4B3621] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-2 px-4 rounded-lg cursor-pointer">
                        History
                    </button>
                </Link>
            </div>
        </div>
    );
}