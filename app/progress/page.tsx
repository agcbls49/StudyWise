import { House } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import Link from "next/link";

export default function Progress() {
    return(
        <div className='mt-15 md:container md:mx-auto text-center'>
            <div className="text-3xl font-bold">
                Progress Tracking
            </div>
            <div className="mt-10 space-x-10">
                <Link href={"history/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <ArrowBigLeft />
                    </button>
                </Link>
                <Link href={"/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <House />
                    </button>
                </Link>
            </div>
        </div>
    );
}