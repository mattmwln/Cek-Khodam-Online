"use client";
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const HomeComp: React.FC = () => {
  const [nama, setNama] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [activeKhodams, setActiveKhodams] = useState<string[]>([]);
  const [backupKhodams, setBackupKhodams] = useState<string[]>([]);

  const khodams = [
    "Buaya Darat", "Monyet Sumatera", "Kucing Hutan", "Kambing Asmodius", "Cicak Dinding",
    "Keris Bengkok", "Paus buncit", "Harimau terbang", "Dugong Silver", "Gajah Berenang",
    "Singa Bercelana", "Kanguru Terbang", "Kura-kura Pelari", "Anjing Bulan", "Jerapah Terbang",
    "Komodo Nyanyi", "Koala Melompat", "Cacing Gila", "Tuyul Marah-Marah", "Mulet Senyum-Senyum",
    "Tuyul Kebelet Pipis", "Mulet Bingung Sendiri", "Tuyul Susah Tidur", "Mulet Jalan Santai",
    "Tuyul Suka Tidur", "Mulet Buka Salon", "Tuyul Baper", "Mulet Kena Tilang", "Setan Kepiting",
    "Iblis Berjalan", "Hantu Terbang", "Syaitan Berenang", "Setan Tidur", "Setan Pergi Piknik",
    "Iblis Nyanyi Dangdut", "Jin Buka Warung", "Setan Tersesat", "Hantu Main Bola",
  ];

  useEffect(() => {
    setActiveKhodams([...khodams]);
    setBackupKhodams([...khodams]);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value);
  };

  const getRandomKhodam = () => {
    if (activeKhodams.length === 0) {
      setActiveKhodams([...backupKhodams]);
    }
    const randomIndex = Math.floor(Math.random() * activeKhodams.length);
    const khodam = activeKhodams[randomIndex];
    setActiveKhodams(activeKhodams.filter((_, index) => index !== randomIndex));
    return khodam;
  };

  const checkKhodam = (event: FormEvent) => {
    event.preventDefault();
    if (nama.trim() !== "") {
      const khodam = getRandomKhodam();
      setMessage(`Nama: ${nama.toUpperCase()}, Khodam: ${khodam.toUpperCase()}`);
      setNama("");
    } else {
      setMessage("Masukkan nama terlebih dahulu.");
    }
  };

  const resetForm = () => {
    setNama("");
    setMessage("");
  };

  const AudioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };

    return (
      <div className="audio-player">
        <button onClick={isPlaying ? stopAudio : togglePlay} className="play-button">
          {isPlaying ? (
            <FaStop className="icon" />
          ) : (
            <FaPlay className="icon" />
          )}
        </button>
        <audio ref={audioRef} autoPlay loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <style jsx>{`
          .audio-player {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
          }

          .play-button {
            background-color: #4CAF50;
            border: none;
            border-radius: 50%;
            padding: 20px;
            display: inline-block;
            transition: background-color 0.3s;
            cursor: pointer;
            margin-bottom: 10px;
          }

          .play-button:hover {
            background-color: #3e8e41;
          }

          .icon {
            color: white;
            font-size: 24px;
          }

          @media (max-width: 320px) {
            .play-button {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="custom-responsive-div rounded-lg px-10 py-8 text-white mt-24"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderWidth: '1px'
        }}>
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-3xl text-white h1-with-custom-spacing">Warning</h1>
          <p className="text-sm italic custom-font">
            Ini hanya fiktif belaka. Jadi, apabila ditemukan kesamaan nama tokoh, tempat
          </p>
          <p className="text-sm italic custom-font">
            ataupun beberapa kejadian, itu hanyalah ketidaksengajaan yang tidak dibuat buat.
          </p>
        </div>
        <AudioPlayer />

        <form onSubmit={checkKhodam} className="flex md:flex-row flex-col gap-3">
          <input
            type="text"
            value={nama}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 mr-2 rounded-md"
            style={{ color: 'black' }}
            placeholder="Masukkan nama"
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 rounded-md hover:bg-blue-700 transition duration-200 text-white px-4 py-2 mr-2"
            >
              Cek Khodam
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 rounded-md hover:bg-red-700 transition duration-200 text-white px-4 py-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {message && (
        <p className="mt-4 font-medium bg-white rounded-lg px-5 py-3">
          {message}
        </p>
      )}
    </div>
  );
};

export default HomeComp;
