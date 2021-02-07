import React from "react"
import "./Modal.sass"

export interface ModalProps {
  title: string
  onSave: () => void
  onCancel: () => void
  children: React.ReactNode
}

export default (props: ModalProps) => (
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{props.title}</p>
      </header>
      <section className="modal-card-body">{props.children}</section>
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={props.onSave}>
          Save
        </button>
        <button className="button" onClick={props.onCancel}>
          Cancel
        </button>
      </footer>
    </div>
  </div>
)
