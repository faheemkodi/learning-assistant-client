import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { IconContext } from "react-icons";
import { BsPencilFill } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

const Kengram = ({ show, handleClose, handleEdit, header, body }) => {
  const markdown = `${body}`;
  const dummy = `
  ### Hello, learner!
  #### Time to add a *kengram*.
  ##### Kengram is just a fancy word for notes.
  ###### You can leverage the power of **markdown** to create well-styled notes.
  ###### For mathematical equations or scientific formula, **KaTeX** is supported.
  `;

  return (
    <Modal show={show} onHide={handleClose} fullscreen scrollable>
      <Modal.Header
        className="text-light bg-primary"
        closeButton
        closeVariant="white"
      >
        <Modal.Title className="fs-5">{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light">
        {body === null ? (
          <>
            <ReactMarkdown
              children={dummy}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              ```const seconds_in_a_day = 24 * 60 * 60 ```
            </ReactMarkdown>
          </>
        ) : (
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          />
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="primary" onClick={handleEdit}>
          <IconContext.Provider
            value={{
              style: { verticalAlign: "middle" },
            }}
          >
            <BsPencilFill />
          </IconContext.Provider>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Kengram;
