"use client";

import React, { useState, useEffect } from 'react';
import { useApiKeys } from '../hooks/useApiKeys';
import { Key, X, Check, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const { keys, saveKeys, isLoaded } = useApiKeys();
  const [localKeys, setLocalKeys] = useState({ openRouterKey: '', groqKey: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setLocalKeys(keys);
    }
  }, [isLoaded, keys]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveKeys(localKeys);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
      <div className="bg-cream-50 rounded-xl border border-editorial-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-editorial-border bg-white">
          <h2 className="text-xl font-serif font-medium text-editorial-text flex items-center gap-2">
            <Key className="w-5 h-5 text-pastel-peach-text" />
            API Configuration
          </h2>
          <button onClick={onClose} className="text-editorial-secondary hover:text-editorial-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 space-y-5 bg-cream-50">
          <div className="bg-cream-100 border border-editorial-border text-editorial-text p-4 rounded-lg text-sm flex gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-pastel-sky-text" />
            <p className="leading-relaxed">Keys are stored securely in your browser's local storage and are only sent to the server during resume analysis.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5 font-serif">
                OpenRouter API Key
              </label>
              <input
                type="password"
                value={localKeys.openRouterKey}
                onChange={(e) => setLocalKeys(prev => ({ ...prev, openRouterKey: e.target.value }))}
                placeholder="sk-or-v1-..."
                className="w-full px-4 py-2.5 bg-white border border-editorial-border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-sky focus:border-transparent transition-shadow text-editorial-text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-editorial-text mb-1.5 font-serif">
                Groq API Key (Fallback)
              </label>
              <input
                type="password"
                value={localKeys.groqKey}
                onChange={(e) => setLocalKeys(prev => ({ ...prev, groqKey: e.target.value }))}
                placeholder="gsk_..."
                className="w-full px-4 py-2.5 bg-white border border-editorial-border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-sky focus:border-transparent transition-shadow text-editorial-text"
              />
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-editorial-border bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-editorial-secondary hover:bg-cream-100 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-editorial-text text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              'Save Keys'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
