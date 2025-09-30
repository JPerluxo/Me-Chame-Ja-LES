import { useEffect, useState } from "react";

export function useLoadScript(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // evita carregar mais de uma vez
    if (document.querySelector(`script[src="${src}"]`)) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src]);

  return loaded;
}