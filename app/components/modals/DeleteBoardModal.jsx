"use client";

import { useBoard } from "../../context/BoardContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const DeleteBoardModal = ({ isOpen, onClose, boardId, boardName }) => {
  const { deleteBoard } = useBoard();

  const handleDelete = () => {
    deleteBoard(boardId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Board"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </>
      }
    >
      <div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete the '{boardName}' board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
