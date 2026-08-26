import React from "react";

const Disclaimer = () => {
  return (
    <>
      <style>{`
        .disclaimer-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: Arial, Helvetica, sans-serif;
          color: #333;
        }

        .disclaimer-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .disclaimer-header h1 {
          font-size: 48px;
          color: #222;
          margin-bottom: 15px;
        }

        .disclaimer-header p {
          font-size: 18px;
          color: #666;
          max-width: 700px;
          margin: auto;
          line-height: 1.8;
        }

        .disclaimer-content {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .disclaimer-box {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .disclaimer-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .disclaimer-box h2 {
          color: #ff6b00;
          font-size: 28px;
          margin-bottom: 15px;
        }

        .disclaimer-box p {
          color: #555;
          line-height: 1.9;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .disclaimer-header h1 {
            font-size: 36px;
          }

          .disclaimer-box h2 {
            font-size: 24px;
          }

          .disclaimer-box {
            padding: 20px;
          }
        }
      `}</style>

      <section className="disclaimer-container">

        <div className="disclaimer-header">
          <h1>Disclaimer</h1>

          <p>
            Please read this disclaimer carefully before using ShoeVerse.
          </p>
        </div>

        <div className="disclaimer-content">

          <div className="disclaimer-box">
            <h2>General Information</h2>
            <p>
              The information provided on ShoeVerse is intended for general
              informational and shopping purposes only. While we strive to keep
              all product descriptions, pricing, images, and availability
              accurate and up to date, errors or omissions may occasionally
              occur.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>Product Images</h2>
            <p>
              Product images are displayed for illustration purposes. Actual
              colors, textures, and finishes may vary slightly due to lighting,
              photography, or differences in screen settings.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>Pricing & Availability</h2>
            <p>
              Prices, promotions, discounts, and product availability are
              subject to change without prior notice. ShoeVerse reserves the
              right to correct pricing errors, update product information, or
              cancel orders affected by inaccurate pricing or inventory
              information.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>External Links</h2>
            <p>
              Our website may contain links to third-party websites for your
              convenience. ShoeVerse is not responsible for the content,
              privacy practices, or services offered by external websites.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>Limitation of Liability</h2>
            <p>
              ShoeVerse shall not be liable for any direct, indirect,
              incidental, or consequential damages resulting from the use of
              this website, including but not limited to website interruptions,
              pricing errors, product availability issues, or reliance on
              information published on the site.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>User Responsibility</h2>
            <p>
              Users are responsible for reviewing product specifications,
              sizing, shipping information, and return policies before placing
              an order. If you have questions about a product, please contact
              our customer support team before making a purchase.
            </p>
          </div>

          <div className="disclaimer-box">
            <h2>Updates to This Disclaimer</h2>
            <p>
              ShoeVerse reserves the right to update or modify this Disclaimer
              at any time without prior notice. Continued use of the website
              after changes have been posted constitutes acceptance of the
              revised Disclaimer.
            </p>
          </div>

        </div>

      </section>
    </>
  );
};

export default Disclaimer;