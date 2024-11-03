import { Fragment } from "react";
import Image from "next/image";
import { getHomePageData } from "@/libs/actions/content";
import { redirect } from "next/navigation";
import Service from "./_components/service";
import { BannerType, ServiceType } from "@/libs/types";
import Carousel from "./_components/carousel";
import Balance from "../_components/balance";

export default async function HomePage() {
  const data = await getHomePageData();

  if (!data) redirect('/login');

  return (
    <Fragment>
      <Balance 
        avatar={data.profile.profile_image}
        fullName={data.profile.first_name + ' ' + data.profile.last_name} 
        balance={data.balance}
      />
      <section className="flex flex-wrap py-6 gap-4 justify-evenly">
          {data.services.map((s: ServiceType) => (
            <Service 
              key={s.service_code} 
              name={s.service_name} 
              src={s.service_icon}
              code={s.service_code}
            />
          ))}
      </section>
      <section className="py-6">
        <p className="font-semibold">Temukan promo menarik</p>
        <div className="mt-6">
          <Carousel>
            {data.banner.map((b: BannerType) => (
              <div key={b.banner_name} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <Image 
                  width={271} 
                  height={121} 
                  alt={b.banner_name} 
                  src={b.banner_image}
                  className="w-full h-auto object-cover select-none"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </Fragment>
  )
}