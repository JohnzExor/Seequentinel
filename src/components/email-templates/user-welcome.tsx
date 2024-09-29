import { BringToFront } from "lucide-react";

export default function WelcomeEmailTemplate({
  userEmail,
}: {
  userEmail: string;
}) {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-primary text-white py-4 px-6 flex items-center">
          <BringToFront className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-semibold">Welcome to Seequentinel!</h1>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hi, {userEmail}! 🎉
          </h2>
          <p className="text-gray-700 mb-6">
            We&apos;re thrilled to have you join Seequentinel, Palawan State
            University&apos;s reporting system. Our platform will help you
            report and manage issues efficiently and effectively.
          </p>
          <p className="text-gray-700 mb-6">Here’s how you can start:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Explore the dashboard to submit reports.</li>
            <li>Track the status of your previous reports.</li>
            <li>Learn about new features and updates.</li>
          </ul>
          <a
            href="https://seequentinel.vercel.app"
            className="block bg-primary text-white text-center py-3 rounded-md shadow hover:bg-primary transition duration-300"
          >
            Get Started
          </a>
        </div>
        <div className="bg-gray-100 py-4 px-6 text-center text-gray-600 text-sm">
          <p>
            Need help?{" "}
            <a
              href="mailto:seequentinel@gmail.com"
              className="text-primary underline"
            >
              Contact Support
            </a>
          </p>
          <p className="mt-2">© 2024 Seequentinel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
