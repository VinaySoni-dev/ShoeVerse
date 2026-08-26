import React from "react";

const ReturnPolicy = () => {
  return (
    <>
      <style>{`
        .return-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: Arial, Helvetica, sans-serif;
          color: #333;
        }

        .return-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .return-header h1 {
          font-size: 48px;
          color: #222;
          margin-bottom: 15px;
        }

        .return-header p {
          max-width: 750px;
          margin: auto;
          font-size: 18px;
          color: #666;
          line-height: 1.8;
        }

        .return-content {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .return-box {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: .3s ease;
        }

        .return-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .return-box h2 {
          font-size: 28px;
          color: #ff6b00;
          margin-bottom: 15px;
        }

        .return-box p {
          font-size: 16px;
          color: #555;
          line-height: 1.9;
        }

        .return-box ul,
        .return-box ol {
          margin-top: 15px;
          padding-left: 25px;
          color: #555;
          line-height: 2;
        }

        .return-box li {
          margin-bottom: 8px;
        }

        .return-box strong {
          color: #222;
        }

        @media(max-width:768px){

          .return-header h1 {
            font-size: 34px;
          }

          .return-header p {
            font-size: 16px;
          }

          .return-box {
            padding: 20px;
          }

          .return-box h2 {
            font-size: 23px;
          }

        }
      `}</style>


      <section className="return-container">

        {/* Header */}
        <div className="return-header">

          <h1>
            Return & Refund Policy
          </h1>

          <p>
            We want you to be completely satisfied with your purchase.
            Please review our return and refund policy before requesting
            a return.
          </p>

        </div>


        {/* Content */}
        <div className="return-content">


          <div className="return-box">
            <h2>1. Return Eligibility</h2>

            <p>
              Products may be returned within <strong>30 days</strong> of
              delivery if they are unused, unworn, in their original
              condition, and include all original packaging, tags, and
              accessories.
            </p>
          </div>



          <div className="return-box">

            <h2>2. Non-Returnable Items</h2>

            <p>
              The following items cannot be returned:
            </p>

            <ul>
              <li>Products that have been worn or damaged by the customer.</li>
              <li>Items without original packaging or tags.</li>
              <li>Customized or personalized products.</li>
              <li>Gift cards and promotional items.</li>
            </ul>

          </div>



          <div className="return-box">

            <h2>3. Refund Process</h2>

            <p>
              Once your returned item has been received and inspected,
              we will notify you of the approval or rejection of your refund.
              If approved, your refund will be processed to the original
              payment method within <strong>5–10 business days</strong>,
              depending on your payment provider.
            </p>

          </div>



          <div className="return-box">

            <h2>4. Exchanges</h2>

            <p>
              If you received the wrong size, color, or a defective product,
              you may request an exchange subject to product availability.
              If the requested item is unavailable, a refund or store credit
              may be offered.
            </p>

          </div>



          <div className="return-box">

            <h2>5. Damaged or Incorrect Items</h2>

            <p>
              If your order arrives damaged, defective, or incorrect,
              please contact our customer support within
              <strong> 48 hours </strong>
              of delivery. Include your order number and photos of the item
              so we can resolve the issue quickly.
            </p>

          </div>



          <div className="return-box">

            <h2>6. Return Shipping</h2>

            <p>
              Customers are responsible for return shipping costs unless
              the return is due to a damaged, defective, or incorrect item
              shipped by ShoeVerse.
            </p>

          </div>



          <div className="return-box">

            <h2>7. How to Request a Return</h2>

            <ol>
              <li>Contact our customer support team.</li>
              <li>Provide your order number and reason for the return.</li>
              <li>Wait for return authorization and shipping instructions.</li>
              <li>Pack the item securely and send it to the provided return address.</li>
              <li>Once received and inspected, your refund or exchange will be processed.</li>
            </ol>

          </div>



          <div className="return-box">

            <h2>8. Policy Updates</h2>

            <p>
              ShoeVerse reserves the right to modify this Return & Refund
              Policy at any time. Any changes will be posted on this page
              and become effective immediately upon publication.
            </p>

          </div>


        </div>

      </section>
    </>
  );
};

export default ReturnPolicy;