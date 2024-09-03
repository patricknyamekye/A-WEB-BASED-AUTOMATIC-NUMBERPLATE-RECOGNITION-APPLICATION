const mysql = require('mysql2/promise');

// Create a connection to the database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'numberplate'
});


db.getConnection()
  .then(connection => {
    console.log('Connected to database!');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to database:', error.message);
  });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require("multer");
const upload = multer().any(); // Use multer to handle any form data (including files)

// Access your API key as an environment variable (set as GEMINI_API in .env)
const genAI = new GoogleGenerativeAI('AIzaSyCNSqbSbEztXPXnmVGC-HoIfi2UbcWePb8');

// Converts uploaded file data to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(data).toString("base64"),
      mimeType
    },
  };
}

const img_gemini = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "Error uploading files" });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "write only the texts of what do you see? extract the number on the plate, only format like this 'AS 4545 P' or like this format 'AS 4545-13' ";

      const imageParts = req.files.map((file) =>
        fileToGenerativePart(file.buffer, file.mimetype)
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      let text = await response.text();
      console.log(text)
      text = text.replace(/['"]/g, "");

      // Log the raw extracted text
      console.log(`Raw extracted license plate: ${text}`);

      // Normalize the extracted text
      text = text.trim().toUpperCase();
      console.log(`Normalized license plate: ${text}`);

      // Query the database
      const [rows] = await db.query('SELECT * FROM table_name WHERE LICENSE_PLATE = ?', [text]);

      if (rows.length > 0) {
        res.status(200).json({ data: rows });
      } else {
        res.status(404).json({ message: 'Number not found' });
      }
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Error generating content" });
  }
};

const numberInput = async (req, res) => {
  try {
    const number = req.body.number;
    console.log(number);
/* 
    number = number.replace(/['"]/g, "");

      // Log the raw extracted text
      console.log(`Raw extracted license plate: ${number}`);

      // Normalize the extracted text
      number = number.trim().toUpperCase();
      console.log(`Normalized license plate: ${number}`); */

    // Check if the number exists in the database
    const [rows] = await db.execute('SELECT * FROM table_name WHERE LICENSE_PLATE = ?', [number]);

    if (rows.length > 0) {
      // If the number exists, return the data
      res.status(200).json({ data: rows });

    } else {
      // If the number does not exist, return an appropriate message
      res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  img_gemini,
  numberInput
};
