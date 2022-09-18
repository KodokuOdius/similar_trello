import React from "react";
import Button from "@components/Button";

import Ticket from "@components/Ticket";
import "./Column.scss";

export interface ITicket {
    id: number
    title: string
}

export type ColumnProps = {
    id: number,
    title: string,
    tickets: ITicket[],
    onDeleteColumnData: (id: number) => void,
    onAddNewTicket: (columnId: number) => void;
    onDeleteTicketData: (columnId: number, ticketId: number) => void;
};

const Column: React.FC<ColumnProps> = ({ id, title, tickets, onDeleteColumnData, onAddNewTicket, onDeleteTicketData }) => {

    const onDeleteColumn = (event: React.MouseEvent) => {
        onDeleteColumnData(id);
    };

    return (
        <div className="column" key={id}>
            <div className="column__header">
                <h2 className="column__title">{title}</h2>
                <Button className="column__delete" onClick={e => onDeleteColumn(e)}>
                    Delete This
                </Button>
                <Button className="column__add-ticket" onClick={() => onAddNewTicket(id)}>
                    Add New Ticket
                </Button>
            </div>
            <div className="tickets">
                {tickets.map(ticket => {
                    return <Ticket key={ticket.id} id={ticket.id} title={ticket.title} columnId={id} onDeleteTicketData={onDeleteTicketData} />
                })}
            </div>
        </div>
    );
};
export default Column;