import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
      <div className="flex flex-col gap-2">
        <span>© Copyright 2024 Kakusui LLC</span>
        <div className="flex justify-center items-center gap-4">
          <Link 
            to="/terms"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            to="/privacy"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 