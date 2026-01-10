"use client"

import {useState, useEffect, useRef, SyntheticEvent} from 'react';
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
    // for the task name input field
    const [taskname, setTaskName] = useState<string>("My Task");

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

    // for the task name input field
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if(taskname.trim().length == 0) return alert("Task name cannot be empty");
    }

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
        if(taskname.trim().length == 0) return;
        alert(`Task "${taskname}" was saved`);

        // load previous sessions from localStorage
        const storedSessions = JSON.parse(localStorage.getItem("sessions") || "[]");

        // identifier for the task entry to go in local storage
        const id = storedSessions.length;

        // object for storing both time and the task name
        const sessionEntry = {
            id: id,
            task: taskname,
            time: formatTime()
        };

        // push the object to the array and save into local storage
        storedSessions.push(sessionEntry);
        localStorage.setItem("sessions", JSON.stringify(storedSessions));
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
            <div className='mt-10 text-xl w-full max-w-sm min-w-50 flex space-x-2'>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={taskname} onChange={handleChange}
                    className="w-full text-justify mb-5 bg-white placeholder:text-gray-400 text-black border border-transparent rounded-md px-2 py-2 transition duration-300 ease focus:outline-none shadow-lg" 
                    placeholder="Task Name"/>
                    <button type="submit"
                    className="bg-green border border-transparent hover:bg-hoverGreen hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl py-4 px-6 rounded-lg cursor-pointer"
                    onClick={save}>
                        <Save />
                    </button>
                    
                </form>
            </div>
            <div className="mt-15 space-x-5">
                <button className={`border border-transparent shadow-xl/20 text-white text-2xl py-4 px-6 rounded-lg cursor-pointer hover:transition-all duration-300 ease-in-out
                    ${isRunning ? "bg-black hover:bg-hoverBlack" : "bg-green hover:bg-hoverGreen" }`}
                    
                    // start or stop the timer based on if its running
                    onClick={() => {
                        if(isRunning) { 
                            stop();
                        } else {
                            start(); 
                        }
                    }}>
                    
                    {/* change icon based on if the timer is running or not */}
                    {isRunning ? <Square/> : <Play/>}
                </button>
                <button className="bg-red border border-transparent hover:bg-hoverRed hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl py-4 px-6 rounded-lg cursor-pointer"
                onClick={reset}>
                    <RotateCcw />
                </button>
                <Link href={"/history"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl py-4 px-6 rounded-lg cursor-pointer">
                        <History />
                    </button>
                </Link>
            </div>
            <br />
        </div>
    );
}