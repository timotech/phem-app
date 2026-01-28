import * as HeroIcons from "@heroicons/react/24/outline";
//import SmallInfoForms from "./components/SmallInfoForms";
import Gallery from "./components/Gallery";

export default async function Page() {
  return (
    <div className="mt-4">
      <h2 className="text-3xl font-bold text-green-600">Dashboard</h2>
      <div className="flex space-x-4 mt-4">
        <p>
          Welcome to NCDC LMS Admin Dashboard. Please use the links by the left
          for administrative functions.
        </p>
      </div>
      <div className="flex mt-4">
        <div className="w-full space-y-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex items-center space-x-2">
              <h2 className="text-green-400 font-bold">Slider Images</h2>
              <HeroIcons.AcademicCapIcon className="text-green-400 w-6" />
            </div>
            <Gallery pageName={"Add Slider Images"} url={`/api/slider`} />
          </div>
        </div>
      </div>
    </div>
  );
}
