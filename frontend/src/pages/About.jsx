import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          font-family: Arial, sans-serif;
        }

        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .about-header h1 {
          font-size: 48px;
          color: #222;
          margin-bottom: 20px;
        }

        .brand {
          color: #ff6b00;
        }

        .about-header p {
          max-width: 750px;
          margin: auto;
          color: #666;
          font-size: 18px;
          line-height: 1.8;
        }

        .story {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          align-items: center;
          margin-bottom: 70px;
        }

        .story img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,.15);
        }

        .story h2 {
          font-size: 34px;
          margin-bottom: 20px;
          color: #222;
        }

        .story p {
          color: #555;
          line-height: 1.9;
          margin-bottom: 18px;
        }

        .choose-title {
          text-align: center;
          font-size: 34px;
          margin-bottom: 40px;
          color: #222;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-bottom: 70px;
        }

        .card {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,.08);
          transition: .3s;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,.15);
        }

        .card h3 {
          color: #ff6b00;
          margin-bottom: 15px;
          font-size: 22px;
        }

        .card p {
          color: #666;
          line-height: 1.7;
        }

        .mission {
          background: #fff4eb;
          border-radius: 20px;
          padding: 50px;
          text-align: center;
        }

        .mission h2 {
          font-size: 34px;
          margin-bottom: 20px;
          color: #222;
        }

        .mission p {
          color: #555;
          line-height: 1.9;
          max-width: 850px;
          margin: auto;
        }

        @media (max-width: 768px) {
          .about-header h1 {
            font-size: 36px;
          }

          .story {
            grid-template-columns: 1fr;
          }

          .choose-title,
          .story h2,
          .mission h2 {
            font-size: 28px;
          }

          .mission {
            padding: 30px 20px;
          }
        }
      `}</style>

      <section className="about-container">

        <div className="about-header">
          <h1>
            About <span className="brand">ShoeVerse</span>
          </h1>

          <p>
            Step into a world where style meets comfort. ShoeVerse is your
            trusted destination for premium sneakers and footwear designed to
            keep you moving with confidence.
          </p>
        </div>

        <div className="story">
          <img src="/about.jpeg" alt="Shoes Collection" />

          <div>
            <h2>Our Story</h2>

            <p>
              ShoeVerse was created with one simple goal — making premium
              footwear accessible to everyone. Whether you're a sneaker
              enthusiast, an athlete, or someone looking for everyday comfort,
              we carefully curate collections that combine quality,
              performance, and modern fashion.
            </p>

            <p>
              Every pair is selected with attention to craftsmanship,
              durability, and style so our customers always receive footwear
              they can trust.
            </p>
          </div>
        </div>

        <h2 className="choose-title">Why Choose ShoeVerse?</h2>

        <div className="features">

          <div className="card">
            <h3>Premium Quality</h3>
            <p>
              Carefully selected footwear made from high-quality materials.
            </p>
          </div>

          <div className="card">
            <h3>Latest Collections</h3>
            <p>
              Discover trending sneakers and timeless classics from top
              brands.
            </p>
          </div>

          <div className="card">
            <h3>Fast Delivery</h3>
            <p>
              Reliable shipping with quick and secure doorstep delivery.
            </p>
          </div>

          <div className="card">
            <h3>Customer First</h3>
            <p>
              Dedicated support to make every shopping experience smooth and
              satisfying.
            </p>
          </div>

        </div>

        <div className="mission">
          <h2>Our Mission</h2>

          <p>
            At ShoeVerse, our mission is to inspire confidence through
            exceptional footwear. We strive to offer stylish, comfortable,
            and affordable shoes while delivering an outstanding online
            shopping experience built on quality, trust, and customer
            satisfaction.
          </p>
        </div>

      </section>
    </>
  );
};

export default About;