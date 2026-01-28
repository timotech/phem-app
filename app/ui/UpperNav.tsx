import Image from "next/image";

export default function UpperNav() {
  return (
    <div className="flex justify-between items-center px-12 py-1">
      <Image src="/logo.jpg" alt="NCDC Logo" width={302} height={97} />
      <div className="flex">
        <div className="text-lg text-gray-700">
          <h1 className="text-3xl font-bold">
            Nigeria Centre for Disease Control and Prevention
          </h1>
          <p className="text-lg italic text-right">
            Protecting the health of Nigerians
          </p>
        </div>
        <Image
          src="/icon3.jpg"
          alt="Connect Client"
          width={64}
          height={48}
          className="ml-4"
        />
      </div>
    </div>
  );
}
