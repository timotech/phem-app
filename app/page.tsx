//import Image from "next/image";
import Carousel from "./ui/Carousel";
import Categories from "./ui/Categories";
import Courses from "./ui/Courses";

export default function Home() {
  return (
    <div>
      <Carousel />
      <Categories />
      <div className="pl-6 mt-4 mb-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Featured Courses
        </h1>
        <p className="text-lg text-slate-600">
          Discover and learn from our collection of courses
        </p>
      </div>
      <Courses />
    </div>
  );
}
