import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold">Found It Pro</h1>
            <p className="text-purple-300">
              Reuniting lost treasures with their rightful owners.
            </p>
          </div>
          {/*  Icons */}
          <div className="flex space-x-6">
            <a
              target="_blank"
              href="https://www.facebook.com/rifat.alam.750983"
              className="hover:text-purple-200"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.59 0 0 .593 0 1.326v21.348C0 23.407.59 24 1.326 24h11.495v-9.294H9.692v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.408 24 24 23.407 24 22.674V1.326C24 .593 23.408 0 22.675 0z" />
              </svg>
            </a>
            <a
              target="_blank"
              href="https://twitter.com"
              className="hover:text-purple-200"
              aria-label="Twitter"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149 4.92 4.92 0 0 0 3.195 9.723a4.902 4.902 0 0 1-2.229-.616c-.054 2.282 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.604 3.417A9.867 9.867 0 0 1 .96 19.54a13.944 13.944 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/_re.chowdhury?utm_source=qr&igsh=MTQxcTd1cm9pMnl2OQ=="
              className="hover:text-purple-200"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.352 3.608 1.327.975.975 1.265 2.242 1.327 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.352 2.633-1.327 3.608-.975.975-2.242 1.265-3.608 1.327-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.352-3.608-1.327-.975-.975-1.265-2.242-1.327-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.352-2.633 1.327-3.608C4.535 2.515 5.802 2.225 7.168 2.163 8.433 2.105 8.813 2.093 12 2.093m0-2.163C8.741 0 8.332.013 7.052.072 5.773.131 4.633.42 3.678 1.376 2.723 2.331 2.434 3.471 2.375 4.75 2.316 6.03 2.304 6.44 2.304 9.7s.012 3.67.071 4.95c.059 1.28.348 2.42 1.303 3.375.955.955 2.095 1.244 3.375 1.303 1.28.059 1.689.071 4.95.071s3.67-.012 4.95-.071c1.28-.059 2.42-.348 3.375-1.303.955-.955 1.244-2.095 1.303-3.375.059-1.28.071-1.689.071-4.95s-.012-3.67-.071-4.95c-.059-1.28-.348-2.42-1.303-3.375-.955-.955-2.095-1.244-3.375-1.303C15.67.013 15.261 0 12 0zM12 5.838a6.162 6.162 0 1 0 6.162 6.162A6.164 6.164 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 3.999-3.999A4.002 4.002 0 0 1 12 16zM18.406 4.594a1.44 1.44 0 1 1-1.44 1.44 1.439 1.439 0 0 1 1.44-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-purple-500 pt-4 text-center text-sm text-purple-300">
          <p>
            &copy; {new Date().getFullYear()} Found It Pro. All rights reserved.
          </p>
          <p>
            Designed with <span className="text-red-400">&hearts;</span> by the
            Re Chowdhury
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
