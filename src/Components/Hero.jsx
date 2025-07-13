import {  Shield, Globe, Tag, Star, Book } from 'lucide-react';
import BookingCard from './BookingCard';
const HeroSection = () => {

  const backgroundImage = "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const features = [
    { icon: <Shield size={24} className="text-[#d72f18]" />, title: "Secure Booking", desc: "256-bit SSL encryption" },
    { icon: <Globe size={24} className="text-[#d72f18]" />, title: "Global Coverage", desc: "1M+ properties worldwide" },
    { icon: <Tag size={24} className="text-[#d72f18]" />, title: "Best Price", desc: "Guaranteed lowest rates" },
    { icon: <Star size={24} className="text-[#d72f18]" />, title: "24/7 Support", desc: "Dedicated travel experts" }
  ];

  return (
    <section 
      className="relative h-[90vh] min-h-[700px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Explore The World With <span className="text-[#d72f18]">VimaanSafar</span>
              </h1>
              <p className="text-xl mb-8 max-w-lg">
                Book flights, hotels, and packages at exclusive prices
              </p>
              
              {/* Features grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-white/80">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Right content */}
              <BookingCard />
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white mt-2 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;