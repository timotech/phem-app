import Image from "next/image";
import { ArrowRight, HeartPulse } from "lucide-react";

export default function Page() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side – Images */}
        <div className="relative flex justify-center md:justify-end">
          {/* First Image */}
          <div className="relative z-10">
            <Image
              src="/54.jpg"
              alt="Team working"
              width={320}
              height={420}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Second Image (overlapping) */}
          <div className="absolute top-16 left-18 hidden md:block">
            <Image
              src="/52.jpg"
              alt="Meeting room"
              width={320}
              height={420}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Right Side – Text */}
        <div>
          <span className="uppercase tracking-wide text-sm text-gray-500 font-semibold">
            About Us
          </span>

          <h2 className="text-4xl md:text-3xl font-bold text-gray-900 mt-2 leading-tight">
            A healthier and safe Nigeria through the prevention and control of
            diseases of public health importance
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Our mission is to protect the health of Nigerians through
            evidence-based prevention, integrated disease surveillance and
            response activities, using a one health approach, guided by research
            and led by a skilled workforce.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
            <div className="group bg-white shadow-sm hover:shadow-md rounded-xl p-5 transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer">
              <HeartPulse className="text-green-500 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                Our Services
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Nigeria Centre for Disease Control and Prevention (NCDC) is
                the national public health institute with the mandate to lead
                the preparedness, detection and response to infectious disease
                outbreaks and public health emergencies.
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-4">
                The first took place in 2011 when some departments in the
                Ministry of Health, including the Epidemiology Division, the
                Avian Influenza Project and its laboratories; and the Nigeria
                Field Epidemiology and Laboratory Training Programme (NFELTP)
                were moved to form the nucleus of the agency.
              </p>
              <a
                href="/home/about"
                className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold transition-colors"
              >
                <span>Discover More</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
