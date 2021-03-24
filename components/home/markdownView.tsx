import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Row, Col, Input, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Controlled as CodeMirror } from "react-codemirror2";

import useActions from "../../actions/useActions";
import { useStateContext, useDispatchContext } from "../../lib/reducer/context";
import utils from "../../lib/util";

const component = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const [editorInstance, setEditorInstance] = useState(null);
  const [editorContent, setEditorContent] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const {
    actionUpdateCurrentDocument,
    actionDeleteDocument,
    actionRenderMenu,
  } = useActions();

  useEffect(() => {
    console.log("state.activeTab", state.activeTab);
    if (state.activeTab === "edit") {
      if (editorInstance) editorInstance.focus();

      console.log("state.selectedDocument", state.selectedDocument.title);
      setEditorContent(state.selectedDocument.markdown);
    }

    (async () => {
      state.selectedDocument.markdown = state.selectedDocument.markdown + " ";
      actionUpdateCurrentDocument(state.selectedDocument, true);

      await utils.wait(0.01);

      const md = state.selectedDocument.markdown;
      state.selectedDocument.markdown = md.substr(0, md.length - 1);
      actionUpdateCurrentDocument(state.selectedDocument, true);
    })();
  }, [state.activeTab]);

  useEffect(() => {
    setEditorContent(state.selectedDocument.markdown);
  }, [editorInstance]);

  useEffect(() => {
    setEditorContent(state.selectedDocument.markdown);
  }, [state.selectedDocument]);

  return (
    <>
      <Row gutter={[16, 16]} className="markdown-view">
        <Col span={24} className="title-hodler">
          <Input
            size="large"
            placeholder="Please input title"
            value={state.selectedDocument.title}
            className="title-input"
            onChange={(e) => {
              state.selectedDocument.title = e.target.value;
              actionUpdateCurrentDocument(state.selectedDocument, false);
              actionRenderMenu();
            }}
          />

          {utils.isMobile() ? (
            <Button
              danger
              icon={<DeleteOutlined />}
              className="delete-btn-small"
              onClick={() => setShowDeleteConfirmModal(true)}
            />
          ) : (
            <Button
              danger
              className="delete-btn"
              onClick={() => setShowDeleteConfirmModal(true)}
            >
              Delete
            </Button>
          )}
        </Col>
        <Col span={24}>
          <CodeMirror
            className="markdown-input"
            value={editorContent}
            options={{
              mode: "markdown",
              theme: "vscode-dark",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setEditorContent(value);
              state.selectedDocument.markdown = value;
              actionUpdateCurrentDocument(state.selectedDocument, false);
            }}
            editorDidMount={(editor) => {
              setEditorInstance(editor);
            }}
          />
        </Col>
      </Row>

      <Modal
        title="Delete docuemnt"
        visible={showDeleteConfirmModal}
        onOk={() => {
          actionDeleteDocument(state.selectedDocument);
          setShowDeleteConfirmModal(false);
        }}
        onCancel={() => {
          setShowDeleteConfirmModal(false);
        }}
      >
        <p>Are you sure to delete this docuemnt ? </p>
      </Modal>
    </>
  );
};

export default component;
