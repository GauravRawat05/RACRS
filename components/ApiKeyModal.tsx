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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Configuration
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Keys are stored securely in your browser's local storage and are only sent to the server during resume analysis.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenRouter API Key
            </label>
            <input
              type="password"
              value={localKeys.openRouterKey}
              onChange={(e) => setLocalKeys(prev => ({ ...prev, openRouterKey: e.target.value }))}
              placeholder="sk-or-v1-..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Groq API Key (Fallback)
            </label>
            <input
              type="password"
              value={localKeys.groqKey}
              onChange={(e) => setLocalKeys(prev => ({ ...prev, groqKey: e.target.value }))}
              placeholder="gsk_..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
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
