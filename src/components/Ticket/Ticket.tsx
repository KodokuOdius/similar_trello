import React from "react";

import "./Ticket.scss"

export type TicketProps = {
    id: number,
    title: string,
    columnId: number,
    onDeleteTicketData: (columnId: number, ticketId: number) => void;
};

const Ticket: React.FC<TicketProps> = ({ id, title, columnId, onDeleteTicketData }) => {
    const onDeleteTicket = (event: React.MouseEvent) => {
        onDeleteTicketData(columnId, id);
    };

    return (
        <div className="ticket" key={id}>
            <h4 className="ticket__title">{title}</h4>
            <p className="ticket__delete" onClick={(e) => onDeleteTicket(e)}>X</p>
        </div>
    );
};
export default Ticket;