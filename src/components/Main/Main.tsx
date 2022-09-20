import React, { useState, DragEvent, ChangeEvent } from "react";

import "./Main.scss";
import Button from "@components/Button";
import Column from "@components/Column";
import { IColumn } from "@components/Column/Column";
import { ITicket } from "@components/Ticket/Ticket";

const Main = () => {
    const data = [
        {
            id: 1,
            order: 1,
            title: "Test Column 1",
            tickets: [
                { id: 1, title: "Column 1 - Ticket 1" },
                { id: 2, title: "Column 1 - Ticket 2" },
                { id: 3, title: "Column 1 - Ticket 3" },
            ]
        },
        {
            id: 2,
            order: 2,
            title: "Test Column 2",
            tickets: [
                { id: 4, title: "Column 2 - Ticket 1" },
                { id: 5, title: "Column 2 - Ticket 2" },
                { id: 6, title: "Column 2 - Ticket 3" },
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
                order: columnId,
                title: "New Test Column",
                tickets: [{ id: ticketId, title: "Test ticket" }]
            }
            return [...columns, newColumn];
        });
    };
    const getAllTicketLenght = () => {
        const tickets = [];
        columns.forEach(column => {
            tickets.push(...column.tickets);
        });
        return tickets.length;
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
        setColumns(columns.map(c => {
            if (c.id === columnId) {
                const newTicket = {
                    id: getAllTicketLenght() + 1,
                    title: "New Ticket"
                };
                return { ...c, tickets: [...c.tickets, newTicket] };
            };
            return c
        }));
        // setColumns(columns => {
        //     const newTicket = {
        //         id: getAllTicketLenght() + 1,
        //         title: "New Ticket"
        //     };
        //     columns[columnId - 1].tickets.push(newTicket);
        //     return [...columns];
        // });
    };


    const [currentColumn, setCurrentColumn] = useState<IColumn>(columns[0]);
    const onDeleteTicketData = (columnId: number, ticketId: number) => {
        setColumns(columns.map(column => {
            if (columnId === column.id) {
                column.tickets.forEach((ticket, i) => {
                    if (ticket.id === ticketId) {
                        column.tickets.splice(i, 1)
                        return { ...column, tickets: column.tickets }
                    };
                });
            };
            return column;
        }))
        // setColumns(columns => {
        //     const newTickets = columns[columnId - 1].tickets.filter(ticket => {
        //         if (ticket.id !== ticketId) {
        //             return ticket;
        //         };
        //     })
        //     columns[columnId - 1].tickets = newTickets;
        //     return [...columns];
        // });
    };


    const onDragStartColumn = (event: DragEvent<HTMLDivElement>, column: IColumn) => {
        setCurrentColumn(column);
    };

    const onDropColumn = (event: DragEvent<HTMLDivElement>, column: IColumn) => {
        event.preventDefault();

        const data = event.dataTransfer.getData("drap_type")
        if (data === "ticket") {
            column.tickets.push(currentTicket);
            const currentIndex = currentColumn.tickets.indexOf(currentTicket);
            currentColumn.tickets.splice(currentIndex, 1);
            setColumns(columns.map(c => {
                if (c.id === column.id) {
                    return column;
                };
                if (c.id === currentColumn.id) {
                    return currentColumn;
                };
                return c;
            }));
        } else {
            setColumns(columns.map(c => {
                if (c.id === column.id) {
                    return { ...c, order: currentColumn.order };
                };
                if (c.id === currentColumn.id) {
                    return { ...c, order: column.order };
                }
                return c;
            }));
        };
        event.currentTarget.style.backgroundColor = "white";

    };

    const sortColumn = (a: IColumn, b: IColumn) => {
        if (a.order > b.order) { return 1 }
        return -1
    };


    const [currentTicket, setCurrentTickets] = React.useState<ITicket>(columns[0].tickets[0]);
    const onDragStartTicket = (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => {
        event.dataTransfer.setData("drap_type", "ticket")
        event.stopPropagation()
        setCurrentColumn(column);
        setCurrentTickets(ticket);
    };

    const onDropTicket = (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => {
        event.preventDefault();
        const currentIndex = currentColumn.tickets.indexOf(currentTicket);
        currentColumn.tickets.splice(currentIndex, 1);
        const dropIndex = column.tickets.indexOf(ticket);
        currentColumn.tickets.splice(dropIndex + 1, 0, currentTicket);
        setColumns(columns.map(c => {
            if (c.id === column.id) {
                return column;
            };
            if (c.id === currentColumn.id) {
                return currentColumn;
            };
            return c;
        }));
        event.currentTarget.style.boxShadow = "none";
    };

    const onChangeColumn = (event: ChangeEvent<HTMLInputElement>, column: IColumn) => {
        // setColumns(columns.map(c => {
        //     if (column.id === c.id) {
        //         c.title = event.currentTarget.value;
        //         return c;
        //     };
        //     return c;
        // }));
    };

    const onChangeTicket = (event: ChangeEvent<HTMLInputElement>, column: IColumn, ticket: ITicket) => {
        setColumns(columns.map(c => {
            if (column.id === c.id) {
                return {
                    ...c, tickets: c.tickets.map(t => {
                        if (t.id === ticket.id) {
                            t.title = event.currentTarget.value;
                            return t;
                        };
                        return t;
                    })
                };
            };
            return c;
        }));
    };


    return (
        <main className="main">
            <div className="main__control-panel">
                <Button onClick={() => onAddNewColumn()} className="control-panel__btn">
                    Add Column &#10010;
                </Button>
            </div>
            <div className="main__columns">
                {columns.sort(sortColumn).map((column) => {
                    return <Column key={column.id} column={column}
                        onDeleteColumnData={onDeleteColumnData}
                        onAddNewTicket={onAddNewTicket}
                        onDeleteTicketData={onDeleteTicketData}

                        onDragStartColumn={onDragStartColumn}
                        onDropColumn={onDropColumn}

                        onDragStartTicket={onDragStartTicket}
                        onDropTicket={onDropTicket}

                        onChangeColumn={onChangeColumn}
                        onChangeTicket={onChangeTicket}
                    />
                })}
            </div>
        </main>
    );
};
export default Main;