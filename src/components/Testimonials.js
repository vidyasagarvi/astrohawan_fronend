// FAQSection.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

function Testimonials({ lang }) {

    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Adjust for responsiveness
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // 3 seconds
        arrows: false,
        responsive: [
            {
                breakpoint: 768, // For tablets
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480, // For mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    const testimonial_en = [
        {
            id: 1,
            description: "Satim's products bring a sense of calm and spirituality to my daily prayers. Their incense sticks are my favorite - pure, long-lasting, and beautifully fragrant!",
            author: "Aarav, Mumbai",
        },
        {
            id: 2,
            description: "The Bhandara service provided by Satim was seamless and well-organized. They took care of every detail, making the event stress-free for our family",
            author: "Neha Gupta, Jaipur",
        },
        {
            id: 3,
            description: "I’ve tried many incense products, but Satim's quality is unmatched. The natural aromas elevate the entire atmosphere during meditation.",
            author: "Ramesh, Bangalore",
        },
        {
            id: 4,
            description: "I was thrilled with Satim's ritual kits. Everything needed for pooja was thoughtfully packed, and the items felt authentic and high-quality.",
            author: "Sonal Sharma, Pune",
        },
        {
            id: 5,
            description: "Satim has become my go-to for spiritual products. Their customer service is excellent, and the products always arrive on time and in perfect condition.",
            author: "Manoj Kumar, Chandigarh",
        },
        {
            id: 6,
            description: "The divine fragrance of Satim's incense sticks fills my home with positivity and peace. I can't imagine my mornings without them now.",
            author: "Priya Sinha, Hyderabad",
        },
        {
            id: 7,
            description: "Satim’s online store is easy to use, and the product range is impressive. I love that they combine tradition with convenience.",
            author: "Kiran, Lucknow",
        },
        {
            id: 8,
            description: "Our family event was a success, thanks to Satim's timely delivery and premium Bhandara services. Highly recommend them for any ritual needs!",
            author: "Arvind Mishra, Kanpur",
        },
    ];

    const testimonial_hi = [
        {
            id: 1,
            description: "सतीम के धूप और पूजा उत्पादों ने हमारे परिवार के भंडारे को विशेष बना दिया। गुणवत्ता और सुगंध दोनों लाजवाब हैं। हर बार इन्हें इस्तेमाल करने का अनुभव अद्भुत होता है!",
            author: "सुरेश जी, हरिद्वार",
        },
        {
            id: 2,
            description: "मैंने सतीम से पूजा सामग्री ऑनलाइन खरीदी, और यह निर्णय मेरे लिए बहुत सही साबित हुआ। प्रोडक्ट्स की पैकिंग और क्वालिटी कमाल की है।",
            author: "रीमा , दिल्ली",
        },
        {
            id: 3,
            description: "भंडारा सेवा के लिए सतीम का साथ लेना एक शानदार अनुभव था। सेवा में पूरी निष्ठा और समय पर डिलीवरी ने मुझे प्रभावित किया।",
            author: "राजीव वर्मा, ऋषिकेश",
        },
        {
            id: 4,
            description: "सतीम के पूजा उत्पाद न केवल श्रेष्ठ गुणवत्ता के हैं बल्कि इनमें एक आध्यात्मिक ऊर्जा भी महसूस होती है। मेरी पूजा का अनुभव और भी सुखद हो गया।",
            author: "अनुजा देवी, देहरादून",
        },
    ];

    if(lang=='en'){
       var  testimonials = testimonial_en; 
    }
    if(lang=='hi'){
        var  testimonials = testimonial_hi; 
     }

    return (
        <div className="testimonials">
            <h2>{t('testimonials_title')}</h2>
            <h3>9 / 10 Devotees rate satim 5⭐ for our good service</h3>
            <Slider {...settings}>
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonials-card rounded position-relative">
                        <div className="p-4 pb-0 rounded-bottom">

                            <p>{testimonial.description} 🙏🙏🙏 </p>
                            <h4>- {testimonial.author}</h4>

                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    );
}

export default Testimonials;
