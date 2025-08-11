import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useState } from 'react';

export default function Contact() {
    const [state, handleSubmit, reset] = useForm("mgvzrzbw");
    const [showModal, setShowModal] = useState(false);

    // When form succeeds, show popup
    useEffect(() => {
        if (state.succeeded) {
            setShowModal(true);
        }
    }, [state.succeeded]);

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex flex-col w-full overflow-x-hidden">
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[90%] sm:max-w-3xl mx-auto">
                <div className="max-w-[90%] sm:max-w-xl mx-auto text-center px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Have questions about property or need expert guidance on
                        your real estate journey? Our dedicated team is here to provide
                        personalized assistance and would love to hear from you.
                    </p>
                </div>
            </div>

            <div className="w-[90%] max-w-[90%] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-12">
                {/* Contact Info Grid - Responsive 1x4 on mobile, 2x2 on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Phone Section */}
                    <div className="bg-purple-50 rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-purple-600">Phone</h2>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">Call us directly for immediate assistance</p>
                        <p className="text-purple-600 text-base sm:text-lg font-medium">91+9704000041</p>
                        <p className="text-purple-600 text-base sm:text-lg font-medium">91+9676921313</p>
                    </div>

                    {/* Email Section */}
                    <div className="bg-purple-50 rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Email</h2>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">Send us an email anytime</p>
                        <p className="text-blue-600 text-base sm:text-lg font-medium break-all">bandariconstructions28@gmail.com</p>
                    </div>

                    {/* Office Section */}
                    <div className="bg-purple-50 rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Office</h2>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">Visit our main office</p>
                        <div className="text-gray-900 text-xs sm:text-sm leading-relaxed">
                            <p>HNO-5-93/1</p>
                            <p>Sai Mahadev Colony, Parvathatpur</p>
                            <p>Hyderabad, Telangana, India</p>
                        </div>
                    </div>

                    {/* Hours Section */}
                    <div className="bg-purple-50 rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Hours</h2>
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-900">Mon - Fri:</span>
                                <span className="text-gray-900">9:00 AM - 7:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-900">Saturday:</span>
                                <span className="text-gray-900">10:00 AM - 5:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto w-full rounded-2xl shadow-lg mb-12 relative"
            >
                {/* Success Modal - Responsive and centered */}
                {showModal && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center z-50 rounded-lg">
                        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-[90%] sm:max-w-md w-full mx-4 shadow-2xl transform transition-all scale-100">
                            <div className="text-center">
                                {/* Success Icon */}
                                <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-green-100 mb-4">
                                    <svg
                                        className="h-6 w-6 sm:h-8 sm:w-8 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                {/* Success Message */}
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                    Message Sent Successfully!
                                </h3>
                                <p className="text-gray-600 mb-6 text-xs sm:text-sm leading-relaxed">
                                    Your message has been sent successfully. We'll get back to you soon.
                                </p>

                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                                    type="button"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="h-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-purple-600 mb-6 sm:mb-8">
                        Send Us a Message
                    </h1>
                    <div className="space-y-4 sm:space-y-6">
                        {/* Form Fields Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="col-span-1">
                                <label htmlFor="fullname" className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    id="fullname"
                                    type="text"
                                    name="fullname"
                                    placeholder="John Smith"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                />
                                <ValidationError
                                    prefix="Full Name"
                                    field="fullname"
                                    errors={state.errors}
                                    className="text-red-500 text-xs sm:text-sm mt-1"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                    className="text-red-500 text-xs sm:text-sm mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="col-span-1">
                                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="(555) 123-4567"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                                    Subject *
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Property inquiry"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                                />
                                <ValidationError
                                    prefix="Subject"
                                    field="subject"
                                    errors={state.errors}
                                    className="text-red-500 text-xs sm:text-sm mt-1"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="col-span-full">
                            <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Tell us about your real estate needs or ask any questions you have..."
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
                            />
                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                                className="text-red-500 text-xs sm:text-sm mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 ${state.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {state.submitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Show form errors if any */}
                        {state.errors && (
                            <div className="text-red-500 text-xs sm:text-sm">
                                Please fix the errors above before submitting.
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}