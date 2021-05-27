import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContexts";

export default function EditArea({
  id,
  setAlteredText,
  setIsLoading,
  isEditing,
  setIsEditing,
  alteredText,
  isLoading,
  setError,
}) {
  const [newText, setNewText] = useState(alteredText);
  const userToken = useContext(UserContext).user.token;
  const editorRef = useRef();

  useEffect(() => {
    if (isEditing) {
      editorRef.current.focus();
      editorRef.current.selectionStart = editorRef.current.value.length;
      editorRef.current.selectionEnd = editorRef.current.value.length;
    }
  }, [isEditing]);

  function cancelEditing() {
    setIsEditing(false);
  }
  function keyActions(e) {
    if (isLoading) {
      return;
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      cancelEditing();
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      sendEdit();
      return;
    }
  }

  function sendEdit() {
    setIsLoading(true);
    const body = { text: newText };
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const editPostRequest = axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`,
      body,
      config
    );
    editPostRequest.then(() => {
      setAlteredText(newText);
      setIsEditing(false);
      setIsLoading(false);
    });
    editPostRequest.catch(() => {
      setIsLoading(false);
      setError(true);
    });
  }

  return (
    <textarea
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
      onKeyDown={(e) => keyActions(e)}
      ref={editorRef}
      disabled={isLoading}
    ></textarea>
  );
}
