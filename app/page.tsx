import Stopwatch from "@/components/Stopwatch";

export default function Home() {
  return (
    <div className="mt-15 md:container md:mx-auto text-center">
      <div className="text-3xl">
        Welcome to <span className="font-bold">StudyWise</span> 
      </div>
      <div className="mt-10">
        <div className="text-2xl">
          A simple study session tracker
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Stopwatch/>
      </div>
    </div>
  );
}
