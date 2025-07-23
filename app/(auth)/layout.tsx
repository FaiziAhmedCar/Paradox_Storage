import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-screen overflow-hidden">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col   justify-center space-y-7">
          {/* <Link href="/sign-in"> */}
            {/* <div className=""> */}

            <Image
              src="/logoAuth.png"
              alt="logo"
              width={150}
              height={200}
              className="flex"
              />
              {/* </div> */}
          {/* </Link> */}
          <div className="space-y-5 text-white ">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store your files.
            </p>
          </div>
          <Image
            src="/assets/images/files-2.png"
            alt="files"
            width={300}
            height={300}
            className="transition-all duration-500 hover:rotate-12 hover:scale-110"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/logo1.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          ></Image>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
