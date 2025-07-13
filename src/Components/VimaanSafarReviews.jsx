import React from 'react';
import { Star } from 'lucide-react';

const VimaanSafarReviews = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      comment: "Best travel booking experience ever! Got great deals on flights.",
      date: "15 May 2023"
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment: "Easy to use platform and excellent customer support when I needed to change my booking.",
      date: "22 June 2023"
    },
    {
      name: "Amit Singh",
      rating: 5,
      comment: "Saved over ₹5000 on my international flight compared to other sites. Highly recommended!",
      date: "3 July 2023"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">VimaanSafar Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VimaanSafarReviews;