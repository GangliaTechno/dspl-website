import { faFacebook, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=" text-black w-full bg-white">
            <div className="py-6 relative overflow-hidden">
                <div className="mx-auto justify-between ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="inline text-black">
                        <img src="assets/icon_orange.png" className="h-16 mb-2" />
                        {/* <p>Phone: </p>
                        <p>Headquarters:</p>
                        <p>Email: </p> */}
                        <p className="text-xl font-bold md:ml-4">Innovating Today for a Smarter Tomorrow</p>
                    </div>
  
                    {/* Help Section */}
                    <div className="text-lg">
                        <h3 className="font-bold text-xl mb-4">Join the revolution
                        </h3>
                        <div className="ml-2">
                            <p className="text-base">
                                Explore how technologies can transform your busnesss operations, enhance efficiency, and create a sustainable future. Let's innovate together!
                            </p>
                            {/* <p><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></p> */}
                            {/* <p><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></p> */}
                            {/* <p><Link to="/ourteam" onClick={() => setIsOpen(false)}>Our team</Link></p> */}
                            {/* <p><Link to="/">Blog</Link></p> */}
                            {/* <p><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></p> */}
                        </div>
                    </div>

                    <div className="text-lg h-full">
                        <h3 className="font-bold text-xl mb-4">Our Domains</h3>
                        <div className="ml-2 *:hover:text-blue-500">
                            <p><Link to="/ourservices" onClick={() => setIsOpen(false)}>Branding & Ecommerce</Link></p>
                            <p><Link to="/ourproducts">Ed-Tech</Link></p>
                            <p><Link to="/ourproducts">Research & Development</Link></p>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="mr-6 items-center">
                        <h3 className="text-xl font-bold mb-6">Team Solutions</h3>
                        <p className="lg:ml-4 mb-4">Phone: +91 9999999999 </p>
                        <div className="flex space-x-6 text-2xl lg:ml-4">
                            <Link to="https://www.facebook.com/people/Ganglia-Technologies-Private-Limited/100093543685978/" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faFacebook} /></Link>
                            <Link to="https://x.com/Ganglia_in" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faXTwitter}/></Link>
                            <Link to="https://www.linkedin.com/company/ganglia-technologies-private-limited/" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faLinkedin} /></Link>
                            <a href={`mailto:${""}`}>
                                <FontAwesomeIcon
                                    className="transition hover:scale-125"
                                    icon={faEnvelope}
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyrights section */}
            <div className="bg-gray-100 py-1">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="text-gray-600 px-3">&copy; 2025 dashapatmaja.in All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
