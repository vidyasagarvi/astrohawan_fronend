import React from "react";
import "../css/PujaProcess.css";
import { ReactComponent as Icon1 } from "../assets/number_1.svg";
import { ReactComponent as Icon2 } from "../assets/number_2.svg";
import { ReactComponent as Icon3 } from "../assets/number_3.svg";
import { ReactComponent as Icon4 } from "../assets/number_4.svg";
import { ReactComponent as Icon5 } from "../assets/number_5.svg";




const Process = () => {
  const steps = [
    {
      id: 1,
      title: "Select Puja",
      description: "Choose from puja packages listed below.",
    },
    {
      id: 2,
      title: "Add Offerings",
      description:
        "Enhance your puja experience with optional offerings like Gau Seva, Deep Daan, Vastra Daan, and Anna Daan.",
    },
    {
      id: 3,
      title: "Provide Sankalp details",
      description: "Enter your Name and Gotra for the Sankalp.",
    },
    {
      id: 4,
      title: "Puja Day Updates",
      description:
        "Our experienced pandits perform the sacred puja. You will receive real-time updates of the puja on your registered WhatsApp number.",
    },
    {
      id: 5,
      title: "Puja Video & Divine Aashirwad Box",
      description: "Get the puja video within 3-4 days.",
    },
  ];

  const iconMap = {
    1: <Icon1 width="30px" height="28px" fill="orange" />,
    2: <Icon2 width="30px" height="27px" fill="orange" />,
    3: <Icon3 width="30px" height="27px" fill="orange" />,
    4: <Icon4 width="30px" height="27px" fill="orange" />,
    5: <Icon5 width="30px" height="27px" fill="orange" />,
  };

  return (
    <div className="puja-process">
      <h1 style={{display:"flex", margin:"30px 0px 20px 0px"}}>Puja Process</h1>

      <div className="process-steps">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            
            <div className="step-header">
            
            <div className="stem-title">  
              <spna className="step-number">
              <span className="step-number">{iconMap[step.id]}</span>
            </spna> 
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
