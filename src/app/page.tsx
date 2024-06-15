import HomeComp from "@/components/HomeComp";

export default function Home() {
  return (
    <div className="relative">
      <div
        className="bg-slate-500"
        style={{
          backgroundImage: 'url("/background-gambar.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Contoh pengaturan tinggi minimum untuk mencakup layar penuh
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-center">
          <HomeComp />
        </div>
      </div>
      <h1
  className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white h2-with-custom-spacing z-10"
  style={{
    padding: '25px',
    bottom: '300px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  }}
>
  Cek Khodam Online
</h1>

<h5
 className="absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-sm text-white h5-with-custom-spacing z-10"
 style={{
        padding: '10px',
        fontSize: '0.75rem', 
        letterSpacing: '0.1em',
  }}
>
  Copyright by mattmwl
</h5>

    </div>
  );
}
