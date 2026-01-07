"use client"

import {useState, useEffect, useRef} from 'react';
import { Play } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { History } from 'lucide-react';
import { Square } from 'lucide-react';
import { Save } from 'lucide-react';

import Link from 'next/link';

export default function Timer() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // how long the stopwatch has run
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    // useRef used for persistency across renders
    // used for starting/stopping the interval
    const intervalIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if(isRunning){
            // change time every 10ms
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
    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function save() {
        stop();
        // save to local storage
        const storedTime = JSON.parse(localStorage.getItem("sessions") || "[]");
        storedTime.push(formatTime());
        localStorage.setItem("sessions", JSON.stringify(storedTime));
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
        <div className='flex flex-col items-center justify-center'>
            <div className='h-80 w-80 rounded-full bg-white shadow-2xl flex items-center justify-center'>
                <div className='text-center text-5xl'>
                    {formatTime()}
                </div>
            </div>
            <div className="mt-15 space-x-5">
                <Link href={"/history"}>
                    <button className="bg-black border border-transparent hover:bg-white hover:text-black hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <History />
                    </button>
                </Link>
                <button className="bg-[#28A745] border border-transparent hover:bg-[#1E7E34] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={start}>
                    <Play />
                </button>
                <button className="bg-black border border-transparent hover:bg-white hover:text-black hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={stop}>
                    <Square />
                </button>
                <button className="bg-[#DC3545] border border-transparent hover:bg-[#A71D2A] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={reset}>
                    <RotateCcw />
                </button>
                <button className="bg-[#28A745] border border-transparent hover:bg-[#1E7E34] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={save}>
                    <Save />
                </button>
            </div>
        </div>
    );
}