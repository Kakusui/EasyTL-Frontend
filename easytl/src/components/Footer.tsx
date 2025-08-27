// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

import { Link } from 'react-router-dom';

const Footer = () => 
{
  return (
    <footer className="mt-auto py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
      <div className="flex flex-col gap-2">
        <span>Made by <Link 
          to="https://kakusui.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="link-underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Tetra Group LLC DBA Kakusui LLC
        </Link> © Copyright 2024-{new Date().getFullYear()}</span>
        <div className="flex flex-wrap justify-center items-center gap-4 px-4">
          <Link 
            to="/terms"
            className="link-underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/about"
            className="link-underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            About
          </Link>
          <Link
            to="/privacy"
            className="link-underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
