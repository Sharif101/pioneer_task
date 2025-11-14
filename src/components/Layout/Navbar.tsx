import { CiGlobe } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

export function Navbar() {
  return (
    <div className="border-b bg-white p-6 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-red-500">Logo</h1>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <CiGlobe className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">EN</span>
          <IoIosArrowDown className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex items-center gap-2">
          <FiHelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">Help</span>
        </div>

        <div className="relative border border-solid border-gray-300 p-1 rounded">
          <FaRegBell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
            2
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
            JD
          </div>
          <span className="text-sm font-medium text-gray-800">John Doe</span>
          <IoIosArrowDown className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
