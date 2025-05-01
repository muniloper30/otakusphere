
import { Link } from 'react-router-dom';
import LogoOtaku1 from '../assets/otakuLogo1.png';
import LogoOtaku2 from '../assets/otakuLogo2.png';



const FooterSection = () => {
    return (
      <footer className='text-center '>
      <div className="max-w-screen-xl mx-auto p-4 md:py-8 ">
          <div className="md:flex md:flex-row md:items-center md:justify-between justify-center items-center flex flex-col ">
              <Link to="/HomePage" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse ">
                  <img src= {LogoOtaku1}  className="pt h-15 w-15 md:h-15 md:w-15 hidden md:block" alt="OtakuSphere Logo" />
                  <p className="self-center text-2xl font-semibold text-[#F166B4] space-nowrap  font-[Saira]">Otaku<span className="text-[#1B9CF0]">Sphere</span> </p>
              </Link>
             
              <ul className="flex flex-wrap justify-center items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">About</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline">Contact</a>
                  </li>
              </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-white lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" class="hover:underline">Otakusphere™</a>. All Rights Reserved.</span>
      </div>
  </footer>
    );
  }
  
  export default FooterSection;