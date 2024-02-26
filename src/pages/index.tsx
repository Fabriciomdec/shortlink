import { Button } from "@/components/Button";
import axios from "axios";
import { Copy, Link, LogIn } from "lucide-react";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('')

  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('re')


  useEffect(() => {
    if (redirectUrl) {
      fetchUrl(redirectUrl)
    }

  }, [redirectUrl])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const fetchUrl = async (url: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/${url}`)

      if (response.data.longUrl) {
        window.location.href = response.data.longUrl;
      }

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleShortUrlLink = async () => {

    try {
      const responseShortLink = await axios.post('http://localhost:3001/api/shorten', {
        longUrl: url,
      });

      setShortUrl(`http://localhost:3000/?re=${responseShortLink.data.shortUrl}`)

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch (error) {
      console.log('error ao Copiar para área de transferencia', error)
    }
  }

  return (
    <main className="flex flex-col p-4 gap-4 min-w-screen min-h-screen bg-[#0B101B] items-center">

      <div className="flex self-end gap-2 lg:h-[60px]">
        <button
          className="flex items-center justify-center flex-row gap-2 bg-yellow-300 p-2 w-[123px] rounded-full lg:bg-[#181E29]"
        >
          <p>Login</p>
          <LogIn />
        </button>
        <Button title="Register Now" />
      </div>
      <div className="flex lg:w-[659px] lg:h-[76px] border-4 border-[#353C4A] rounded-full justify-between items-center p-1">
        <div className="flex gap-2 ml-4">
          <Link className="text-gray-300" />
          <input
            className="text-gray-300 bg-transparent "
            placeholder="Enter the link here "
            value={url}
            onChange={handleChange}
          />
        </div>

        <Button title="Shorten Now!" onClick={handleShortUrlLink} />
      </div>
      {
        shortUrl ? <div className="flex gap-2 items-center justify-center">
          <a target="_blank" className="text-[#C9CED6]">{shortUrl}</a>
          <button className="flex w-[35px] h-[35px] rounded-full bg-[#1C283F] items-center justify-center" onClick={handleCopy} title="Copy">
            <Copy size={20} />
          </button>
        </div> : undefined
      }

    </main>
  );
}
