import React from "react";
import Header from "../components/common/header";
import ButtomNavigation from "../components/common/bottomNavigation";

const Legal = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-20 text-center">
        <h1 className="text-3xl font-bold text-gray-600">Legal Notice</h1>
      </div>
      <section className="mx-auto max-w-[390px] mt-8 pb-[65px]">
        <h2 className="text-xl mb-4 text-gray-600">Icons and Images</h2>
        <p className="mb-2 text-gray-500">
          This website uses icons and images from various sources.
        </p>
        <div className="flex flex-col">
          <a
            href="https://www.flaticon.com/free-icons/education"
            title="education icons"
            className="text-sm"
          >
            Education icons created by Irvan Kurnianto - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/demographics"
            title="demographics icons"
            className="text-sm"
          >
            Demographics icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/art"
            title="art icons"
            className="text-sm"
          >
            Art icons created by Freepik - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/environment"
            title="environment icons"
            className="text-sm"
          >
            Environment icons created by tulpahn - Flaticon
          </a>
        </div>
      </section>
      <ButtomNavigation />
    </div>
  );
};

export default Legal;
