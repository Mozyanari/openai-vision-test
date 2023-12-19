import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

// データ型の定義
interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  system_fingerprint: null | string;
}

interface Choice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  logprobs: null;
  finish_reason: string;
}

function App() {
  const [base64_1, setBase64_1] = useState("");
  const [base64_2, setBase64_2] = useState("");
  const [base64_3, setBase64_3] = useState("");

  const [apikey, setApikey] = useState("");

  const [visionresponse, setVisionResponse] = useState("");
  const [jsonresponse, setJsonResponse] = useState("");

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setBase64_1(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setBase64_2(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setBase64_3(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchOpenAi = async () => {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "I will now show you the product images.Please classify the image into the following categories.・PET bottles・Fabric products・Blister pack・box・Pouches, bags・Cans, bottles・Shrink packaging・Others not applicable to the above",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64_1,
                  },
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64_2,
                  },
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64_3,
                  },
                },
              ],
            },
          ],
          max_tokens: 300,
        }),
      });
      const data: ChatCompletion = await res.json();
      console.log(data);
      // setResponse(JSON.stringify(data, null, 2));
      setVisionResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
      setVisionResponse("Failed to fetch data");
    }
  };

  const fetchOpenAiJson = async () => {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: [
                {
                  type: "text",
                  text: `You are a helpful assistant designed to output JSON.
                  The text we are about to pass is the text that someone would have created after looking at the image and categorizing the products as shown below.
                  ・PET bottles
                  ・Fabric products
                  ・Blister pack
                  ・box
                  ・Pouches, bags
                  ・Cans, bottles
                  ・Shrink packaging
                  ・Others not applicable to the above
              
                  You can read the text, look at the image, and give us a response in the Json format below.
                  ### output
                  {
                      objectType:
                  }`,
                },
              ],
            },
            {
              role: "user",
              content: visionresponse,
            },
          ],
          max_tokens: 300,
        }),
      });
      const data: ChatCompletion = await res.json();
      console.log(data);
      // setResponse(JSON.stringify(data, null, 2));
      setJsonResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
      setJsonResponse("Failed to fetch data");
    }
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApikey(event.target.value);
  };

  return (
    <>
      <Box>
        <Typography>APIキーを入力</Typography>
        <TextField
          label="API Key"
          variant="outlined"
          value={apikey}
          onChange={handleApiKeyChange}
          // margin="normal"
        />
        <text>{apikey}</text>
        <Typography>写真1を選択</Typography>
        <div>
          <input type="file" onChange={handleFileChange1} />
          <Box
            component="img"
            sx={{
              height: 200, // ここで画像の高さを設定
              width: 200, // ここで画像の幅を設定
            }}
            alt="Base64 Encoded"
            src={base64_1}
          ></Box>
        </div>

        <Typography>写真2を選択</Typography>
        <div>
          <input type="file" onChange={handleFileChange2} />
          <Box
            component="img"
            sx={{
              height: 200, // ここで画像の高さを設定
              width: 200, // ここで画像の幅を設定
            }}
            alt="Base64 Encoded"
            src={base64_2}
          ></Box>
        </div>

        <Typography>写真3を選択</Typography>
        <div>
          <input type="file" onChange={handleFileChange3} />
          <Box
            component="img"
            sx={{
              height: 200, // ここで画像の高さを設定
              width: 200, // ここで画像の幅を設定
            }}
            alt="Base64 Encoded"
            src={base64_3}
          ></Box>
        </div>
        <Typography>gpt-4-vision-preview</Typography>
        <Button variant="contained" onClick={fetchOpenAi}>
          Send Request
        </Button>
      </Box>
      <Typography>Vision Answer</Typography>
      {visionresponse}

      <Typography>gpt-3.5-turbo-1106</Typography>
      <Button variant="contained" onClick={fetchOpenAiJson}>
        Send Request
      </Button>
      <Typography>Json Answer</Typography>
      {jsonresponse}
    </>
  );
}

export default App;
