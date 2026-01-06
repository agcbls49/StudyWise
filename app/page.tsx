import Stopwatch from "@/components/Stopwatch";

export default function Home() {
  return (
    <div className="mt-25 md:container md:mx-auto text-center">
      <div className="text-3xl">
        Welcome to <span className="font-bold">Study Wise</span> 
      </div>
      <div className="mt-10">
        <div className="text-2xl">
          A study session tracker made using NextJS
        </div>
      </div>
      <div className="mt-20 text-5xl flex flex-col items-center justify-center">
        <Stopwatch/>
      </div>
    </div>
  );
}
