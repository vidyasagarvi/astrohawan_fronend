import React from "react";
import "../css/PujaProcess.css";
import Icon1 from "../assets/number_1.png";
import Icon2 from "../assets/number_2.png";
import Icon3 from "../assets/number_3.png";
import Icon4 from "../assets/number_4.png";
import Icon5 from "../assets/number_5.png";
import Icon6 from "../assets/number_6.png";

const Process = ({lang}) => {
  const steps_en = [
    { id: 1, title: "Choose", description: "Select from various product package options." },
    { id: 2, title: "Select quantity", description: "Select the quantity of given items" },
    { id: 3, title: "Make payment", description: "Pay for selected items" },
    { id: 4, title: "Receive receipt of payment", description: "Receive a receipt for your payment" },
    { id: 5, title: "Distribution of product", description: "We will distribute the items chosen by you to the needy people in the temple premises so that you can get its full merit." },
    { id: 6, title: "Get videos and certificate", description: "Receive distribution video and certificate in 4-5 days with your name" },
  ];

  const steps_hi = [
    { id: 1, title: "चयन कर", description: "विभिन्न उत्पाद पैकेज विकल्पों में से चयन कर|" },
    { id: 2, title: "मात्रा चुन", description: "दी गयी वस्तुवो की मात्रा चुन" },
    { id: 3, title: "भुगतान कर", description: "चुनी हुई वस्तुवो के लिए भुजगतान कर" },
    { id: 4, title: "भुगतान की रसीद प्राप्त कर", description: "आप के किये गए भुगतान की रसीद प्राप्त करें" },
    { id: 5, title: "उत्पाद का वितरण", description: "हम आप की चुनी हुई वस्तुओ को जरुरत मांदो को मंदिर परिसर में वितरित करेंगे जिससे आप को उसका पूरा पुण्य मिल सके" },
    { id: 6, title: "वीडियो और प्रमाणपत्र प्राप्त कर", description: "अपने नाम के साथ 4-5 दिनों में वितरण वीडियो और प्रमाणपत्र प्राप्त करें" },
  ];

  const iconMap = {
    1: <img src={Icon1} alt="Icon 1" width="30px" height="30px" />,
    2: <img src={Icon2} alt="Icon 2" width="30px" height="30px" />,
    3: <img src={Icon3} alt="Icon 3" width="30px" height="30px" />,
    4: <img src={Icon4} alt="Icon 4" width="30px" height="30px" />,
    5: <img src={Icon5} alt="Icon 5" width="30px" height="30px" />,
    6: <img src={Icon6} alt="Icon 6" width="30px" height="30px" />,
  };

  if(lang=='en'){
    var  steps = steps_en; 
     var title = "Process";
 }
 if(lang=='hi'){
     var  steps = steps_hi; 
     var title = "प्रक्रिया";
  }

  return (
    <div className="puja-process">
      <h1 style={{ display: "flex", margin: "30px 0px 20px 0px" }}>{title}</h1>

      <div className="process-steps">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            <div className="step-header">
              <div className="step-title">
                <span className="step-number">{iconMap[step.id]}</span>
                <h2>{step.title}</h2>
              </div>
            </div>
            <div className="step-content">
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
