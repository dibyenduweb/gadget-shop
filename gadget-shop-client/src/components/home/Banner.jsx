

const Banner = () => {
    return(
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://img.freepik.com/free-photo/workplace-business-modern-male-accessories-laptop-black-background_155003-3944.jpg?t=st=1734024320~exp=1734027920~hmac=19ae27c85301dca2e304fda5e7a6982a86261ed93ddd7968de6f4d0787a59dc8&w=996)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to Gadget Shop</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-accent">Get Started</button>
    </div>
  </div>
</div>
    )}
export default Banner;