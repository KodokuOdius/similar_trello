import React, { useState } from "react";

import "./Main.scss";
import Button from "@components/Button";
import Column from "@components/Column";

const Main = () => {
    const data = [
        {
            id: 1,
            title: "Test Column 1",
            tickets: [
                { id: 11, title: "Column 1 - Ticket 1" },
                { id: 12, title: "Column 1 - Ticket 2" },
                { id: 13, title: "Column 1 - Ticket 3" },
            ]
        },
        {
            id: 2,
            title: "Test Column 2",
            tickets: [
                { id: 21, title: "Column 2 - Ticket 1" },
                { id: 22, title: "Column 2 - Ticket 2" },
                { id: 23, title: "Column 2 - Ticket 3" },
            ]
        },
    ];

    const [columns, setColumns] = useState(data);

    const onAddNewColumn = () => {
        setColumns(columns => {
            const columnId = columns.length === 0 ? 1 : columns[columns.length - 1].id + 1;
            const ticketId = Number(columnId.toString() + 1);
            const newColumn = {
                id: columnId,
                title: "New Test Column",
                tickets: [{ id: ticketId, title: "Test ticket" }]
            }
            return [...columns, newColumn];
        });
    };

    const onDeleteColumnData = (id: number) => {
        setColumns(columns => {
            const newColumn = columns.filter(column => {
                if (column.id !== id) {
                    return column;
                };
            });
            return newColumn;
        });
    };

    const onAddNewTicket = (columnId: number) => {
        setColumns(columns => {
            const tickets = columns[columnId - 1].tickets;
            const ticketId = tickets.length === 0 ? 1 : tickets[tickets.length - 1].id + 1;
            const newTicket = {
                id: Number(columnId.toString() + ticketId),
                title: "New Ticket"
            };
            columns[columnId - 1].tickets.push(newTicket);
            return [...columns];
        });
    };

    const onDeleteTicketData = (columnId: number, ticketId: number) => {
        setColumns(columns => {
            const newTickets = columns[columnId - 1].tickets.filter(ticket => {
                if (ticket.id !== ticketId) {
                    return ticket;
                };
            })
            columns[columnId - 1].tickets = newTickets;
            return [...columns];
        });
    };

    return (
        <main className="main">
            <div className="main__control-panel">
                <Button onClick={() => onAddNewColumn()}>
                    Add new Column
                </Button>
            </div>
            <div className="main__columns">
                {columns.map(({ id, title, tickets }) => {
                    return <Column key={id} id={id} title={title}
                        tickets={tickets}
                        onDeleteColumnData={onDeleteColumnData}
                        onAddNewTicket={onAddNewTicket}
                        onDeleteTicketData={onDeleteTicketData}
                    />
                })}
            </div>
        </main>
    );
};
export default Main;