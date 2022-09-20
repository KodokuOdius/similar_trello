import React from "react";
import { DragEvent, ChangeEvent } from "react";

import "./Ticket.scss"
import { IColumn } from "@components/Column/Column";

export interface ITicket {
    id: number
    title: string
}

export type TicketProps = {
    ticket: ITicket,
    column: IColumn,
    onDeleteTicketData: (columnId: number, ticketId: number) => void;

    onDropTicket: (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => void;
    onDragStartTicket: (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => void;

    onChangeTicket: (event: ChangeEvent<HTMLInputElement>, column: IColumn, ticket: ITicket) => void;
};

const Ticket: React.FC<TicketProps> = ({ ticket, column, onDeleteTicketData, onDragStartTicket, onDropTicket, onChangeTicket }) => {
    const onDeleteTicket = (event: React.MouseEvent) => {
        onDeleteTicketData(column.id, ticket.id);
    };

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.currentTarget.className == "ticket") {
            event.currentTarget.style.boxShadow = "0 3px 3px gray";
        };
    };

    const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.boxShadow = "none";
    };

    return (
        <div className="ticket"
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDragStart={(e) => onDragStartTicket(e, column, ticket)}
            onDragEnd={(e) => onDragLeave(e)}
            onDrop={(e) => onDropTicket(e, column, ticket)}
            draggable={true}
        >
            <h4 className="ticket__title">
                <input className="ticket__title_input" type="text" defaultValue={ticket.title} onChange={e => onChangeTicket(e, column, ticket)} />
            </h4>
            <p className="ticket__delete" onClick={(e) => onDeleteTicket(e)}>&#10006;</p>
        </div>
    );
};
export default Ticket;