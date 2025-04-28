// https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
"use client";
// {
//     "contents": [{
//       "parts":[{"text": "Explain how AI works"}]
//       }]
// }

import { useCallback, useState } from "react";

const useGeminiTips = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const fetchTips = useCallback(async (expenses) => {
    setIsSending(true);
    setError(null);

    const body = {
      contents: [
        {
          parts: [
            {
              text: `This is a strict requirement. Make sure no makrdown is returned. Just simple text.
              Now, generate a well-structured advice or tips response in simple text in about 100-200 words by analyzing the following expenses array:  
              **Expenses** :  ${JSON.stringify(expenses)}
              `,
            },
          ],
        },
      ],
    };

    try {
      console.log("GEMINI CALLED");
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  }, []);

  return {
    fetchTips,
    isSending,
    error,
  };
};

export default useGeminiTips;
