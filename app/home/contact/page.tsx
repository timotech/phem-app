"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });
    // try {
    //   const res = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    //   if (!res.ok) {
    //     const body = await res.json().catch(() => ({}));
    //     throw new Error(body?.error || "Failed to send message");
    //   }
    //   setForm({ name: "", email: "", subject: "", message: "" });
    //   setStatus({
    //     loading: false,
    //     error: null,
    //     success: "Message sent. Thank you!",
    //   });
    // } catch (err) {
    //   setStatus({
    //     loading: false,
    //     error: err.message || "Failed to send message",
    //     success: null,
    //   });
    // }
  };

  return (
    <div>
      <main className="pt-24 max-w-7xl mx-auto px-4">
        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <Mail className="text-green-500 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-1">info@ncdc.gov.ng</h4>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Protecting the health of Nigerians through disease surveillance
              and response.
            </p>
            <Link
              href="/home/about"
              className="inline-flex items-center text-gray-700 font-medium hover:text-yellow-600 transition"
            >
              Read More <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>

          {/* Phone */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <Phone className="text-green-500 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-1">+234 803 222 4444</h4>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Mon to Fr: 08:00am to 05:00pm
              <br />
              Weekends: Closed
            </p>
            <Link
              href="/home/about"
              className="inline-flex items-center text-gray-700 font-medium hover:text-yellow-600 transition"
            >
              Read More <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <MapPin className="text-green-500 mb-4" size={40} />
            <h4 className="font-semibold text-lg mb-1">Location</h4>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Plot 801, Ebitu Ukiwe Street, Jabi, Abuja, Nigeria
            </p>
            <Link
              href="/home/about"
              className="inline-flex items-center text-gray-700 font-medium hover:text-yellow-600 transition"
            >
              Read More <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
        <div className="my-16 border-t grid md:grid-cols-3 gap-10 pt-10">
          {/* Left Image */}
          <div className="relative flex justify-center md:justify-start col-span-1">
            <Image
              src="/55.jpg"
              alt="Health Consultant"
              width={420}
              height={500}
              className="rounded-2xl object-cover z-10 shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent rounded-2xl"></div>
          </div>

          {/* Right Form */}
          <div className="col-span-2">
            <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />

              {/* Message */}
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Message"
                value={form.message}
                rows={10}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              {/* Feedback */}
              {status.error && <p className="text-red-600">{status.error}</p>}
              {status.success && (
                <p className="text-green-600">{status.success}</p>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                  status.loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {status.loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-6">
            Visit Us at Our Office
          </h2>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=2930+W+Imperial+Hwy,+Suite+336,+Inglewood,+CA+90303&output=embed"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>
        </div> */}
      </main>
    </div>
  );
}
