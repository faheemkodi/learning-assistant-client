import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

const KengramEditor = ({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  header,
  body,
}) => {
  const [cheatShow, setCheatShow] = useState(false);
  const handleCheatShow = () => setCheatShow(true);
  const handleCheatClose = () => setCheatShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen scrollable>
        <Modal.Header
          className="text-light bg-primary"
          closeButton
          closeVariant="white"
        >
          <Modal.Title className="fs-5">{header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="text-uppercase fw-bold text-primary">
                <Badge onClick={handleCheatShow} className="pointer p-2">
                  Syntax Cheatsheet
                </Badge>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={36}
                onChange={handleChange}
                value={body}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            <IconContext.Provider
              value={{
                style: { verticalAlign: "middle" },
              }}
            >
              <BsCheckLg />
            </IconContext.Provider>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Syntax Cheatsheet */}
      <Modal show={cheatShow} onHide={handleCheatClose} fullscreen scrollable>
        <Modal.Header
          className="text-light bg-primary"
          closeButton
          closeVariant="white"
        >
          <Modal.Title className="fs-5">Syntax Cheatsheet</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-light small">
          <Table
            bordered
            hover
            size="sm"
            className="small text-center"
            responsive
          >
            <thead className="text-light bg-primary">
              <tr>
                <th>Element</th>
                <th>Syntax</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody className="bg-white text-dark">
              <tr>
                <td colSpan={3} className="text-light fw-bold bg-primary">
                  Basic Markdown
                </td>
              </tr>
              <tr>
                <td rowSpan={6}>Headings</td>
                <td># Huge</td>
                <td>
                  <ReactMarkdown># Huge</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>## Big</td>
                <td>
                  <ReactMarkdown>## Big</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>### Medium</td>
                <td>
                  <ReactMarkdown>### Medium</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>#### Small</td>
                <td>
                  <ReactMarkdown>#### Small</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>##### Smaller</td>
                <td>
                  <ReactMarkdown>##### Smaller</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>###### Tiny</td>
                <td>
                  <ReactMarkdown>###### Tiny</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Bold Text</td>
                <td>**thick text**</td>
                <td>
                  <ReactMarkdown>**thick text**</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Italic Text</td>
                <td>*not straight*</td>
                <td>
                  <ReactMarkdown>*not straight*</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>Ordered List</td>
                <td>1. One</td>
                <td>
                  <ReactMarkdown>1. One</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>2. Two</td>
                <td>
                  <ReactMarkdown>2. Two</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>3. Three</td>
                <td>
                  <ReactMarkdown>3. Three</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>Unordered List</td>
                <td>* One</td>
                <td>
                  <ReactMarkdown>* One</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>* Two</td>
                <td>
                  <ReactMarkdown>* Two</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>* Three</td>
                <td>
                  <ReactMarkdown>* Three</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Code</td>
                <td>`const seconds_in_a_day = 24 * 60 * 60`</td>
                <td>
                  <ReactMarkdown>
                    `const seconds_in_a_day = 24 * 60 * 60`
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Horizontal Rule</td>
                <td>---</td>
                <td>
                  <ReactMarkdown>---</ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Link</td>
                <td>[Google](https://www.google.com)</td>
                <td>
                  <ReactMarkdown>
                    [Google](https://www.google.com)
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Strikethrough</td>
                <td>The world is ~~flat~~ round.</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    The world is ~~flat~~ round.
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td rowSpan={2}>Task List</td>
                <td>- [ ] To be done</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    - [ ] To be done
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>- [x] Already done</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    - [x] Already done
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-light fw-bold bg-primary">
                  Basic KaTeX
                </td>
              </tr>
              <tr>
                <td>Superscript</td>
                <td>$x^2 + y^2$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $x^2 + y^2$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Subscript</td>
                <td>$H_2O$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $H_2O$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>Fractions</td>
                <td>$(a + b)^2 \above 1pt a + b$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $(a + b)^2 \above 1pt a + b$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>$4 \above 1pt 5$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $4 \above 1pt 5$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>$dy \above 1pt dx$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $dy \above 1pt dx$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Greater</td>
                <td>$x \gt 6$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $x \gt 6$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Lesser</td>
                <td>$x \lt 6$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $x \lt 6$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Greater or Equal</td>
                <td>$x \ge 6$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $x \ge 6$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Lesser or Equal</td>
                <td>$x \le 6$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $x \le 6$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Element</td>
                <td>$1 \in \Zeta $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $-1 \in \Zeta $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Infinity</td>
                <td>$1 \above 1pt 0$ = $ \infty $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $1 \above 1pt 0$ = $ \infty $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Integrals</td>
                <td>$ \int$ $x^4 \above 1pt 4$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \int$ $x^4 \above 1pt 4$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Limits</td>
                <td>$ \int \limits_a^b f(x)\,dx$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \int \limits_a^b f(x)\,dx$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Log</td>
                <td>$ \log_2 0$</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \log_2 0$
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Parallel</td>
                <td>$ XY \parallel AB $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ XY \parallel AB $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Perpendicular</td>
                <td>$ XY \perp AB $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ XY \perp AB $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Pie</td>
                <td>$ 2 \pi r $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ 2 \pi r $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Braces</td>
                <td>$ \lbrace a, b \rbrace $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \lbrace a, b \rbrace $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Sum</td>
                <td>$ \Sigma $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \Sigma $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Roots</td>
                <td>$ \sqrt[3] x $ $ \sqrt y $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \sqrt[3] x $ $ \sqrt y $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Set Notation</td>
                <td>$ \lbrace 1, 2, 3 \rbrace \subset \Zeta $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \lbrace 1, 2, 3 \rbrace \subset \Zeta $
                  </ReactMarkdown>
                </td>
              </tr>
              <tr>
                <td>Trigonometry</td>
                <td>$ \sin \Theta \cos 30 \tan \Phi $</td>
                <td>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    $ \sin \Theta \cos 30 \tan \Phi $
                  </ReactMarkdown>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="bg-primary text-light">
                  For a more comprehensive KaTeX cheatlist, please visit{" "}
                  <a
                    className="text-light"
                    href="https://utensil-site.github.io/available-in-katex/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    this external link.
                  </a>{" "}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default KengramEditor;
