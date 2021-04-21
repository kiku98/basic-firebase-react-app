import { Box, Button, Form, Heading, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import "./App.css";
import fire from "./fire";

function App() {
  const [element, setElement] = useState("");
  const [dataFromFirebase, setDataFromFirebase] = useState([]);
  const db = fire.database();

  useEffect(() => {
    const messageRef = db.ref("messages").orderByKey().limitToLast(100);
    messageRef.on("value", (snapshot) => {
      const snap = snapshot.val();
      // we need this because of the firebase-rule timelag (to not delete the last element)
      if (snap) {
        setDataFromFirebase(Object.entries(snap) as any);
      }
    });
  }, [db]);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    db.ref("messages").push(element);
    setElement("");
  };

  return (
    <Box alignContent="center" gap="large" margin="small">
      <Heading alignSelf="center" level="2" textAlign="center">
        Das ist eine Tesversion für eine Anbindung zu Firebase
      </Heading>
      <Box alignSelf="center">
        <Form onSubmit={handleSubmit}>
          <TextInput
            placeholder="New Element"
            size="xsmall"
            type="text"
            value={element}
            onChange={(e) => setElement(e.target.value)}
          />
          <Button
            margin={{ top: "small" }}
            size="small"
            type="submit"
            label="Submit to Firebase"
          />
        </Form>
      </Box>
      <Box gap="small">
        {dataFromFirebase.length > 0 &&
          dataFromFirebase.map((item, index) => {
            return (
              <Button
                primary
                key={index}
                label={item[1]}
                alignSelf="center"
                hoverIndicator={{ color: "red" }}
                onClick={() => {
                  console.log("delete");
                  db.ref("messages").child(item[0]).remove();
                }}
              ></Button>
            );
          })}
      </Box>
    </Box>
  );
}

export default App;
