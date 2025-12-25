// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Scrollbar,Pagination, Navigation } from 'swiper/modules';
import { Expand } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
// import { getImageUrl } from '../composabels/utils';
interface swiperProps {
  className: string,
  media: { type: 'image' | 'video' | string, path: string, url: string }[]
}
// eslint-disable-next-line react-refresh/only-export-components
export default ({ className = '', media }: swiperProps) => {
  console.log('media -- -- ',media)
  return (
    <>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
         scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, Autoplay, Navigation]}
        className={"mySwiper " + className}
      >
        {media.map((item , idx) => {
          return <SwiperSlide key={idx} className=' w-full h-full  flex items-center justify-center bg-black'>
            <div className=' relative w-full h-full flex items-center justify-center '>
              {item.type == 'image' ? <>  <img alt='' className=' w-full max-h-full' src={getImageUrl(item.path)} />
              </> : <video className=' max-w-full max-h-full' controls src={getImageUrl(item.path)} />
              }
            </div>
          </SwiperSlide>
        })}


      </Swiper>
    </>
  );
}