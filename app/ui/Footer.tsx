import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { FaRegPaperPlane, FaRegEnvelope } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacts</h3>
            <p className="text-sm flex items-center gap-2 mb-2">
              <GiGreekTemple size={15} /> Plot 801, Ebitu Ukiwe Street, Jabi,
              Abuja, Nigeria
            </p>
            <p className="text-sm flex items-center gap-2">
              <FaPhone size={15} /> 6232 (Toll-Free Call Centre)
            </p>
            <p className="text-sm flex items-center gap-2 mt-2">
              <FaRegEnvelope size={15} />
              info@ncdc.gov.ng
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Social Media</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline flex items-center gap-1">
                  <Facebook size={15} />
                  @NCDCgov
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center gap-1">
                  <Twitter size={15} />
                  @NCDCgov
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center gap-1">
                  <Youtube size={15} />
                  NCDC
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center gap-1">
                  <Instagram size={15} />
                  NCDCgov
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center gap-1">
                  <FaRegPaperPlane size={15} />
                  t.me/NCDCgov (Telegram)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mandate Of NCDC</h3>
            <p className="text-sm">
              The Nigeria Centre for Disease Control and Prevention (NCDC) was
              established in the year 2011 in response to the challenges of
              public health emergencies and to enhance Nigeria&apos;s
              preparedness and response to epidemics through prevention,
              detection and control of communicable diseases.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright Strip */}
      <div className="bg-yellow-400 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p className="text-gray-800 font-semibold">
            © 2026 Nigeria Centre for Disease Control and Prevention (NCDC). All
            rights reserved.
          </p>
          <div className="flex gap-4">
            {/* <a href="#" className="text-gray-800 hover:text-gray-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              <Instagram size={20} />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
