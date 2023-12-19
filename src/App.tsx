import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

function App() {
  const [base64_1, setBase64_1] = useState("");
  const [apikey, setApikey] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setBase64_1(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
          <input type="file" onChange={handleFileChange} />
          {base64_1 && <img src={base64_1} alt="Uploaded" />}
        </div>
        <Typography>写真2を選択</Typography>
        <div>
          <input type="file" onChange={handleFileChange} />
          {/* {base64_1 && <img src={base64_1} alt="Uploaded" />} */}
        </div>
        <Typography>写真3を選択</Typography>
        <div>
          <input type="file" onChange={handleFileChange} />
          {/* {base64_1 && <img src={base64_1} alt="Uploaded" />} */}
        </div>
        <Typography>命令を入力</Typography>
        https://nice-mud-054e49010.4.azurestaticapps.net/
        <TextField id="outlined-basic" label="api-key" variant="outlined" />
        <Button variant="contained">Send Request</Button>
      </Box>
    </>
  );
}

export default App;
