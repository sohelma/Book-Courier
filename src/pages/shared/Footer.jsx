import React from 'react';
import Logo from '../../components/logo/logo';

const Footer = () => {
    return (
    <footer className="footer sm:footer-horizontal bg-sky-300 clear text-base-content p-10
    mt-4">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4 mb-4">
     <a
    href="https://x.com/yourprofile"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black hover:text-blue-500 transition-colors duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-6 fill-current"  // narrow width, normal height
    >
      <path d="M21.09 3.027a.75.75 0 0 0-.527-.234h-16.5a.75.75 0 0 0-.527 1.28l6.824 6.824-6.824 6.823a.75.75 0 1 0 1.054 1.065l6.823-6.823 6.823 6.823a.75.75 0 1 0 1.054-1.065l-6.823-6.823 6.823-6.823a.75.75 0 0 0 .234-.527z"/>
    </svg>
  </a>

      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
       <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-current"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.391c.697-1.027 1.95-1.891 3.5-1.891 2.481 0 4.5 2.019 4.5 4.5v6z"/>
    </svg>
  </a>
    </div>

    <Logo></Logo>
  </nav>
 
  
</footer>

    );
};

export default Footer;