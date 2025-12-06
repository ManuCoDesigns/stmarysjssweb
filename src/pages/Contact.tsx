import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Shield, Car } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [sendMethod, setSendMethod] = useState("whatsapp"); // default WhatsApp

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    const finalMessage = `Hello, my name is ${name}.
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;

    if (sendMethod === "whatsapp") {
      const whatsappURL = `https://wa.me/254714749123?text=${encodeURIComponent(
        finalMessage
      )}`;
      window.open(whatsappURL, "_blank");
    } else if (sendMethod === "email") {
      const subjectLine = `Contact Form: ${subject}`;
      const mailtoURL = `mailto:manuwebdesigns@gmail.com?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(finalMessage)}`;
      window.location.href = mailtoURL;
    }

    setSuccessMessage(
      "🎉 Thank you for reaching out! Your message is being sent. We will get back to you shortly."
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => setSuccessMessage(""), 6000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "St. Mary's Girls Secondary School",
        "Bomet, Kenya",
        "P.O. Box 301-20300",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 721 771 568", "+254 714 749 123"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@stmarysschool.ac.ke", "admissions@stmarysschool.ac.ke"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Mon - Fri: 7:30 AM - 5:00 PM",
        "Saturday: 8:00 AM - 1:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  const departments = [
    { name: "General Inquiry", email: "info@stmarysschool.ac.ke" },
    { name: "Admissions", email: "admissions@stmarysschool.ac.ke" },
    { name: "Academic Affairs", email: "academic@stmarysschool.ac.ke" },
    { name: "Finance Department", email: "finance@stmarysschool.ac.ke" },
    { name: "Transport Services", email: "transport@stmarysschool.ac.ke" },
    { name: "Principal's Office", email: "principal@stmarysschool.ac.ke" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us for admissions
            inquiries, general questions, or to schedule a visit to our school.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {successMessage && (
                <div className="mb-6 p-4 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm animate-fadeIn">
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Subject</option>
                      <option value="Admissions Inquiry">
                        Admissions Inquiry
                      </option>
                      <option value="Academic Information">
                        Academic Information
                      </option>
                      <option value="Fee Structure">Fee Structure</option>
                      <option value="Transport Services">
                        Transport Services
                      </option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Complaint/Feedback">
                        Complaint/Feedback
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Send Method Selection */}
                <div>
                  <label
                    htmlFor="sendMethod"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Send via:
                  </label>
                  <select
                    id="sendMethod"
                    value={sendMethod}
                    onChange={(e) => setSendMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map & Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.4457829995276!2d35.33040506956991!3d-0.7829776335090189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182b99be69fd89ad%3A0xd6d7cf3a84906d6f!2sSt.%20Mary&#39;s%20Girls%20Secondary%20School%20Bomet.!5e0!3m2!1sen!2sus!4v1755705113415!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Directions
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  Only 5 minutes from Bomet Town
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-3" />
                  Close to Bomet Police Station
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                  Accessible via tarmacked road
                </li>
                <li className="flex items-center">
                  <Car className="w-5 h-5 text-blue-500 mr-3" />
                  Secure on-campus parking available
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Department Contacts
              </h3>
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-700">{dept.name}</span>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Social Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/254714749123"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaWhatsapp size={22} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaFacebookF size={22} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaTwitter size={22} />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaTiktok size={22} />
        </a>
      </div>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Check out our frequently asked questions for immediate answers to
          common inquiries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faq"
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            View FAQ
          </a>
          <a
            href="/admissions"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
          >
            Admissions Info
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;