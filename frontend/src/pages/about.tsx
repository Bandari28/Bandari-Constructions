import { Award, MessageCircle, ShieldCheck, Star, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="bg-gray-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
                    About Premier Properties
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    We're passionate about connecting discerning clients with exceptional luxury
                    homes. With years of experience in premium real estate, we understand that
                    finding the perfect property is more than just a transaction—it's about
                    discovering your sanctuary in the world.
                </p>
            </div>

            {/* Mission and Values Section */}
            <div className="max-w-7xl mx-auto mt-10 sm:mt-12 lg:mt-16 px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Our Mission */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                            To make the home buying and selling process as smooth and stress-free as possible. We believe everyone deserves to find a place they can truly call home, and we're here to make that dream a reality through personalized service and expert guidance.
                        </p>
                    </div>

                    {/* Our Values */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <h2 className="text-xl sm:text-2xl font-semibold text-blue-600">Our Values</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-3 sm:space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                    <div>
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Integrity:</span>
                                        <span className="text-gray-600 ml-1 text-sm sm:text-base">Honest, transparent communication in every interaction</span>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                    <div>
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Excellence:</span>
                                        <span className="text-gray-600 ml-1 text-sm sm:text-base">Delivering exceptional service that exceeds expectations</span>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                                    <div>
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Community:</span>
                                        <span className="text-gray-600 ml-1 text-sm sm:text-base">Building lasting relationships within our neighborhoods</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Premier Properties Section */}
            <div className="max-w-7xl mx-auto mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-10 sm:mb-12 lg:mb-16">
                    Why Choose Premier Properties?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Expert Knowledge */}
                    <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Award className="text-blue-800 w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Expert Knowledge</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Our team has deep knowledge of local markets, pricing trends, and neighborhood insights to help you make informed decisions.
                        </p>
                    </div>

                    {/* Personalized Service */}
                    <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Personalized Service</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            We take the time to understand your unique needs and preferences, ensuring we find properties that truly match your lifestyle.
                        </p>
                    </div>

                    {/* Trusted Partner */}
                    <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Trusted Partner</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            With transparent communication and ethical practices, we've built a reputation as a trusted partner in real estate.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="min-h-[50vh] bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden p-6 sm:p-8 md:p-12 shadow-xl flex flex-col items-center justify-center text-center bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 min-h-[250px] sm:min-h-[300px] md:min-h-[350px]">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 sm:mb-6">
                        Ready to Find Your Dream Home?
                    </h1>
                    <p className="text-white text-sm sm:text-base md:text-lg opacity-90 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl leading-relaxed">
                        Browse our exclusive collection of properties or connect with our expert
                        team to begin your extraordinary home buying journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <Link to="/" className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <HomeIcon size={16} className="mr-2 sm:mr-2" />
                            Browse Properties
                        </Link>
                        <Link to="/contact" className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}