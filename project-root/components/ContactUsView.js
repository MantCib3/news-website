import React from 'react';

const ContactUsView = () => {
    return (
        <div className="max-w-3xl bg-white rounded-lg p-6">
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">Contact Us</h1>
            <div className="text-base font-sans text-gray-900">
                <p className="mb-4">We value your feedback and are here to assist you. Reach out to us through the following channels:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li><strong>Email:</strong> <a href="mailto:contact@newswebsite.com" className="text-accent hover:underline">contact@newswebsite.com</a></li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong> 123 News Street, Information City, IN 12345</li>
                </ul>
                <p className="mb-4">Follow us on social media for the latest updates:</p>
                <ul className="list-disc pl-5">
                    <li><a href="https://twitter.com/newswebsite" target="_blank" className="text-accent hover:underline">Twitter</a></li>
                    <li><a href="https://facebook.com/newswebsite" target="_blank" className="text-accent hover:underline">Facebook</a></li>
                    <li><a href="https://linkedin.com/company/newswebsite" target="_blank" className="text-accent hover:underline">LinkedIn</a></li>
                </ul>
            </div>
        </div>
    );
};

export default ContactUsView;