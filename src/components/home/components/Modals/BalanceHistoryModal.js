import React, { useEffect } from "react";

export default function BalanceHistoryModal({ isOpen, onClose, records }) {
  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultRecords = [
    {
      id: 1,
      date: "22-10-2026 12:34:41",
      provider: "Agent",
      reason: "Credit Deduct",
      amount: "100,00",
      before: "100,00",
      balance: "0,00",
    },
    {
      id: 2,
      date: "22-10-2026 12:33:42",
      provider: "Agent",
      reason: "Credit Add",
      amount: "100,00",
      before: "0,00",
      balance: "100,00",
    },
  ];

  const historyRecords = records || defaultRecords;

  return (
    <div
      className="modal fade show"
      id="ModalHistory"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="History"
      aria-modal="true"
      style={{ paddingRight: "5px", display: "block" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-scrollable cascading-modal modal-lg modal-dialog-custom"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header text-center gradient-card-header red-gradient">
            <h6 className="modal-title w-100 font-weight-bold text-left ml-2">
              Game History
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body modal-body-custom white-text">
            <div
              id="HistoryTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4 no-footer"
            >
              <div className="top"></div>
              <div
                id="HistoryTable_processing"
                className="dataTables_processing card"
                style={{ display: "none" }}
              >
                Processing...
              </div>
              <table
                id="HistoryTable"
                className="table table-sm table-striped table-hover w-100 white-text dataTable no-footer"
                cellSpacing="0"
                role="grid"
              >
                <thead>
                  <tr role="row">
                    <th className="sorting_disabled dt-date text-center">
                      Date
                    </th>
                    <th className="sorting_disabled dt-provider text-center">
                      Provider
                    </th>
                    <th className="sorting_disabled dt-reason text-center">
                      Reason
                    </th>
                    <th className="sorting_disabled dt-amount text-center">
                      Amount
                    </th>
                    <th className="sorting_disabled dt-before d-none text-center">
                      Balance Before
                    </th>
                    <th className="sorting_disabled dt-after text-center">
                      Balance
                    </th>
                    <th className="sorting_disabled dt-claim text-center">
                      Claim
                    </th>
                    <th className="sorting_disabled d-none"></th>
                  </tr>
                </thead>
                <tbody>
                  {historyRecords.map((item, index) => (
                    <tr
                      key={item.id}
                      role="row"
                      className={index % 2 === 0 ? "odd" : "even"}
                    >
                      <td className="dt-date text-center">{item.date}</td>
                      <td className="dt-provider text-center">{item.provider}</td>
                      <td className="dt-reason text-left btn-history-details">
                        {item.reason}
                      </td>
                      <td className="dt-amount text-right">{item.amount}</td>
                      <td className="dt-before d-none text-right">
                        {item.before}
                      </td>
                      <td className="dt-after text-right">{item.balance}</td>
                      <td className="dt-claim text-center">
                        <button
                          type="button"
                          className="btn-history-support waves-effect waves-light"
                          data-provider-id="10"
                          data-transaction-id=""
                          aria-label="Soporte"
                        >
                          <i className="far fa-comment-dots"></i>
                        </button>
                      </td>
                      <td className="d-none">10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bottom row"></div>
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="HistoryTable_paginate"
              >
                <ul className="pagination">
                  <li
                    className="paginate_button page-item previous disabled"
                    id="HistoryTable_previous"
                  >
                    <a
                      href="#"
                      aria-controls="HistoryTable"
                      data-dt-idx="0"
                      tabIndex={0}
                      className="page-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      &laquo;
                    </a>
                  </li>
                  <li className="paginate_button page-item active">
                    <a
                      href="#"
                      aria-controls="HistoryTable"
                      data-dt-idx="1"
                      tabIndex={0}
                      className="page-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </a>
                  </li>
                  <li
                    className="paginate_button page-item next disabled"
                    id="HistoryTable_next"
                  >
                    <a
                      href="#"
                      aria-controls="HistoryTable"
                      data-dt-idx="2"
                      tabIndex={0}
                      className="page-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      &raquo;
                    </a>
                  </li>
                </ul>
              </div>
              <div className="clear"></div>
            </div>
          </div>

          <div className="modal-footer justify-content-center py-2">
            <button
              type="button"
              className="btn btn-danger px-3 waves-effect waves-light"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
