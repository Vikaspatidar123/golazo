import React, { useEffect } from "react";

export default function LoginHistoryModal({ isOpen, onClose, records }) {
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

  const defaultLoginRecords = [
    {
      id: 1,
      date: "2026-10-22 12:18:02",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 2,
      date: "2026-10-21 04:03:31",
      action: "Login successfuly",
      ip: "2409:40c4:138:57cf:1d5e:5337:e632:6af",
    },
    {
      id: 3,
      date: "2026-10-21 02:14:19",
      action: "Login successfuly",
      ip: "2409:40c4:3032:c272:6a:6766:8b46:638b",
    },
    {
      id: 4,
      date: "2026-10-19 09:58:00",
      action: "Login successfuly",
      ip: "2409:40c4:1003:3027:3ddb:2962:fde4:3d23",
    },
    {
      id: 5,
      date: "2026-10-19 04:58:36",
      action: "Login successfuly",
      ip: "2409:40c4:1019:1f4:fd62:bd45:5b28:918c",
    },
    {
      id: 6,
      date: "2026-10-19 03:05:54",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:959d:ed16:4153:e9f1",
    },
    {
      id: 7,
      date: "2026-10-19 03:03:36",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:959d:ed16:4153:e9f1",
    },
    {
      id: 8,
      date: "2026-10-19 02:33:34",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:959d:ed16:4153:e9f1",
    },
    {
      id: 9,
      date: "2026-10-17 11:16:34",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:18ed:2d9:8d61:e206",
    },
    {
      id: 10,
      date: "2026-10-15 14:53:55",
      action: "Login successfuly",
      ip: "206.223.232.169",
    },
    {
      id: 11,
      date: "2026-10-15 13:27:38",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 12,
      date: "2026-10-15 13:02:34",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 13,
      date: "2026-10-15 12:54:58",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 14,
      date: "2026-10-15 12:23:33",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 15,
      date: "2026-10-14 18:45:10",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 16,
      date: "2026-10-14 11:15:22",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:959d:ed16:4153:e9f1",
    },
    {
      id: 17,
      date: "2026-10-12 16:30:45",
      action: "Login successfuly",
      ip: "206.223.232.169",
    },
    {
      id: 18,
      date: "2026-10-10 09:12:08",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 19,
      date: "2026-10-08 20:05:17",
      action: "Login successfuly",
      ip: "2409:40c4:138:57cf:1d5e:5337:e632:6af",
    },
    {
      id: 20,
      date: "2026-10-05 14:22:39",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 21,
      date: "2026-10-03 11:08:44",
      action: "Login successfuly",
      ip: "2409:40c4:1003:3027:3ddb:2962:fde4:3d23",
    },
    {
      id: 22,
      date: "2026-10-01 17:35:12",
      action: "Login successfuly",
      ip: "206.223.232.169",
    },
    {
      id: 23,
      date: "2026-09-28 22:19:05",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
    {
      id: 24,
      date: "2026-09-25 08:44:31",
      action: "Login successfuly",
      ip: "2409:40c4:17e:c535:18ed:2d9:8d61:e206",
    },
    {
      id: 25,
      date: "2026-09-22 13:50:18",
      action: "Login successfuly",
      ip: "103.123.227.250",
    },
  ];

  const loginRecords = records || defaultLoginRecords;

  return (
    <div
      className="modal fade show"
      id="ModalLoginHistory"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="LoginHistory"
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
              Login History
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
              id="LoginHistoryTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4 no-footer"
            >
              <div className="top"></div>
              <table
                id="LoginHistoryTable"
                className="table table-sm table-striped table-hover w-100 white-text dataTable no-footer"
                cellSpacing="0"
                role="grid"
              >
                <thead>
                  <tr role="row">
                    <th className="sorting_disabled dt-date text-center">
                      Date
                    </th>
                    <th className="sorting_disabled dt-action text-center">
                      Action
                    </th>
                    <th className="sorting_disabled dt-ip text-center">
                      IP Address
                    </th>
                    <th className="sorting_disabled dt-device text-center">
                      Device
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loginRecords.map((item, index) => (
                    <tr
                      key={item.id}
                      role="row"
                      className={index % 2 === 0 ? "odd" : "even"}
                    >
                      <td className="dt-date text-center">{item.date}</td>
                      <td className="dt-action text-left">{item.action}</td>
                      <td className="dt-ip text-right">{item.ip}</td>
                      <td className="dt-device text-center">
                        <i className="fas fa-desktop"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bottom row"></div>
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
