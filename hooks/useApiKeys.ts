import { useState, useEffect } from 'react';

interface ApiKeys {
  openRouterKey: string;
  groqKey: string;
}

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKeys>({
    openRouterKey: '',
    groqKey: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOpenRouter = localStorage.getItem('x-openrouter-key') || '';
      const storedGroq = localStorage.getItem('x-groq-key') || '';
      setKeys({
        openRouterKey: storedOpenRouter,
        groqKey: storedGroq,
      });
      setIsLoaded(true);
    }
  }, []);

  const saveKeys = (newKeys: ApiKeys) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('x-openrouter-key', newKeys.openRouterKey);
      localStorage.setItem('x-groq-key', newKeys.groqKey);
    }
    setKeys(newKeys);
  };

  return { keys, saveKeys, isLoaded };
}
